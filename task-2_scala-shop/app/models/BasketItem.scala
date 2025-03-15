package models

import play.api.libs.json.{Json, OFormat}
import slick.jdbc.PostgresProfile.api._
import utils.HasId

case class BasketItem(id: Long = 0,  quantity: Int, basketId: Long, productId: Long)

class BasketItems(tag: Tag) extends Table[BasketItem](tag, "basket_items") with HasId {
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def quantity = column[Int]("quantity")
  def basketId: Rep[Long] = column[Long]("basket_id")
  def productId: Rep[Long] = column[Long]("product_id")
  def basket = foreignKey("fk_basket", basketId, TableQuery[Baskets])(_.id, onDelete = ForeignKeyAction.Cascade)
  def product = foreignKey("fk_product", productId, TableQuery[Products])(_.id, onDelete = ForeignKeyAction.Cascade)

  override def * = (id, quantity, basketId, productId).mapTo[BasketItem]
}

object BasketItem {
  implicit val format: OFormat[BasketItem] = Json.format[BasketItem]
  val basketItems = TableQuery[BasketItems]
}
