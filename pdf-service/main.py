from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import Response
from weasyprint import HTML


class UserCV(BaseModel):
    name: str
    experience_years: int

app = FastAPI()

@app.get('/')
async def root():
    return {"message": "Generador PDF listo"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hola {name}, bienvenido a Python"}

@app.post('/generate')
async def experience(userCV: UserCV):
    return {'message': f'{userCV.name} tiene {userCV.experience_years} años de experiencia'}

@app.get('/generate-pdf')
async def generate_pdf():
    html_content = """
    <h1>Curriculum Vitae</h1>
    <p>Nombre: Ivelin</p>
    <p>Stack: Python & DevOps</p>
    """

    pdf_bytes = HTML(string=html_content).write_pdf()

    return Response(content=pdf_bytes, media_type='application/pdf')
    
    