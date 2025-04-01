package org.example.products

data class Product(val id: Long, val name: String, val price: Double, val categoryId: Long? = null)
