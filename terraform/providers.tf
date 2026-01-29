terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 4.0"
    }
  }
  cloud {
    organization = "ivelin-org"
    workspaces {
      name = "ivelin-portafolio"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "rg-webapp" {
  name = "rg-webapp"
  location = "spaincentral"
}