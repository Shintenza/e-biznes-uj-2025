package org.example.slack.messages

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

@Serializable
data class SlackSocketPayload(val team_id: String, val event: SlackEvent)
