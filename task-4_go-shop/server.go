package main

import (
	"go_shop/config"
	"go_shop/routes"
	"go_shop/utils"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	config.InitDB()
	utils.SeedDatabase()

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
	}))

	routes.RegisterRoutes(e)

	e.Logger.Fatal(e.Start(":8000"))
}
