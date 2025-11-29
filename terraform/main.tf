resource "azurerm_static_web_app" "web_portfolio" {
  name = "stapp-ivelin-portafolio"
  resource_group_name = azurerm_resource_group.rg-webapp.name
  location = "westeurope"

  sku_size = "Free"
  sku_tier = "Free"

  tags = {
    Environment = "Production"
    Project = "Portfolio"
    ManagedBy = "Terraform"
  }
}