package repositories

import models.{Product, ProductCreate, ProductUpdate}
import slick.lifted.TableQuery
import slick.jdbc.PostgresProfile.api._
import utils.CreateUpdateRepository

import scala.concurrent.{ExecutionContext, Future}

class ProductRepository(db: Database)(implicit ec: ExecutionContext) extends CreateUpdateRepository[Product, ProductCreate, ProductUpdate]{
  private val products = Product.products

  def create(product: ProductCreate): Future[Product] = {
    val newProduct = new Product(0, product.name, product.price, product.categoryId)
    val insertQuery = ( products returning products.map(_.id)) += newProduct
    db.run(insertQuery).map { generatedId =>
      newProduct.copy(id = generatedId)
    }
  }
  def update(id: Long, productUpdate: ProductUpdate): Future[Int] = {
    val existingProductQuery = Product.products.filter(_.id === id).result.headOption
    db.run(existingProductQuery).flatMap {
      case Some(existingProduct) =>
        val updatedProduct = existingProduct.copy(
          name = productUpdate.name.orElse(Some(existingProduct.name)).get,
          price = productUpdate.price.orElse(Some(existingProduct.price)).get,
          categoryId = productUpdate.categoryId.orElse(existingProduct.categoryId)
        )
        val updateQuery = Product.products.filter(_.id === id).update(updatedProduct)
        db.run(updateQuery)
      case None =>
        Future.successful(0)
    }
  }}
