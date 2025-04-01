package org.example.discord.messages

import kotlinx.serialization.Serializable

@Serializable
data class DiscordMessageRequest(val content: String)
