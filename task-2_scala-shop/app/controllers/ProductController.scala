package controllers

import javax.inject._
import models._
import play.api.libs.json._
import play.api.mvc._
import repositories.ProductRepository
import slick.jdbc.PostgresProfile.api._
import utils.{CreateUpdateRepository, RequestHandler}

import scala.concurrent.ExecutionContext

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController with RequestHandler[Product, ProductCreate, ProductUpdate, Products] {

  override val db = Database.forConfig("slick.dbs.default.db")
  implicit val repository: ProductRepository = new ProductRepository(db)
  private val query = Product.products

  def list: Action[AnyContent] = super.list(query)
  def get(id: Long): Action[AnyContent] = super.get(query, id)
  def delete(id: Long): Action[AnyContent] = super.delete(query, id)
  def update(id: Long): Action[JsValue] = super.update(id)
  def create(): Action[JsValue] = super.create()
}