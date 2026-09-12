from schemas import UserCVData, WorkExperience, Highlight, Experience, Education, SkillCategory

MY_FULL_CV = UserCVData(
    fullname="Ivelin Apostolov",
    role="Ingeniero Informático | Data, IoT & Cloud Computing",
    location="Almería, España",
    phone="+34 633 35 28 14",
    email="2004ivchoapostolov@gmail.com",
    linkedin_url="https://www.linkedin.com/in/ivelin-apostolov-a7a48a359/",
    github_url="https://github.com/ualia946",
    web_url="https://www.ivelinapostolov.com/",
    summary="Ingeniero Informático con experiencia práctica en el desarrollo de soluciones IoT, arquitecturas de datos y observabilidad. Especializado en diseñar pipelines desde la recolección de datos en hardware (ESP32, C++) hasta su almacenamiento e integración con algoritmos de optimización en Python. Complementado con sólidos conocimientos en arquitecturas Cloud (Azure), automatización e infraestructura como código.",

    # Experiencia laboral real: se muestra en todos los perfiles, no se filtra por rol
    work_experience=[
        WorkExperience(
            company="Universidad de Almería (Grupo de Investigación COSIE)",
            location="Almería, España",
            position="Investigador en Prácticas - IoT & Data Engineer",
            period="Mayo 2026 - Actualidad",
            description="Desarrollo de un sistema de monitorización IoT y optimización energética para las aulas universitarias, buscando el equilibrio entre el confort térmico/ambiental y la reducción del gasto eléctrico.",
            achievements=[
                Highlight(
                    title="Desarrollo de Firmware (C++/PlatformIO)",
                    text="Programación de microcontroladores ESP32 para la recolección de datos (CO2, temperatura, PIR). Implementé un sistema de resiliencia usando memoria flash y búferes temporales para retener datos durante caídas de red y enviarlos al recuperar la conexión."
                ),
                Highlight(
                    title="Pipeline de Datos & Infraestructura",
                    text="Diseñé y desplegué en local mediante Docker un stack de recolección de datos en tiempo real compuesto por Mosquitto (MQTT), Telegraf e InfluxDB."
                ),
                Highlight(
                    title="Observabilidad (Grafana)",
                    text="Creación de dashboards definidos como código (JSON) para monitorizar tres pilares: variables ambientales, telemetría y salud de los nodos, y consumo energético (integrando dispositivos Shelly en cuadros eléctricos)."
                ),
                Highlight(
                    title="Algoritmia y Optimización (Python)",
                    text="Desarrollo actual de un algoritmo genético alimentado por datos de sensores, horarios académicos y clima exterior (API de AEMET) para generar planes diarios automatizados de HVAC (aire acondicionado), minimizando el coste energético y el disconfort."
                )
            ]
        )
    ],

    education=[
        Education(
            institution="Universidad de Almería",
            degree="Grado en Ingeniería Informática (Mención TI)",
            year="2022 - 2026"
        ),
        Education(
            institution="Microsoft Certified",
            degree="Azure Fundamentals (AZ-900)",
            year="2025"
        ),
        Education(
            institution="Inglés",
            degree="Nivel C1 (British Council)",
            year="2023"
        ),
        Education(
            institution="Búlgaro",
            degree="Nativo",
            year=""
        )
    ],

    skills=[
        SkillCategory(
            category_name="Lenguajes",
            keywords=["Python", "C++", "JavaScript/Node.js", "Bash Scripting"]
        ),
        SkillCategory(
            category_name="Data & IoT",
            keywords=["InfluxDB", "MQTT (Mosquitto)", "Telegraf", "Grafana", "PlatformIO", "ESP32"]
        ),
        SkillCategory(
            category_name="Cloud & DevOps",
            keywords=["Azure", "Docker", "Kubernetes (Nociones básicas)", "Terraform", "GitHub Actions"]
        ),
        SkillCategory(
            category_name="Bases de Datos & IA",
            keywords=["Cosmos DB", "MongoDB vCore", "Integración de LLMs (RAG)"]
        )
    ],

    # Proyectos: se filtran por rol según el campo `stack` (ver get_tailored_cv)
    experience=[
        Experience(
            project_name="Portfolio Web Interactivo (Arquitectura Serverless & IA en Azure)",
            achievements=[
                "Diseñé y desplegué una arquitectura cloud-native en Azure para mi web personal, gestionando la infraestructura íntegramente con Terraform (Azure Functions, Cosmos DB, Static Web Apps).",
                "Desarrollé un backend (Python/FastAPI, Node.js) que integra un asistente virtual basado en arquitectura RAG, utilizando MongoDB vCore y la API de Gemini para la resolución de consultas en tiempo real.",
                "Implementé pipelines de CI/CD con GitHub Actions y tests End-to-End automatizados con Playwright."
            ],
            highlighted_tech=["Terraform", "Azure", "FastAPI", "Gemini API", "RAG", "Playwright"],
            stack=["azure", "terraform", "iac", "serverless", "azure functions", "cosmos db", "mongodb", "nosql", "python", "fastapi", "node.js", "javascript", "api", "rest", "rag", "llm", "gemini", "ai", "github actions", "ci/cd", "playwright", "cloud", "devops", "data"]
        ),

        Experience(
            project_name="Laboratorio de Sistemas e Infraestructura Segura",
            note="Agrupación de prácticas de laboratorio y entornos locales.",
            achievements=[
                "Configuración de entornos aplicando principios de Infraestructura como Código (Terraform) y metodologías GitOps.",
                "Despliegue de servicios en contenedores (Docker) y comprensión práctica de los conceptos de orquestación básica y alta disponibilidad mediante Kubernetes.",
                "Administración de sistemas Linux, automatización de tareas y copias de seguridad con Bash, y configuración de topologías de red seguras (Firewalls, Nginx)."
            ],
            stack=["linux", "sysadmin", "sistemas", "bash", "scripting", "backup", "networking", "redes", "firewall", "nginx", "terraform", "iac", "gitops", "docker", "containers", "kubernetes", "k8s", "devops", "security"]
        )
    ]
)

# --- LÓGICA DE NEGOCIO ---
def get_tailored_cv(target_role: str) -> UserCVData:

    if target_role == 'generic': return MY_FULL_CV

    cv_result = MY_FULL_CV.model_copy(deep=True)
    role_definitions = {

        # PERFIL 1: DEVOPS & CLOUD ENGINEER
        "devops": [
            "devops", "cloud", "azure", "kubernetes", "k8s", "aks", "docker", "containers",
            "terraform", "iac", "bicep", "helm", "github actions", "ci/cd", "pipelines",
            "bash", "linux", "scripting", "gitops", "argocd", "prometheus", "grafana",
            "serverless", "azure functions", "identity", "entra id", "zero trust",
        ],

        # PERFIL 2: SYSADMIN & SRE (Site Reliability Engineering)
        "sysadmin": [
            "sysadmin", "sistemas", "linux", "debian", "ubuntu", "windows server",
            "bash", "shell", "scripting", "cron", "powershell",
            "redes", "networking", "tcp/ip", "dns", "dhcp", "vpn", "firewall",
            "iptables", "mikrotik", "routing", "raid", "lvm", "storage", "backup",
            "security", "ssh", "active directory", "monitorización",
            "vmware", "virtualization", "ansible", "nagios", "zabbix", "apache", "nginx"
        ],

        # PERFIL 3: DATA ENGINEER, IoT & BI
        "data": [
            "data", "datos", "data engineer", "etl", "business intelligence", "bi",
            "power bi", "dax", "power bi embedded", "visualización",
            "sql", "sql server", "cosmos db", "nosql", "mongodb", "vector database",
            "azure functions", "serverless",
            "python", "pandas", "numpy", "spark", "databricks", "azure data factory",
            "synapse", "snowflake", "big data", "data warehouse",
            "iot", "mqtt", "mosquitto", "telegraf", "influxdb", "grafana", "esp32", "platformio", "time series"
        ],

        # PERFIL 4: FULL STACK / BACKEND DEVELOPER
        "developer": [
            "developer", "desarrollador", "software", "backend", "frontend", "full stack",
            "python", "fastapi", "node.js", "javascript", "react", "html", "css",
            "api", "rest", "restful", "json", "git",
            "azure functions", "serverless", "cosmos db", "mongodb",
            "ai", "artificial intelligence", "rag", "llm", "gemini", "openai", "embeddings",
            "typescript", "next.js", "django", "flask", "java", "spring", "c#", ".net",
            "docker", "microservices", "graphql", "sql", "postgresql"
        ]
    }

    userStack = role_definitions[target_role]
    filtered_experience = []
    for exp in cv_result.experience:
        exp_stack_lower = [tech.lower() for tech in exp.stack]
        common_elements = set(userStack) & set(exp_stack_lower)

        if common_elements:
            filtered_experience.append(exp)

    cv_result.experience = filtered_experience

    return cv_result

if __name__ == "__main__":
    print("--- TEST DE FILTRADO ---")

    for role in ["generic", "devops", "sysadmin", "data", "developer"]:
        cv = get_tailored_cv(role)
        print(f"{role}: {len(cv.work_experience)} exp. profesional, {len(cv.experience)} proyectos")
        for exp in cv.experience:
            print(f"  - {exp.project_name}")
