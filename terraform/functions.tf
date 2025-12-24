resource "azurerm_storage_account" "storage" {
  name = "storageivelin${random_string.suffix.result}"
  location = azurerm_static_web_app.web_portfolio.location
  resource_group_name = azurerm_resource_group.rg-webapp.name
  account_replication_type = "LRS"
  account_tier = "Standard"
  access_tier = "Hot"
}

resource "azurerm_storage_container" "container-functions" {
  name = "container-functions"
  storage_account_id = azurerm_storage_account.storage.id
  container_access_type = "private"
}


resource "azurerm_service_plan" "asp" {
  name = "asp-portfolio"
  resource_group_name = azurerm_resource_group.rg-webapp.name
  location = azurerm_static_web_app.web_portfolio.location
  sku_name = "Y1"
  os_type = "Linux"
}

resource "azurerm_linux_function_app" "function-app" {
    name = "func-portfolio-${random_string.suffix.result}"
    resource_group_name = azurerm_resource_group.rg-webapp.name
    location = azurerm_static_web_app.web_portfolio.location

    storage_account_name = azurerm_storage_account.storage.name
    storage_account_access_key = azurerm_storage_account.storage.primary_access_key
    service_plan_id = azurerm_service_plan.asp.id

    site_config {
      application_stack {
        node_version = "20"
      }

      cors {
        allowed_origins = ["https://${azurerm_static_web_app.web_portfolio.default_host_name}", "https//:www.ivelinapostolov.com"]
      }
    }

    app_settings = {
      "COSMOS_DB_ENDPOINT" = var.cosmos_db_endpoint
      "COSMOS_DB_KEY" = var.cosmos_db_key
      "FUNCTIONS_WORKER_RUNTIME" = "node"
      "WEBSITE_RUN_FROM_PACKAGE" = 1
    }

    identity {
      type = "SystemAssigned"
    }
    
}

data "azurerm_role_definition" "cost-reader" {
  name = "Cost Management Reader"
  scope = azurerm_resource_group.rg-webapp.id
}

resource "azurerm_role_assignment" "function-role-assignment" {
  scope = azurerm_resource_group.rg-webapp.id
  role_definition_id = azurerm_role_definition.cost-reader.id
  principal_id = azurerm_linux_function_app.function-app.identity[0].principal_id
}
