package models

type Product struct {
	ModelBase
	Name        string  `json:"name"`
	Description string  `json:"description"`
	ImageUrl    string  `json:"image_url"`
	Price       float64 `json:"price"`
	CategoryID  *uint   `json:"category_id"`
}
