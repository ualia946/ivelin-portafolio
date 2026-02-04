resource "azurerm_api_management" "apim" {
  name = "apim-portfolio-ivelin"
  location = azurerm_resource_group.rg-webapp.location
  resource_group_name = azurerm_resource_group.rg-webapp.name
  publisher_name = "Ivelin"
  publisher_email = "2004ivchoapostolov@gmail.com"
  
  sku_name = "Consumption_0"
}

resource "azurerm_api_management_api" "api_functions" {
    name = "functions-api"
    resource_group_name = azurerm_resource_group.rg-webapp.name
    api_management_name = azurerm_api_management.apim.name
    revision = 1
    display_name = "Azure Functions (Node.js)"
    
    protocols = [ "https" ]
    path = "azure-functions"
    service_url = "https://${azurerm_function_app_flex_consumption.function-app.default_hostname}/api"

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

resource "azurerm_api_management_api" "api_pdf_service" {
    name = "pdf-service"
    resource_group_name = azurerm_resource_group.rg-webapp.name
    api_management_name = azurerm_api_management.apim.name
    revision = 1
    display_name = "FastAPI (pdf-service)"
    
    protocols = [ "https" ]
    path = "pdf-service"
    service_url = "https://${azurerm_container_app.pdf_service.ingress[0].fqdn}"

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

