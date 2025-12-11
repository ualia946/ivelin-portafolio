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