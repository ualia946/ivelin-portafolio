from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import Response
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
from schemas import UserCVData, CVGenerationRequest
from data_manager import get_tailored_cv


app = FastAPI()
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
    
    