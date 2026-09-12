from pydantic import BaseModel
from typing import List, Optional

class CVGenerationRequest(BaseModel):
    target_role: str

class Highlight(BaseModel):
    title: str
    text: str

class WorkExperience(BaseModel):
    company: str
    location: str
    position: str
    period: str
    description: str
    achievements: List[Highlight]

class Experience(BaseModel):
    project_name: str
    achievements: List[str]
    stack: List[str]
    note: Optional[str] = None
    highlighted_tech: Optional[List[str]] = None

class Education(BaseModel):
    institution: str
    degree: str
    year: str

class SkillCategory(BaseModel):
    category_name: str
    keywords: List[str]


class UserCVData(BaseModel):
    fullname: str
    role: str
    location: str
    phone: str
    email: str
    linkedin_url: str
    github_url: str
    web_url: str
    summary: str
    work_experience: List[WorkExperience]
    experience: List[Experience]
    education: List[Education]
    skills: List[SkillCategory]


