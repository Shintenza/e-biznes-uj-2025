package routes

import (
	"go_shop/controllers"

	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo) {
	e.GET("/products", controllers.ListProducts)
	e.POST("/products", controllers.CreateProduct)
	e.PUT("/products/:id", controllers.UpdateProduct)
	e.DELETE("/products/:id", controllers.RemoveProduct)
	e.GET("/products/:id", controllers.GetProduct)
}
