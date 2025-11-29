output "deployment_token" {
  value = azurerm_static_web_app.web_portfolio.api_key
  sensitive = true
}