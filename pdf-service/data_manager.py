from schemas import UserCVData, Experience, Education, SkillCategory, SkillSubcategory

MY_FULL_CV = UserCVData(
    fullname="Ivelin Apostolov",
    role="Ingeniero Informático | Cloud, DevOps & Sistemas",
    location="Almería, España",
    phone="+34 633 35 28 14", 
    email="2004ivchoapostolov@gmail.com",
    linkedin_url="https://linkedin.com/in/ivelin-apostolov", # Asegúrate de que este sea correcto
    github_url="https://github.com/ualia946",
    summary="Ingeniero Informático especializado en Cloud Computing (Azure), DevOps y Automatización. Experto en diseñar arquitecturas Serverless seguras, gestionar infraestructura como código (IaC) y construir soluciones de IA generativa (RAG) integradas con pipelines de datos. Apasionado por la eficiencia operativa (FinOps) y la calidad del software (QA Automation).",
    
    education=[
        Education(
            institution="Universidad de Almería", 
            degree="Grado en Ingeniería Informática (Mención TI)", 
            year="2022-2026"
        ),
        Education(
            institution="Microsoft", 
            degree="Azure Fundamentals (AZ-900)", 
            year="2025"
        ),
        Education(
            institution="British Council", 
            degree="English Level C1 Certificate", 
            year="2023"
        )
    ],

    skills=[
        SkillCategory(
            category_name="Cloud & DevOps (Azure)",
            skills=[
                SkillSubcategory(
                    subcategory_name="Computación & Serverless", 
                    keywords=["Azure Functions", "Static Web Apps", "Container Apps", "Kubernetes (AKS)", "Docker"]
                ),
                SkillSubcategory(
                    subcategory_name="IaC & CI/CD", 
                    keywords=["Terraform", "GitHub Actions", "Bicep", "Playwright (E2E Testing)"]
                ),
                SkillSubcategory(
                    subcategory_name="Seguridad & Gobierno", 
                    keywords=["Managed Identities", "RBAC", "Zero Trust", "Azure Entra ID", "VNet"]
                )
            ]
        ),
        SkillCategory(
            category_name="Backend & Data Engineering",
            skills=[
                SkillSubcategory(
                    subcategory_name="Desarrollo", 
                    keywords=["Python (FastAPI)", "Node.js", "JavaScript", "React", "Astro"]
                ),
                SkillSubcategory(
                    subcategory_name="Bases de Datos & IA", 
                    keywords=["Cosmos DB (Mongo vCore & NoSQL)", "Vector Search", "RAG Architecture", "Google Gemini API"]
                ),
                SkillSubcategory(
                    subcategory_name="Observabilidad", 
                    keywords=["Azure Resource Graph", "Log Analytics", "Grafana", "Prometheus"]
                )
            ]
        ),
        SkillCategory(
            category_name="Sistemas & Linux",
            skills=[
                SkillSubcategory(
                    subcategory_name="Administración", 
                    keywords=["Bash Scripting", "Cron", "LVM", "RAID", "Windows Server"]
                ),
                SkillSubcategory(
                    subcategory_name="Redes", 
                    keywords=["TCP/IP", "DNS", "Nginx", "Firewall (iptables/MikroTik)", "Routing"]
                )
            ]
        )
    ],

    experience=[
        # PROYECTO ESTRELLA: El Portafolio Completo (Combina todo lo que hemos hecho)
        Experience(
            project_name="Plataforma Cloud-Native Serverless & IA Generativa",
            achievements=[
                "Arquitectura 100% automatizada con Terraform (IaC) en Azure, integrando Azure Functions, Cosmos DB y Static Web Apps.",
                "Implementación de sistema RAG (Retrieval-Augmented Generation) con búsqueda vectorial (MongoDB vCore) para asistencia técnica mediante IA.",
                "Estrategia FinOps: Pipeline ETL diario para extracción de costes y visualización embebida con Power BI.",
                "Sistema de observabilidad en tiempo real utilizando Azure Resource Graph y visualización de tráfico global 3D.",
                "Aseguramiento de la calidad (QA) mediante pipelines CI/CD con tests End-to-End automatizados (Playwright)."
            ],
            stack=["azure", "terraform", "rag", "python", "fastapi", "node.js", "cosmos db", "power bi", "playwright", "github actions", "finops"]
        ),

        # EXPERIENCIA 2: K8s (Del PDF)
        Experience(
            project_name="Infraestructura Escalable con Kubernetes (AKS)",
            achievements=[
                "Despliegue de clústeres Kubernetes auto-reparables gestionados con Terraform para alta disponibilidad.",
                "Reducción del tiempo de entrega de software mediante pipelines CI/CD automatizados en GitHub Actions.",
                "Implementación de modelo de seguridad Zero Trust intra-cluster y monitorización centralizada con Prometheus/Grafana."
            ],
            stack=["kubernetes", "aks", "docker", "terraform", "devops", "security", "prometheus", "grafana", "azure"]
        ),

        # EXPERIENCIA 3: SysAdmin (Del PDF)
        Experience(
            project_name="Administración de Sistemas Linux & Redes Seguras",
            achievements=[
                "Diseño de topologías de red seguras con segmentación de subredes y Firewalls virtuales (MikroTik).",
                "Gestión de almacenamiento resiliente (RAID 5/10, LVM) y automatización de backups críticos con Bash.",
                "Desarrollo de scripts de administración para la gestión desatendida de recursos."
            ],
            stack=["linux", "sysadmin", "bash", "networking", "firewall", "storage", "scripting"]
        ),

        # EXPERIENCIA 4: Arquitectura Web Base (Del PDF)
        Experience(
            project_name="Arquitectura Web Segura & Identity Management",
            achievements=[
                "Automatización del despliegue de componentes de infraestructura complejos mediante módulos de Terraform.",
                "Eliminación de credenciales hardcodeadas mediante la implementación estricta de Managed Identities.",
                "Adopción de metodología GitOps para auditoría y control de versiones de la infraestructura."
            ],
            stack=["azure", "terraform", "iam", "gitops", "security", "identity"]
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
            # Tu Core actual
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

        # PERFIL 3: DATA ENGINEER & BI
        "data": [
            "data", "datos", "data engineer", "etl", "business intelligence", "bi",
            "power bi", "dax", "power bi embedded", "visualización",
            "sql", "sql server", "cosmos db", "nosql", "mongodb", "vector database",
            "azure functions", "serverless", 
            "python", "pandas", "numpy", "spark", "databricks", "azure data factory", 
            "synapse", "snowflake", "big data", "data warehouse"
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

    # Caso 1: Todo
    cv_gen = get_tailored_cv("generic")
    print(f"Generic: {len(cv_gen.experience)} experiencias")

    # Caso 2: DevOps
    cv_devops = get_tailored_cv("devops")
    print(f"DevOps: {len(cv_devops.experience)} experiencias")
    # Debería mostrarte los nombres de los proyectos que ha guardado
    for exp in cv_devops.experience:
        print(f"  - {exp.project_name}")

    # Caso 3: Data
    cv_data = get_tailored_cv("data")
    print(f"Data: {len(cv_data.experience)} experiencias")

    cv_sysadmin = get_tailored_cv("sysadmin")
    print(f"SysAdmin: {len(cv_sysadmin.experience)} experiencias")
    for exp in cv_sysadmin.experience:
        print(f" - {exp.project_name}")
    