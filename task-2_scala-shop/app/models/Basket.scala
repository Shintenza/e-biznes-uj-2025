package models

import play.api.libs.json.{Json, OFormat}
import slick.jdbc.PostgresProfile.api._
import utils.HasId

case class Basket(id: Long = 0,  userId: Long)
case class BasketCreate(userId: Long)
case class BasketUpdate(userId: Option[Long])

class Baskets(tag: Tag) extends Table[Basket](tag, "baskets") with HasId {
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def userId = column[Long]("user_id")

  override def * = (id, userId).mapTo[Basket]
}

case class BasketWithItems(basket: Basket, items: Seq[BasketItem])
object BasketWithItems {
  implicit val format: OFormat[BasketWithItems] = Json.format[BasketWithItems]
}

object Basket {
  implicit val format: OFormat[Basket] = Json.format[Basket]
  val baskets = TableQuery[Baskets]
}

object BasketCreate {
  implicit val format: OFormat[BasketCreate] = Json.format[BasketCreate]
}

object BasketUpdate {
  implicit val format: OFormat[BasketUpdate] = Json.format[BasketUpdate]
}
