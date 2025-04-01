package org.example.products

class Repository {
  private val categories: MutableList<Category>
  private val products: MutableList<Product>

  init {
    categories = mutableListOf<Category>(
      Category(1, "Drinks"),
      Category(2, "Electronics"),
      Category(3, "Food")
    )
    products = mutableListOf<Product>(
      Product(1, "Sammmmwitch", 5.69, 3),
      Product(2, "Smartphone", 2137.69, 2),
      Product(3, "Chicken", 14.99, 3),
      Product(4, "Harnas", 3.14, 1),
      )
  }


  public fun getCategories(): MutableList<Category> {
    return categories
  }

  public fun getCategoryById(id: Long): Category? {
    return categories.find { it.id == id }
  }

  public fun getProductsByCategoryId(categoryId: Long): MutableList<Product> {
    return products.filter { it.categoryId == categoryId }.toMutableList()
  }
}