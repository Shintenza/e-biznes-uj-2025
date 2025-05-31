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

	e.GET("/categories", controllers.ListCategories)
	e.POST("/categories", controllers.CreateCategory)
	e.PUT("/categories/:id", controllers.UpdateCategory)
	e.DELETE("/categories/:id", controllers.RemoveCategory)
	e.GET("/categories/:id", controllers.GetCategory)
	e.GET("/categories/:id/products", controllers.GetProductsByCategoryId)

	e.GET("/carts", controllers.ListCarts)
	e.POST("/carts", controllers.CreateCart)
	e.PUT("/carts/:id", controllers.UpdateCart)
	e.DELETE("/carts/:id", controllers.RemoveCart)
	e.GET("/carts/:id", controllers.GetCart)
	e.POST("/carts/:id/products", controllers.AddProductToCart)
	e.PUT("/carts/:id/products/:itemId", controllers.UpdateCartItem)
	e.DELETE("/carts/:id/products/:itemId", controllers.RemoveCartItem)

	// dummy endpoint for handling checkout
	e.POST("/checkout", controllers.HandleCheckout)
}
