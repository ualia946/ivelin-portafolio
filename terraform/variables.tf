variable "cosmos_db_endpoint" {
  description = "URL de la base de datos"
  type = "string"
  sensitive = true
}

 variable "cosmos_db_key" {
   description = "Clave de la base de datos"
   type = "string"
   sensitive = true
 }