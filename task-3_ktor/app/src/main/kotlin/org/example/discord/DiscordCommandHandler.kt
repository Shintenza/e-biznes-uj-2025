package org.example.discord

import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import org.example.client.CommandHandler
import org.example.discord.messages.DiscordMessageRequest

class DiscordCommandHandler(private val client: HttpClient) :
  CommandHandler() {
  private val dotenv = dotenv()

  override suspend fun sendMessage(message: String, destination: String) {
    val response = client.post("https://discord.com/api/v10/channels/${destination}/messages") {
      headers {
        append("Authorization", "Bot ${dotenv["DISCORD_TOKEN"]}")
        append("Content-Type", "application/json")
      }
      setBody(Json.encodeToString(DiscordMessageRequest(message)))
    }

    if (response.status.isSuccess()) {
      println("Successfully sent message to $destination")
    } else {
      println("Failed to send message: ${response.status.description}")
    }
  }
}