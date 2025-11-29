import voteApp from "../assets/img-projects/vote-app.png";
import dvwa from "../assets/img-projects/dvwa.png";
import iaArt from "../assets/img-projects/ia-art.png";
import gobernanzaNube from "../assets/img-projects/gobernanza-nube.png";
import perrosVsGatos from "../assets/img-projects/perrosvsgatos.png";

export const proyectos = [
  {
    titulo: "Votación de perros y gatos",
    descripcion: "Aplicación de votación en tiempo real orquestada con Kubernetes en Azure. Infraestructura completamente automatizada usando Terraform e IaC con pipelines CI/CD en GitHub Actions. Demuestra experiencia en containerización con Docker, orquestación de microservicios y despliegue automático en la nube.",
    imagen: voteApp.src,
    tecnologias: ["Azure", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    codigo: "https://github.com/ualia946/k8s-voting-app-orchestration",
    categoria: "Cloud",
  },
  {
    titulo: "Laboratorio web de pentesting",
    descripcion: "Laboratorio de seguridad web dockerizado en Azure. Implementación de infraestructura como código con Terraform para desplegar aplicaciones vulnerable (DVWA) en entornos controlados. Incluye Application Gateway para testing de seguridad y análisis de vulnerabilidades.",
    imagen: dvwa.src,
    tecnologias: ["Azure", "Docker", "Terraform", "MySQL", "Application Gateway"],
    codigo: "https://github.com/ualia946/iac-devsecops-azure-lab/tree/main",
    categoria: "Security",
  },
  {
    titulo: "Generador de arte IA",
    descripcion: "Modelo de Deep Learning basado en GAN (Generative Adversarial Network) que genera arte visual en el estilo de Van Gogh. Proyecto de machine learning que demuestra experiencia en redes neuronales convolucionales, procesamiento de imágenes y entrenamiento de modelos con TensorFlow y Keras.",
    imagen: iaArt.src,
    tecnologias: ["Python", "Jupyter Notebook", "TensorFlow", "Keras", "Pandas", "Matplotlib", "NumPy"],
    codigo: "https://github.com/ualia946/AI-Painter-Van-Gogh-GAN?tab=readme-ov-file",
    categoria: "AI",
  },
  {
    titulo: "Gobernanza de identidades en la nube",
    descripcion: "Modelo de gobernanza de identidades implementado en Microsoft Azure con Entra ID. Gestión centralizada de acceso, configuración de RBAC (Role-Based Access Control) y aplicación de políticas de seguridad para asegurar cumplimiento normativo y acceso granular a recursos en la nube.",
    imagen: gobernanzaNube.src,
    tecnologias: ["Azure", "EntraID", "Azure RBAC", "Azure Policies"],
    codigo: "https://github.com/ualia946/azure-identity-governance-model",
    categoria: "Security",
  },
  {
    titulo: "Clasificador CNN - Perros vs Gatos",
    descripcion: "Modelo de red neuronal convolucional (CNN) entrenado para clasificar imágenes de perros y gatos con alta precisión. Demuestra experiencia en visión por computadora, transfer learning, procesamiento de imágenes y validación de modelos de deep learning usando TensorFlow y Keras.",
    imagen: perrosVsGatos.src,
    tecnologias: ["Python", "TensorFlow", "Keras", "CNN", "OpenCV", "NumPy", "Matplotlib"],
    codigo: "https://github.com/ualia946/cnn-dog-vs-cat-classifier",
    categoria: "AI",
  },
];
