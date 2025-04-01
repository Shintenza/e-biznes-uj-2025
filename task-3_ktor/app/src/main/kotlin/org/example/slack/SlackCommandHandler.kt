package org.example.slack

import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import org.example.client.CommandHandler
import org.example.discord.messages.DiscordMessageRequest
import org.example.slack.messages.SlackMessageRequest

class SlackCommandHandler(private val client: HttpClient) :
  CommandHandler() {
  private val dotenv = dotenv()

  override suspend fun sendMessage(message: String, destination: String) {
    val response = client.post("https://slack.com/api/chat.postMessage") {
      headers {
        append("Authorization", "Bearer ${dotenv["SLACK_OAUTH_TOKEN"]}")
        append("Content-Type", "application/json")
      }
      setBody(Json.encodeToString(SlackMessageRequest(destination, message)))
    }

    if (response.status.isSuccess()) {
      println(response.bodyAsText())
      println("Successfully sent message to $destination")
    } else {
      println("Failed to send message: ${response.status.description}")
    }
  }
}
