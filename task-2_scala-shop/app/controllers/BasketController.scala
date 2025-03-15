package controllers;

import javax.inject._
import models._
import repositories._
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.PostgresProfile.api._
import utils.RequestHandler
import scala.concurrent.ExecutionContext

@Singleton
class BasketController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController with RequestHandler[Basket, BasketCreate, BasketUpdate, Baskets] {
  val db = Database.forConfig("slick.dbs.default.db")
  implicit val repository: BasketRepository = new BasketRepository(db)

  private val query = Basket.baskets
  val basketItems = TableQuery[BasketItems]
  val products = TableQuery[Products]


  def list: Action[AnyContent] = super.list(query)
  def get(id: Long): Action[AnyContent] = super.get(query, id)
  def delete(id: Long): Action[AnyContent] = super.delete(query, id)
  def update(id: Long): Action[JsValue] = super.update(id)
  def create(): Action[JsValue] = super.create()


  def addItemToBasket(basketId: Long, productId: Long, quantity: Int): Action[AnyContent] = Action.async {
    repository.addProductToBasket(basketId, productId, quantity).map(
      _ => Ok("item added to the basket")
    )
  }

  def getBasketItems(basketId: Long): Action[AnyContent] = Action.async {
    repository.getBasketWithItems(basketId).map({
      case None => NotFound("Basket not found")
      case Some(basketWithItems) => Ok(Json.toJson(basketWithItems))
    })
  }

  def removeItemFromBasket(basketId: Long, productId: Long): Action[AnyContent] = Action.async {
    repository.removeItemFromBasket(basketId, productId).map{_=>Ok("")}
  }
}
