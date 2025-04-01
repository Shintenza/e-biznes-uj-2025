package org.example

import kotlinx.coroutines.runBlocking
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.launch
import org.example.discord.DiscordAppClient
import org.example.slack.SlackAppClient

fun main(args: Array<String>) {
  val discordClient = DiscordAppClient()
  val slackClient = SlackAppClient()
  runBlocking {
    launch { discordClient.connect() }
    launch { slackClient.connect() }
  }
}

