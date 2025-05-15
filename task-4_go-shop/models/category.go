package models

type Category struct {
	ModelBase
	Name     string    `json:"name"`
	Products []Product `gorm:"foreignKey:CategoryID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
