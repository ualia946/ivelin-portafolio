# Documentación de Arquitectura: Infraestructura Web & API Serverless

## 1. Visión General

Esta arquitectura representa una solución híbrida de entrega de contenido y procesamiento backend, diseñada para maximizar el rendimiento global, minimizar la latencia y asegurar la infraestructura contra ataques modernos.

El sistema desacopla el **Frontend** (contenido estático) del **Backend** (servicios de API), utilizando **Cloudflare** como capa de unificación, seguridad y distribución global (Edge Network).

![Diagrama de Arquitectura](../../images/CloudflareIntegration.png)

---

## 2. Leyenda del Diagrama

* 🟦 **Flujo Azul (WEB-1 a WEB-15):** Ciclo de vida de la solicitud de contenido estático (HTML, CSS, JS).
* 🟥 **Flujo Rojo (API-1 a API-15):** Ciclo de vida de las solicitudes a la API de negocio (Generación de PDF, obtener diagrama de la infraestructura, etc...).
* ⬜ **Flujo Blanco:** Pasos de resolución DNS y conexión inicial comunes a ambos flujos.

---

## 3. Flujo A: Entrega de Contenido Web (Static Web App)

**Objetivo:** Servir la página web `ivelinapostolov.com` con la mínima latencia posible.

* **Paso WEB-1 a WEB-3 (DNS & Resolución):**
    * El usuario (desde España, Japón o Australia) solicita `ivelinapostolov.com`.
    * La petición DNS llega a los **Nameservers de Cloudflare**.
    * Cloudflare devuelve su propia IP pública (Anycast), ocultando la ubicación real de Azure.

* **Paso WEB-4 a WEB-6 (Ingreso al Edge):**
    * La solicitud HTTP entra al Centro de Datos de Cloudflare más cercano al usuario.

* **Paso WEB-7 a WEB-9 (Cache Lookup):**
    * Cloudflare verifica su memoria caché interna.
    * **Escenario A (Cache HIT):** Si el archivo existe, se sirve inmediatamente (retorno rápido).
    * **Escenario B (Cache MISS):** Si no existe, se procede al origen (Azure).

* **Paso WEB-10 (Viaje al Origen):**
    * Cloudflare establece una conexión segura con **Azure Static Web App**.

* **Paso WEB-11 (Procesamiento en Azure):**
    * Azure recupera los archivos estáticos (HTML/JS) de su almacenamiento.

* **Paso WEB-12 (Respuesta del Origen):**
    * Azure devuelve el contenido a Cloudflare.

* **Paso WEB-13 a WEB-14 (Cache Fill):**
    * Cloudflare guarda una copia de estos archivos en su servidor local para futuros usuarios (optimizando la latencia global).

* **Paso WEB-15 (Entrega Final):**
    * El usuario recibe la página web en su navegador.

---

## 4. Flujo B: Servicios de API (Backend Serverless)

**Objetivo:** Procesar lógica dinámica en `api.ivelinapostolov.com` (ej: generar CV personalizado).

* **Paso API-1 a API-3 (Solicitud Dinámica):**
    * El navegador del usuario (mediante JavaScript) ejecuta una llamada a `api.ivelinapostolov.com`.

* **Paso API-4 a API-6 (Security Screening):**
    * La solicitud llega a Cloudflare. Aquí se activan los motores de seguridad:
        * **DDoS Protection:** Mitigación de ataques volumétricos.
        * **WAF (Web Application Firewall):** Bloqueo de inyecciones SQL o peticiones maliciosas.
        * **Rate-Limiting:** Control de velocidad para evitar abusos.

* **Paso API-10 (Túnel Seguro):**
    * Cloudflare establece un túnel encriptado **Full (Strict)** hacia Azure.
    * Se utiliza un **Certificado de Origen** para autenticar que Cloudflare está hablando con el servidor legítimo.

* **Paso API-11 (API Gateway & Lógica):**
    * **Azure API Management (APIM):** Recibe la petición, valida el dominio `api.ivelinapostolov.com` y enruta el tráfico.
    * **Backend Logic:** APIM invoca a la **Azure Function** (o Container App) que ejecuta el código de generación del PDF.

* **Paso API-12 (Generación de Respuesta):**
    * El servicio de Azure genera el documento dinámico y lo devuelve a APIM.

* **Paso API-13 a API-14 (Respuesta Segura):**
    * La respuesta viaja de vuelta a través de la red de Cloudflare. Generalmente, este contenido dinámico **no se cachea** (o se cachea con reglas muy específicas basadas en parámetros) para asegurar que el usuario recibe su información personalizada.

* **Paso API-15 (Consumo):**
    * El navegador recibe el JSON o PDF y lo muestra al usuario.
    