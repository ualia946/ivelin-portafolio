from schemas import UserCVData, WorkExperience, Highlight, Experience, Education, SkillCategory

MY_FULL_CV = UserCVData(
    fullname="Ivelin Apostolov",
    role="Data Engineering & Cloud | Estudiante de último curso de Ingeniería Informática",
    location="Almería, España",
    phone="+34 633 35 28 14",
    email="2004ivchoapostolov@gmail.com",
    linkedin_url="https://www.linkedin.com/in/ivelin-apostolov-a7a48a359/",
    github_url="https://github.com/ualia946",
    web_url="https://www.ivelinapostolov.com/",
    summary="Estudiante de Ingeniería Informática con solo el TFG pendiente, orientado a construir pipelines de datos de principio a fin y la infraestructura cloud que los sostiene, incluida la integración de modelos de lenguaje mediante RAG. Antes de elegir tecnología, analizo el problema y lo que realmente se necesita. Después diseño pensando en lo que puede fallar en condiciones reales: que no se pierdan datos si cae la red, que el sistema sea observable y que cualquier entorno pueda reconstruirse con infraestructura como código y CI/CD. Busco incorporarme a un equipo de ingeniería de datos, cloud o IA, con disponibilidad a partir de diciembre de 2026.",

    # Experiencia laboral real: se muestra en todos los perfiles, no se filtra por rol
    work_experience=[
        WorkExperience(
            company="Grupo de Investigación COSIE, Universidad de Almería",
            position="Investigador en Prácticas · Ingeniería de Datos e IoT",
            period="Mayo 2026 – Actualidad",
            description="Sistema de monitorización y optimización energética para decidir cómo climatizar las aulas de la universidad, equilibrando el confort de los estudiantes y el gasto eléctrico.",
            achievements=[
                Highlight(
                    title="Datos fiables aunque falle la red",
                    text="Los nodos de las aulas pierden la conexión de forma puntual, lo que dejaría huecos en los datos. Diseñé el firmware de los ESP32 para guardar las lecturas en memoria flash y reenviarlas al reconectar, sin pérdidas durante los cortes."
                ),
                Highlight(
                    title="Ingesta en tiempo real y reproducible",
                    text="Había que recoger de forma continua las lecturas de los nodos repartidos por las aulas. Elegí MQTT, un protocolo ligero pensado para dispositivos con pocos recursos, y una base de datos de series temporales. Desplegué todo en contenedores para poder replicarlo en cualquier servidor."
                ),
                Highlight(
                    title="Visibilidad de todo el sistema",
                    text="Sin monitorización, un nodo caído o un consumo anómalo pasarían inadvertidos. Definí como código dashboards de Grafana para tres frentes: condiciones de las aulas, salud de los nodos y consumo eléctrico, medido con dispositivos Shelly en los cuadros eléctricos."
                ),
                Highlight(
                    title="Del dato a la decisión",
                    text="Decidir cuándo y cómo climatizar cada aula obliga a equilibrar confort y coste entre una enorme cantidad de combinaciones posibles. Estoy desarrollando un algoritmo genético en Python que combina datos de sensores, horarios académicos y la previsión de AEMET para generar planes diarios de climatización."
                )
            ],
            technologies=["C++ (ESP32, PlatformIO)", "MQTT (Mosquitto)", "Telegraf", "InfluxDB", "Grafana", "Docker", "Python", "API de AEMET"]
        )
    ],

    education=[
        Education(
            institution="Universidad de Almería",
            degree="Grado en Ingeniería Informática (Mención TI)",
            year="2022 – Actualidad",
            note="Asignaturas completadas; pendiente únicamente el Trabajo de Fin de Grado. Disponibilidad a partir de diciembre de 2026."
        ),
        Education(
            institution="Microsoft",
            degree="Microsoft Certified: Azure Fundamentals (AZ-900)",
            year="2025"
        )
    ],

    languages=["Español (nativo/bilingüe)", "Búlgaro (nativo)", "Inglés (C1, British Council, 2023)"],

    skills=[
        SkillCategory(
            category_name="Datos",
            keywords=["Python", "pipelines de ingesta", "MQTT", "Telegraf", "InfluxDB", "Grafana", "Power BI"]
        ),
        SkillCategory(
            category_name="Cloud y DevOps",
            keywords=["Azure", "Terraform", "Docker", "GitHub Actions", "CI/CD", "Linux", "Bash", "Nginx", "Kubernetes (nivel básico)"]
        ),
        SkillCategory(
            category_name="IA",
            keywords=["RAG", "bases de datos vectoriales", "integración de LLMs (Gemini API)"]
        ),
        SkillCategory(
            category_name="Otros",
            keywords=["C++", "ESP32", "JavaScript/Node.js"]
        )
    ],

    # Proyectos: se filtran por rol según el campo `stack` (ver get_tailored_cv)
    experience=[
        Experience(
            project_name="Portfolio web: plataforma personal en Azure con IA y control de costes",
            url="https://www.ivelinapostolov.com/",
            description="Web para presentarme que funciona también como demostración práctica de cómo diseño, despliego y opero un sistema en cloud.",
            achievements=[
                Highlight(
                    title="Un CV para cada búsqueda",
                    text="Cada reclutador busca un perfil distinto, y un único CV genérico no encaja con todos. Desarrollé un microservicio que ofrece la versión del CV adaptada al perfil que busca el visitante."
                ),
                Highlight(
                    title="Un asistente que no se inventa nada",
                    text="Un modelo de lenguaje que responde sobre mí puede dar datos falsos. Convertí el contenido del CV en vectores en una base de datos vectorial, de forma que el asistente solo responde con información que aparece en él."
                ),
                Highlight(
                    title="Control del coste de la infraestructura",
                    text="En cloud el gasto puede crecer sin que nadie lo note. Programé tareas que recogen cada día el coste de cada recurso de Azure y lo muestran en un panel de Power BI publicado en la propia web."
                ),
                Highlight(
                    title="Infraestructura reproducible y a la vista",
                    text="Toda la infraestructura está definida con Terraform y se despliega con CI/CD y tests end-to-end automáticos, así que cada cambio se verifica antes de publicarse. La propia web muestra todos los componentes que la forman."
                )
            ],
            highlighted_tech=["Azure (Functions, Static Web Apps, Cosmos DB for MongoDB vCore)", "Terraform", "Python (FastAPI)", "Node.js", "Gemini API", "Power BI", "GitHub Actions", "Playwright"],
            stack=["azure", "terraform", "iac", "serverless", "azure functions", "cosmos db", "mongodb", "nosql", "vector database", "python", "fastapi", "node.js", "javascript", "api", "rest", "rag", "llm", "gemini", "ai", "power bi", "bi", "monitorización", "github actions", "ci/cd", "playwright", "cloud", "devops", "data"]
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
