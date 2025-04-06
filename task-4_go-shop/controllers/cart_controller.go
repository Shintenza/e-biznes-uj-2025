package controllers

import (
	"errors"
	"go_shop/config"
	"go_shop/models"
	"go_shop/services"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func ListCarts(c echo.Context) error {
	return services.List[models.Cart](c)
}

func CreateCart(c echo.Context) error {
	return services.Create[models.Cart](c)
}

func RemoveCart(c echo.Context) error {
	return services.Remove[models.Cart](c, "id")
}

func UpdateCart(c echo.Context) error {
	return services.Update[models.Cart](c, "id")
}

func GetCart(c echo.Context) error {
	id := c.Param("id")
	var cart []models.Cart

	err := config.DB.Preload("CartItems.Product").First(&cart, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.NoContent(http.StatusNotFound)
	} else if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, cart)
}

func AddProductToCart(c echo.Context) error {
	id := c.Param("id")

	var cartItem models.CartItem

	if err := c.Bind(&cartItem); err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	idNum, err := strconv.ParseUint(id, 10, 32)

	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	cartItem.CartID = uint(idNum)
	println(cartItem.CartID)

	if err = config.DB.Save(&cartItem).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.NoContent(http.StatusOK)
}

func UpdateCartItem(c echo.Context) error {
	return services.Update[models.CartItem](c, "itemId")
}

func RemoveCartItem(c echo.Context) error {
	return services.Remove[models.CartItem](c, "itemId")
}
