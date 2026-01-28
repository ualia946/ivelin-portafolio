resource "azurerm_static_web_app" "web_portfolio" {
  name = "stapp-ivelin-portafolio"
  resource_group_name = azurerm_resource_group.rg-webapp.name
  location = "westeurope"

  sku_size = "Free"
  sku_tier = "Free"

  repository_branch = "main"
  repository_url = "https://github.com/ualia946/ivelin-portafolio"
  repository_token = var.github_token

  tags = {
    Environment = "Production"
    Project = "Portfolio"
    ManagedBy = "Terraform"
  }
}

resource "azurerm_static_web_app_custom_domain" "domain" {
  static_web_app_id = azurerm_static_web_app.web_portfolio.id
  domain_name = "www.ivelinapostolov.com"
  validation_type = "cname-delegation"
}