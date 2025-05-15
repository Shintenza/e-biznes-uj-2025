package models

type CartItem struct {
	ModelBase
	CartID    uint `json:"cart_id"`
	Quantity  uint `json:"quantity"`
	ProductID uint `json:"product_id"`
	Product   Product
}
