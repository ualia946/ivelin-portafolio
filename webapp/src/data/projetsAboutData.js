import voteApp from "../assets/img-projects/vote-app.png";
import dvwa from "../assets/img-projects/dvwa.png";
import iaArt from "../assets/img-projects/ia-art.png";
import gobernanzaNube from "../assets/img-projects/gobernanza-nube.png";

export const proyectos = [
  {
    titulo: "Votación de perros y gatos",
    descripcion: "Una aplicación web que permite a los usuarios votar por su mascota favorita. Los usuarios pueden ver los resultados de las votaciones y participar en la votación.",
    imagen: voteApp.src,
    tecnologias: ["Azure", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    codigo: "https://github.com/ualia946/k8s-voting-app-orchestration",
  },
  {
    titulo: "Laboratorio web de pentesting",
    imagen: dvwa.src,
    tecnologias: ["Azure", "Docker", "Terraform", "MySQL", "Application Gateway"],
    codigo: "https://github.com/ualia946/iac-devsecops-azure-lab/tree/main",
  },
  {
    titulo: "Generador de arte IA",
    imagen: iaArt.src,
    tecnologias: ["Python", "Jupyter Notebook", "TensorFlow", "Keras", "Pandas", "Matplotlib", "NumPy"],
    codigo: "https://github.com/ualia946/AI-Painter-Van-Gogh-GAN?tab=readme-ov-file",
  },
  {
    titulo: "Gobernanza de identidades en la nube",
    imagen: gobernanzaNube.src,
    tecnologias: ["Azure", "EntraID", "Azure RBAC", "Azure Policies"],
    codigo: "https://github.com/ualia946/azure-identity-governance-model",
  },
];
