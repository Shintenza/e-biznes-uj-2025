package utils

import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{ExecutionContext, Future}

trait RequestHandler[T, C, U, M <: Table[T] with HasId] {
  self: BaseController =>
  val db: Database
  implicit val repository: CreateUpdateRepository[T, C, U]

  def list(query: Query[M, T, Seq])(implicit ec: ExecutionContext, writes: Writes[Seq[T]]): Action[AnyContent] = Action.async {
    db.run(query.result).map { items =>
      Ok(Json.toJson(items))
    }
  }

  def get(query: Query[M, T, Seq], id: Long)(implicit ec: ExecutionContext, writes: Writes[T]): Action[AnyContent] = Action.async {
    db.run(query.filter(_.id === id).result.headOption).map {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def delete(query: Query[M, T, Seq], id: Long)(implicit ec: ExecutionContext): Action[AnyContent] = Action.async {
    val deleteQuery = query.filter(_.id === id).delete
    db.run(deleteQuery).map {
      case 0 => NotFound
      case _ => NoContent
    }
  }

  def create()(implicit ec: ExecutionContext, reads: Reads[C], writes: Writes[T]): Action[JsValue] = Action.async(parse.json) {
    request => {
      request.body.validate[C].fold(
        errors => Future.successful(BadRequest("")),
        entity => {
          repository.create(entity).map { createdEntity => Created(Json.toJson(createdEntity)) }
        }
      )
    }
  }

  def update(id: Long)(implicit ec: ExecutionContext, reads: Reads[U]): Action[JsValue] = Action.async(parse.json) {
    request => {
      request.body.validate[U].fold(
        errors => Future.successful(BadRequest("")),
        entity => {
          repository.update(id, entity).map {
            case 0 => NotFound
            case _ => NoContent
          }.recover {
            case ex: Exception => InternalServerError(Json.obj("message" -> "Error updating entity", "details" -> ex.getMessage))
          }
        })
    }
  }
}