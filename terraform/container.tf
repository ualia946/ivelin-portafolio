resource "azurerm_container_app_environment" "aca_env" {
  name = "cae-ivelin-portfolio"
  location = azurerm_resource_group.rg-webapp.location
  resource_group_name = azurerm_resource_group.rg-webapp.name 
}

resource "azurerm_container_app" "pdf_service" {
  name = "ca-pdf-generator"
  container_app_environment_id = azurerm_container_app_environment.aca_env.id
  resource_group_name = azurerm_resource_group.rg-webapp.name
  revision_mode = "Single"

  template {
    container {
      name = "pdf-generator"
      image = "ghcr.io/ualia946/pdf-cv-generator:v1"
      cpu = 0.25
      memory = "0.5Gi"
    }
  }

   registry {
    server = "ghcr.io"
    username = "ualia946"
    password_secret_name = "ghcr-password"
   }

   secret {
     name = "ghcr-password"
     value = var.github_token
   }

  ingress {
    allow_insecure_connections = false
    external_enabled = true
    target_port = 8000
    traffic_weight {
      percentage = 100
      latest_revision = true
    }
    cors {
      allowed_origins = ["https://${azurerm_static_web_app.web_portfolio.default_host_name}", "https://www.ivelinapostolov.com"]
    }
  }

  lifecycle {
    ignore_changes = [ 
      template[0].container[0].image
     ]
  }

  

}