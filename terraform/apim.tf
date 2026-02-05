resource "azurerm_api_management" "apim" {
  name = "apim-portfolio-ivelin"
  location = azurerm_resource_group.rg-webapp.location
  resource_group_name = azurerm_resource_group.rg-webapp.name
  publisher_name = "Ivelin"
  publisher_email = "2004ivchoapostolov@gmail.com"
  
  sku_name = "Consumption_0"

  hostname_configuration {
    proxy {
      host_name = "api.ivelinapostolov.com"
      certificate = filebase64("${path.module}/cloudflare/certificado_api.pfx")
      certificate_password = var.pfx_password
    }
  }
}

# ==============================================================================
# Azure Functions API (Node.js)
# ==============================================================================
resource "azurerm_api_management_api" "api_functions" {
    name = "functions-api"
    resource_group_name = azurerm_resource_group.rg-webapp.name
    api_management_name = azurerm_api_management.apim.name
    revision = 1
    display_name = "Azure Functions (Node.js)"
    
    protocols = [ "https" ]
    path = "azure-functions"
    service_url = "https://${azurerm_function_app_flex_consumption.function-app.default_hostname}/api"

    subscription_required = false

}

resource "azurerm_api_management_api_operation" "ops_functions_get" {
  operation_id        = "all-functions-get"
  api_name            = azurerm_api_management_api.api_functions.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg-webapp.name
  display_name        = "All Functions (GET)"
  method              = "GET"
  url_template        = "/*"
  description         = "Paso a través para GET"
}

resource "azurerm_api_management_api_operation" "ops_functions_post" {
  operation_id        = "all-functions-post"
  api_name            = azurerm_api_management_api.api_functions.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg-webapp.name
  display_name        = "All Functions (POST)"
  method              = "POST"
  url_template        = "/*"
  description         = "Paso a través para POST"
}

resource "azurerm_api_management_api_policy" "policy_functions" {
  api_name = azurerm_api_management_api.api_functions.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg-webapp.name
  xml_content = <<-XML
<policies>
  <inbound>
    <base />
    <cors allow-credentials="false">
        <allowed-origins>
            <origin>https://${azurerm_static_web_app.web_portfolio.default_host_name}</origin>
            <origin>https://www.ivelinapostolov.com</origin>
            <origin>http://localhost:4321</origin>
        </allowed-origins>
        <allowed-methods>
            <method>GET</method>
            <method>POST</method>
            <method>OPTIONS</method>
        </allowed-methods>
        <allowed-headers>
            <header>Content-Type</header>
            <header>Authorization</header>
            <header>Accept</header>
            <header>Origin</header>
        </allowed-headers>
    </cors>
  </inbound>
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
XML
}

# ==============================================================================
# FastAPI pdf-service
# ==============================================================================

resource "azurerm_api_management_api" "api_pdf_service" {
    name = "pdf-service"
    resource_group_name = azurerm_resource_group.rg-webapp.name
    api_management_name = azurerm_api_management.apim.name
    revision = 1
    display_name = "FastAPI (pdf-service)"
    
    protocols = [ "https" ]
    path = "pdf-service"
    service_url = "https://${azurerm_container_app.pdf_service.ingress[0].fqdn}"

    subscription_required = false

}

resource "azurerm_api_management_api_operation" "generate-pdf" {
  operation_id = "generate-pdf"
  api_name = azurerm_api_management_api.api_pdf_service.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg-webapp.name

  display_name = "Generar PDF CV"
  method = "GET"

  url_template = "/generate-pdf"
  request {
    query_parameter {
      name = "target_role"
      type = "string"
      required = false
      description = "Rol para personalizar CV"
    }
  }
}


resource "azurerm_api_management_api_policy" "policy_pdf_service" {
  api_name = azurerm_api_management_api.api_pdf_service.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg-webapp.name
  xml_content = <<-XML
<policies>
  <inbound>
    <base />
    <cors allow-credentials="false">
        <allowed-origins>
            <origin>https://${azurerm_static_web_app.web_portfolio.default_host_name}</origin>
            <origin>https://www.ivelinapostolov.com</origin>
            <origin>http://localhost:4321</origin>
        </allowed-origins>
        <allowed-methods>
            <method>GET</method>
            <method>POST</method>
            <method>OPTIONS</method>
        </allowed-methods>
        <allowed-headers>
            <header>Content-Type</header>
            <header>Authorization</header>
            <header>Accept</header>
            <header>Origin</header>
        </allowed-headers>
    </cors>
  </inbound>
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
XML
}

