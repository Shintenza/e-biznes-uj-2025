package controllers

import (
	"go_shop/config"
	"go_shop/models"
	"go_shop/services"
	"net/http"

	"github.com/labstack/echo/v4"
)

func ListCategories(c echo.Context) error {
	return services.List[models.Category](c)
}

func CreateCategory(c echo.Context) error {
	return services.Create[models.Category](c)
}

func RemoveCategory(c echo.Context) error {
	return services.Remove[models.Category](c, "id")
}

func UpdateCategory(c echo.Context) error {
	return services.Update[models.Category](c, "id")
}

func GetCategory(c echo.Context) error {
	return services.Get[models.Category](c, "id")
}

func GetProductsByCategoryId(c echo.Context) error {
	id := c.Param("id")
	var products []models.Product
	if err := config.DB.Where("category_id = ?", id).Find(&products).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, products)
}
