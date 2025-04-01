package org.example.slack.messages

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
sealed class SlackEvent {}

@Serializable
@SerialName("message")
data class SlackMessageEvent(
  val text: String,
  val channel: String,
  @SerialName("channel_type")
  val channelType: String,
): SlackEvent()
