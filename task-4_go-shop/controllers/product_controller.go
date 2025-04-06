package controllers

import (
	"go_shop/models"
	"go_shop/services"

	"github.com/labstack/echo/v4"
)

func CreateProduct(c echo.Context) error {
	return services.Create[models.Product](c)
}

func ListProducts(c echo.Context) error {
	return services.List[models.Product](c)
}

func RemoveProduct(c echo.Context) error {
	return services.Remove[models.Product](c, "id")
}

func UpdateProduct(c echo.Context) error {
	return services.Update[models.Product](c, "id")
}

func GetProduct(c echo.Context) error {
	return services.Get[models.Product](c, "id")
}
