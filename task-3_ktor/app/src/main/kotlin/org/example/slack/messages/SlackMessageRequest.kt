package org.example.slack.messages

import kotlinx.serialization.Serializable

@Serializable
data class SlackMessageRequest(val channel: String, val text: String);
