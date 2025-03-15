package models

import play.api.libs.json.{Json, OFormat}
import slick.jdbc.PostgresProfile.api._
import utils.HasId

case class Category(id: Long = 0, name: String)
case class CategoryCreate(name: String)
case class CategoryUpdate(name: Option[String])

class Categories(tag: Tag) extends Table[Category](tag, "categories") with HasId {
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def name = column[String]("name")

  override def * = (id, name).mapTo[Category]
}

object Category {
  implicit val format: OFormat[Category] = Json.format[Category]
  val categories = TableQuery[Categories]
}

object CategoryCreate {
  implicit val format: OFormat[CategoryCreate] = Json.format[CategoryCreate]
}

object CategoryUpdate {
  implicit val format: OFormat[CategoryUpdate] = Json.format[CategoryUpdate]
}
