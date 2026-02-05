variable "cosmos_db_endpoint" {
  description = "URL de la base de datos"
  type = string
  sensitive = true
}

 variable "cosmos_db_key" {
   description = "Clave de la base de datos"
   type = string
   sensitive = true
 }

 variable "mongo_username" {
   description = "Nombre de usuario para el clúster de MongoDB"
   type = string
   sensitive = false
 }

 variable "mongo_password" {
   description = "Contraseña de usuario para el clúster de MongoDB"
   type = string
   sensitive = true
 }

 variable "gemini_api" {
   description = "Api de Gemini"
   type = string
   sensitive = true
 }

 variable "github_token" {
   description = "Token de GitHub para permitir a SWA comunicarse con el repositorio"
   type = string
   sensitive = true
 }

 variable "subscription_id" {
   description = "Id de la suscripción de Azure"
   type = string
   sensitive = true
 }

 variable "pfx_password" {
   description = "Contraseña para el archivo pfx del certificado SSL"
   type = string
   sensitive = true
 }