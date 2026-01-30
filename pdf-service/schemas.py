from pydantic import BaseModel
from typing import List, Optional

class CVGenerationRequest(BaseModel):
    target_role: str

class Experience(BaseModel):
    project_name: str
    achievements: List[str]
    stack: List[str]

class Education(BaseModel):
    institution: str
    degree: str
    year: str
    
class SkillSubcategory(BaseModel):
    subcategory_name: str
    keywords: List[str]

class SkillCategory(BaseModel):
    category_name: str
    skills: List[SkillSubcategory]

    
class UserCVData(BaseModel):
    fullname: str
    role: str
    location: str
    phone: str
    email: str
    linkedin_url: str
    github_url: str
    summary: str
    experience: List[Experience]
    education: List[Education]
    skills: List[SkillCategory]


