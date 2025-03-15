package repositories

import slick.jdbc.PostgresProfile.api._
import utils.CreateUpdateRepository

import scala.concurrent.{ExecutionContext, Future}
import models._

class BasketRepository(db: Database)(implicit ec: ExecutionContext) extends CreateUpdateRepository[Basket, BasketCreate, BasketUpdate] {
  private val baskets = Basket.baskets
  private val basketItems = BasketItem.basketItems


  def create(entity: BasketCreate): Future[Basket] = {
    val newBasket = Basket(0, entity.userId)
    val insertQuery = (baskets returning baskets.map(_.id)) += newBasket
    db.run(insertQuery).map { generatedId =>
      newBasket.copy(id = generatedId)
    }
  }

  def update(id: Long, entity: BasketUpdate): Future[Int] = {
    val updateQuery = baskets.filter(_.id === id).map(_.userId)
    val updateValue = entity.userId.getOrElse(0L)
    db.run(updateQuery.update(updateValue))
  }

  def removeItemFromBasket(basketId: Long, productId: Long): Future[Int] = {
    val action = basketItems.filter(bi => bi.basketId === basketId && bi.productId === productId).delete
    db.run(action)
  }

  def addProductToBasket(basketId: Long, productId: Long, quantity: Int): Future[Unit] = {
    val action = for {
      existingItem <- basketItems.filter(bi => bi.basketId === basketId && bi.productId === productId).result.headOption
      _ <- existingItem match {
        case Some(item) =>
          val updatedQuantity = item.quantity + quantity
          basketItems.filter(bi => bi.basketId === basketId && bi.productId === productId)
            .map(_.quantity)
            .update(updatedQuantity)
        case None =>
          basketItems += BasketItem(0, quantity, basketId, productId)
      }
    } yield ()

    db.run(action.transactionally)
  }

  def getBasketWithItems(basketId: Long): Future[Option[BasketWithItems]] = {
    val query = for {
      (basket, item) <- baskets.filter(_.id === basketId) joinLeft basketItems on (_.id === _.basketId)
    } yield (basket, item)

    db.run(query.result).map { results =>
      results.headOption.map { case (basket, _) =>
        val items = results.flatMap(_._2)
        BasketWithItems(basket, items)
      }
    }
  }

}