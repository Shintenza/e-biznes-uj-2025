package main

import (
	"go_shop/config"
	"go_shop/routes"
	"go_shop/utils"

	"github.com/labstack/echo/v4"
)

func main() {
	config.InitDB()
	utils.SeedDatabase()

	e := echo.New()
	routes.RegisterRoutes(e)

	e.Logger.Fatal(e.Start(":8000"))
}
