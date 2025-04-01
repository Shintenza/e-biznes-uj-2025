package org.example.discord.messages
import kotlinx.serialization.Serializable

@Serializable
data class DiscordMessage (val id: String, val channel_id: String, val content: String)