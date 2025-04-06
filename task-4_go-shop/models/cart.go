package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	UserId    uint       `json:"user_id"`
	CartItems []CartItem `gorm:"foreignKey:CartID;constraint:OnUpdate:CASCADE;"`
}
