package models

import play.api.libs.json.{Json, OFormat}
import slick.jdbc.PostgresProfile.api._
import utils.HasId

case class Product(id: Long, name: String, price: BigDecimal, categoryId: Option[Long])
case class ProductCreate(name: String, price: BigDecimal, categoryId: Option[Long])
case class ProductUpdate(name: Option[String], price: Option[BigDecimal], categoryId: Option[Long])

class Products(tag: Tag) extends Table[Product](tag, "products") with HasId {
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def name = column[String]("name")
  def price = column[BigDecimal]("price")
  def categoryId = column[Option[Long]]("category_id")

  override def * = (id, name, price, categoryId).mapTo[Product]
}

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
  val products = TableQuery[Products]
}

object ProductUpdate {
  implicit val format: OFormat[ProductUpdate] = Json.format[ProductUpdate]
}

object ProductCreate {
  implicit val format: OFormat[ProductCreate] = Json.format[ProductCreate]
}
