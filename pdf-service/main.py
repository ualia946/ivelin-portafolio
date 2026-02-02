from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 

from pydantic import BaseModel
from fastapi.responses import Response
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
from schemas import UserCVData, CVGenerationRequest
from data_manager import get_tailored_cv

ORIGINS = [
    "http://localhost:4321",
    "http://ivelinapostolov.com"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

env = Environment(loader=FileSystemLoader(searchpath='.'))
template = env.get_template('cv_template.html')


@app.get('/generate-pdf')
def generate_pdf(target_role):
    my_filtered_cv = get_tailored_cv(target_role)
    html_content = template.render(data=my_filtered_cv)

    pdf_bytes = HTML(string=html_content).write_pdf()

    return Response(content=pdf_bytes, 
        media_type='application/pdf',
    )
    
    