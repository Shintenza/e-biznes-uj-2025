package org.example.discord.messages

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

@Serializable
data class DiscordGatewayMessage(var op: Int, var d: JsonElement?, var t: String?, var s: Int?)
