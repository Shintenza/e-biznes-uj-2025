package org.example.client

import io.github.cdimascio.dotenv.dotenv
import org.example.products.Repository

public abstract class CommandHandler() {
  private val dotenv = dotenv()
  private val repository = Repository()
  abstract suspend fun sendMessage(message: String, destination: String)
  private val prefix = dotenv["PREFIX"]

  public suspend fun processMessage(message: String, source: String) {
    val splitMessage = message.split(' ')
    if (splitMessage.isEmpty() || !splitMessage[0].startsWith(prefix)) return
    val command = splitMessage[0].substring(prefix.length)
    val commandArgument = splitMessage.getOrNull(1)

    when (command) {
      "categories" -> {
        val returnedMessage = StringBuilder()
        repository.getCategories()
          .map { category ->
            returnedMessage.append("ID: ${category.id}; Category name: ${category.name}").append('\n')
          }
        sendMessage(returnedMessage.toString(), source)
      }

      "productsByCategory" -> {
        println("SIEMANKO")
        val desiredCategoryId = commandArgument?.toLongOrNull()
        if (desiredCategoryId == null) {
          sendMessage("Given argument supposed to be an integer", source)
          return
        }
        val desiredCategory = repository.getCategoryById(desiredCategoryId)

        if (desiredCategory == null) {
          sendMessage("This category does not exists!", source)
          return
        }

        val desiredProducts = repository.getProductsByCategoryId(desiredCategoryId)

        if (desiredProducts.isEmpty()) {
          sendMessage("There are no products for the given category", source)
          return
        }

        val returnMessage = StringBuilder()
        returnMessage.append("Products for category: ${desiredCategory.id} - ${desiredCategory.name}").append('\n')

        desiredProducts.forEach { product ->
          returnMessage.append("ID: ${product.id}; name: ${product.name}; price: ${product.price}").append('\n')
        }

        sendMessage(returnMessage.toString(), source)
      }

      else -> {

      }
    }
  }
}