package utils

import scala.concurrent.Future

trait CreateUpdateRepository[M, C, U] {
  def create(entity: C): Future[M]
  def update(id: Long, entity: U): Future[Int]
}
