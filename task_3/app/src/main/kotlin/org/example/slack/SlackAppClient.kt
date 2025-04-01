package org.example.slack

import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.websocket.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.*
import io.ktor.websocket.*
import kotlinx.coroutines.flow.consumeAsFlow
import kotlinx.serialization.json.*
import kotlinx.serialization.json.decodeFromJsonElement
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.modules.SerializersModule
import kotlinx.serialization.modules.polymorphic
import org.example.client.AppClient
import org.example.slack.messages.SlackAcknowledge
import org.example.slack.messages.SlackEvent
import org.example.slack.messages.SlackMessageEvent
import org.example.slack.messages.SlackSocketPayload

class SlackAppClient : AppClient {
  private val format = Json {
    classDiscriminator = "type"
    prettyPrint = true; ignoreUnknownKeys = true; serializersModule = SerializersModule {
    polymorphic(SlackEvent::class) {
      subclass(SlackMessageEvent::class, SlackMessageEvent.serializer())
    }
  }
  }

  private val client = HttpClient {
    install(WebSockets) {
      contentConverter = KotlinxWebsocketSerializationConverter(format)
    }
  }

  private var session: DefaultClientWebSocketSession? = null

  private val dotenv = dotenv()

  private val commandHandler = SlackCommandHandler(client)


  private suspend fun getWebsocketUrl(): String? {
    val response = client.post("https://slack.com/api/apps.connections.open") {
      header(HttpHeaders.Authorization, "Bearer ${dotenv["SLACK_SOCKET_TOKEN"]}")
      header(HttpHeaders.ContentType, "application/json")
    }
    val jsonResponse = Json.parseToJsonElement(response.body())
    val websocketUrl = jsonResponse.jsonObject["url"]?.jsonPrimitive?.content
    return websocketUrl
  }

  override suspend fun connect() {
    val url = getWebsocketUrl() ?: return
    client.webSocket(url) {
      session = this
      handleConnection()
    }
  }

  private suspend fun handleConnection() {
    if (session == null) return
    while (true) {
      session!!.incoming.consumeAsFlow().collect {
        when (it) {
          is Frame.Text -> {
            val message = it.readText()
            val parsedMessage = format.parseToJsonElement(message)
            val payloadJson = parsedMessage.jsonObject["payload"] ?: return@collect
            val envelopeId = parsedMessage.jsonObject["envelope_id"]?.jsonPrimitive?.content ?: return@collect
            val parsedPayload = format.decodeFromJsonElement<SlackSocketPayload>(payloadJson)

            acknowledge(envelopeId)
            handlePayload(parsedPayload)
          }

          else -> println(it)
        }
      }
    }
  }

  private suspend fun handlePayload(payload: SlackSocketPayload) {
    val event = payload.event;
    if (event is SlackMessageEvent) {
      println("Received message: ${event.text}")
      commandHandler.processMessage(event.text, event.channel)
    }
  }

  private suspend fun acknowledge(envelopeId: String) {
    if (session == null) return
    session!!.sendSerialized(SlackAcknowledge(envelopeId))
  }
}