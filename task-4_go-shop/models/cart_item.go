package models

import "gorm.io/gorm"

type CartItem struct {
	gorm.Model
	CartID    uint `json:"cart_id"`
	Quantity  uint `json:"quantity"`
	ProductID uint `json:"product_id"`
	Product   Product
}
