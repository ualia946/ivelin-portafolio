resource "azurerm_mongo_cluster" "cluster" {
  name = "chatbot-db-mongo"
  resource_group_name = azurerm_resource_group.rg-webapp.name
  location = "francecentral"

  administrator_username = var.mongo_username
  administrator_password = var.mongo_password

  compute_tier = "Free"
  high_availability_mode = "Disabled"
  storage_size_in_gb = "32"
  version = "8.0"
}

resource "azurerm_mongo_cluster_firewall_rule" "allow_azure" {
  name = "AllowAzureServices"
  mongo_cluster_id = azurerm_mongo_cluster.cluster.id
  start_ip_address = "0.0.0.0"
  end_ip_address = "0.0.0.0"
}