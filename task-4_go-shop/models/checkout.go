package models

type CheckoutItem struct {
	ID       uint `json:"id"`
	Quantity uint `json:"quantity"`
}

type CheckoutData struct {
	FirstName string         `json:"first_name"`
	LastName  string         `json:"last_name"`
	Email     string         `json:"email"`
	Products  []CheckoutItem `json:"products"`
}
