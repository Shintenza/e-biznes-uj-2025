package org.example.slack.messages

import kotlinx.serialization.Serializable

@Serializable
data class SlackAcknowledge(val envelope_id: String)
