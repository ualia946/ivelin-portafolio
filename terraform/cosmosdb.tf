resource "azurerm_cosmosdb_account" "db_account" {
  name = "cosmos-ivelin-portafolio-${random_string.suffix.result}"
  location = azurerm_static_web_app.web_portfolio.location
  resource_group_name = azurerm_resource_group.rg-webapp.name
  offer_type = "Standard"
  kind = "GlobalDocumentDB"

  free_tier_enabled = "true"

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location = azurerm_static_web_app.web_portfolio.location
    failover_priority = 0
  }

  tags = {
    Environment = "Production"
    Project = "Portfolio"
  }
}

resource "azurerm_cosmosdb_sql_database" "db_sql" {
  name = "PortfolioDB"
  account_name = azurerm_cosmosdb_account.db_account.name
  resource_group_name = azurerm_resource_group.rg-webapp.name
}

resource "azurerm_cosmosdb_sql_container" "container_visitas" {
  name = "General"
  resource_group_name = azurerm_resource_group.rg-webapp.name
  account_name = azurerm_cosmosdb_account.db_account.name
  database_name = azurerm_cosmosdb_sql_database.db_sql.name
  partition_key_paths = ["/type"]
}

resource "random_string" "suffix" {
  length = 6
  special = false
  upper = false
}