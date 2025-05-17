package config

import (
	"go_shop/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("shop.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}

	err = DB.AutoMigrate(&models.Category{}, &models.Product{}, &models.Cart{}, &models.CartItem{})
	if err != nil {
		panic("failed to run auto migrations")
	}
}
