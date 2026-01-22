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
  sku_name = "FC1"
  os_type = "Linux"
}

resource "azurerm_function_app_flex_consumption" "function-app" {
    name = "func-portfolio-api-${random_string.suffix.result}"
    resource_group_name = azurerm_resource_group.rg-webapp.name
    location = azurerm_static_web_app.web_portfolio.location
    service_plan_id = azurerm_service_plan.asp.id

    storage_container_type = "blobContainer"
    storage_container_endpoint = "${azurerm_storage_account.storage.primary_blob_endpoint}${azurerm_storage_container.container-functions.name}"
    storage_authentication_type = "StorageAccountConnectionString"
    storage_access_key = azurerm_storage_account.storage.primary_access_key
    runtime_name = "node"
    runtime_version = "20"
    maximum_instance_count = 50
    instance_memory_in_mb = 2048

    site_config {
      cors {
        allowed_origins = ["https://${azurerm_static_web_app.web_portfolio.default_host_name}", "https://www.ivelinapostolov.com"]
      }
    }

    app_settings = {
      "AzureWebJobsStorage" = azurerm_storage_account.storage.primary_connection_string
      "COSMOS_DB_ENDPOINT" = var.cosmos_db_endpoint
      "COSMOS_DB_KEY" = var.cosmos_db_key
      "GEMINI_API" = var.gemini_api
      "MONGODB_URI" = var.mongo_password,
      "RESOURCE_GROUP_NAME" = azurerm_resource_group.rg-webapp.name
      "AzureWebJobsFeatureFlags" = "EnableWorkerIndexing",
      "FUNCTIONS_NODE_BLOCK_ON_ENTRY_POINT_ERROR" = "true",
      "SUBSCRIPTION_ID":"38e17e66-df57-442d-8803-7823dad33a58"
    }

    identity {
      type = "SystemAssigned"
    }
    
}


