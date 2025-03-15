package controllers

import javax.inject._
import models._
import play.api.libs.json._
import play.api.mvc._
import repositories.CategoryRepository
import slick.jdbc.PostgresProfile.api._
import utils.RequestHandler

import scala.concurrent.ExecutionContext

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController with RequestHandler[Category, CategoryCreate, CategoryUpdate, Categories] {

  override val db = Database.forConfig("slick.dbs.default.db")
  implicit val repository: CategoryRepository = new CategoryRepository(db)

  private val query = Category.categories

  def list: Action[AnyContent] = super.list(query)
  def get(id: Long): Action[AnyContent] = super.get(query, id)
  def delete(id: Long): Action[AnyContent] = super.delete(query, id)
  def update(id: Long): Action[JsValue] = super.update(id)
  def create(): Action[JsValue] = super.create()

  def productsByCategory(categoryId: Long): Action[AnyContent] = Action.async {
    val action = Product.products.filter(_.categoryId === Option(categoryId)).result
    db.run(action).map { products =>
      Ok(Json.toJson(products))
    }
  }}