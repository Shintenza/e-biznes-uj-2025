package org.example.discord

import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.*
import io.ktor.client.plugins.websocket.*
import io.ktor.serialization.kotlinx.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.consumeAsFlow
import kotlinx.serialization.json.*
import org.example.client.AppClient
import org.example.discord.messages.DiscordGatewayMessage
import org.example.discord.messages.DiscordMessage

class DiscordAppClient : AppClient {
  private val dotenv = dotenv()
  private val DISCORD_API_URL = "wss://gateway.discord.gg/?v=10&encoding=json"
  private val format = Json { prettyPrint = true; ignoreUnknownKeys = true }
  private var heartbeatInterval = 0L
  private var isActive = false
  private var lastSequence: Int? = null
  private var session: DefaultClientWebSocketSession? = null

  private val client = HttpClient {
    install(WebSockets) {
      contentConverter = KotlinxWebsocketSerializationConverter(format)
    }
  }
  private var discordCommandHandler: DiscordCommandHandler = DiscordCommandHandler(client)

  override suspend fun connect() {
    client.webSocket(DISCORD_API_URL) {
      session = this
      handleConnection()
    }
  }

  private suspend fun handleConnection() {
    while (true) {
      session!!.incoming.consumeAsFlow().collect {
        when (it) {
          is Frame.Text -> {
            val gatewayMessage = format.decodeFromString<DiscordGatewayMessage>(it.readText())
            lastSequence = gatewayMessage.s
            when (gatewayMessage.op) {
              0 -> handleDispatch(gatewayMessage)
              10 -> handleHello(gatewayMessage)
              else -> {
                println("Unknown op: ${gatewayMessage.op}")
              }
            }
          }

          else -> println(it)
        }
      }
    }
  }

  private suspend fun handleHello(message: DiscordGatewayMessage) {
    println("Hello received")
    heartbeatInterval = message.d?.jsonObject?.get("heartbeat_interval")?.jsonPrimitive?.long ?: 0
    isActive = true;
    startHeartbeat();
    identify()
  }

  private suspend fun identify() {
    session!!.sendSerialized(
      DiscordGatewayMessage(
        2,
        buildJsonObject {
          put("token", dotenv["DISCORD_TOKEN"])
          put("intents", 33280)
          putJsonObject("properties") {}
        },
        null,
        null
      )
    )
  }

  private fun startHeartbeat() {
    CoroutineScope(Dispatchers.IO).launch {
      while (isActive) {
        delay(heartbeatInterval)
        sendHeartbeat()
      }
    }
  }

  private suspend fun sendHeartbeat() {
    val heartbeatMessage = DiscordGatewayMessage(
      1,
      JsonPrimitive(lastSequence),
      null,
      null
    )
    session!!.sendSerialized(heartbeatMessage)
  }

  private suspend fun handleDispatch(gatewayMessage: DiscordGatewayMessage) = coroutineScope {
    when (gatewayMessage.t) {
      "READY" -> {
        println("Discord bot up and running")
      }

      "MESSAGE_CREATE" -> {
        val decodedMessage = format.decodeFromJsonElement<DiscordMessage>(gatewayMessage.d!!)
        println("Received message: ${decodedMessage.content}")
        discordCommandHandler.processMessage(decodedMessage.content, decodedMessage.channel_id)
      }
    }
  }
}