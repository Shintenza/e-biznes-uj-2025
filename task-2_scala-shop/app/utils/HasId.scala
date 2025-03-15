package utils
import slick.lifted.Rep

trait HasId {
  def id: Rep[Long]
}