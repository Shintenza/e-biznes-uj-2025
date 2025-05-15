package controllers

import (
	"go_shop/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func HandleCheckout(c echo.Context) error {
	checkoutData := new(models.CheckoutData)
	if err := c.Bind(checkoutData); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.NoContent(http.StatusOK)
}
