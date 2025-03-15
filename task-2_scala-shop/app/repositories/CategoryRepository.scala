package repositories
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}
import models._
import utils.CreateUpdateRepository


class CategoryRepository(db: Database)(implicit ec: ExecutionContext) extends CreateUpdateRepository[Category, CategoryCreate, CategoryUpdate]{
  val categories = Category.categories

  def create(categoryCreate: CategoryCreate): Future[Category] = {
    val newCategory = Category(0, categoryCreate.name)
    val insertQuery = (categories returning categories.map(_.id)) += newCategory
    db.run(insertQuery).map { generatedId =>
      newCategory.copy(id = generatedId) // Return the category with the new ID
    }
  }

  def update(id: Long, categoryUpdate: CategoryUpdate): Future[Int] = {
    val updateQuery = categories.filter(_.id === id).map(_.name)
    db.run(updateQuery.update(categoryUpdate.name.getOrElse("")))
  }
}
