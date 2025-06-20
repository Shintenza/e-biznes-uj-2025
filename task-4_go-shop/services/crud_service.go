package services

import (
	"errors"
	"go_shop/config"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Create[T any](c echo.Context) error {
	entity := new(T)

	if err := c.Bind(entity); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err := config.DB.Create(&entity).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusCreated)
}

func List[T any](c echo.Context) error {
	var entities []T

	if err := config.DB.Find(&entities).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, entities)
}

func Remove[T any](c echo.Context, param string) error {
	entity := new(T)
	id := c.Param(param)
	result := config.DB.Delete(entity, id)

	if result.Error != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusNoContent)

}

func Update[T any](c echo.Context, param string) error {
	id := c.Param(param)

	entity := new(T)

	if err := config.DB.First(entity, id).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	var updates map[string]any
	if err := (&echo.DefaultBinder{}).BindBody(c, &updates); err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	result := config.DB.Model(entity).Updates(updates)
	if err := result.Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.NoContent(http.StatusOK)
}

func Get[T any](c echo.Context, param string) error {
	id := c.Param("id")
	var product T

	err := config.DB.First(&product, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.NoContent(http.StatusNotFound)
	} else if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, product)
}
