package utils

import (
	"go_shop/config"
	"go_shop/models"
	"math/rand"
)

func ptrUint(u uint) *uint {
	return &u
}

func SeedDatabase() {
	categories := []*models.Category{
		{Name: "Electronics"},
		{Name: "Instruments"},
		{Name: "Drinks"},
		{Name: "Food"},
	}

	products := []*models.Product{
		{
			Name:        "Smartphone",
			Description: "Latest model smartphone with advanced features.",
			ImageUrl:    "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			Price:       699.99,
			CategoryID:  ptrUint(1),
		},
		{
			Name:        "Electric Guitar",
			Description: "High-quality electric guitar for music enthusiasts.",
			ImageUrl:    "https://images.pexels.com/photos/164774/pexels-photo-164774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			Price:       999.50,
			CategoryID:  ptrUint(2),
		},
		{
			Name:        "Soda",
			Description: "Refreshing carbonated drink.",
			ImageUrl:    "https://images.pexels.com/photos/13354391/pexels-photo-13354391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			Price:       1.99,
			CategoryID:  ptrUint(3),
		},
		{
			Name:        "Chocolate Bar",
			Description: "Delicious dark chocolate.",
			ImageUrl:    "https://images.pexels.com/photos/6167333/pexels-photo-6167333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			Price:       2.50,
			CategoryID:  ptrUint(4),
		},
	}
	carts := []*models.Cart{
		{
			UserId: uint(rand.Intn(1000) + 1), // Losowy userID, np. z zakresu 1-1000
			CartItems: []models.CartItem{
				{
					Quantity:  2,
					ProductID: 1,
				},
				{
					Quantity:  1,
					ProductID: 3,
				},
			},
		},
		{

			UserId: uint(rand.Intn(1000) + 1), // Kolejny losowy userID
			CartItems: []models.CartItem{
				{
					Quantity:  3,
					ProductID: 2,
				},
				{
					Quantity:  1,
					ProductID: 4,
				},
			},
		},
	}

	config.DB.Save(categories)
	config.DB.Save(products)
	config.DB.Save(carts)
}
