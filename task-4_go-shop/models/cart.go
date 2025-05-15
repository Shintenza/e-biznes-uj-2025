package models

type Cart struct {
	ModelBase
	UserId    uint       `json:"user_id"`
	CartItems []CartItem `gorm:"constraint:OnUpdate:CASCADE;"`
}
