from pydantic import BaseModel
from typing import List, Optional

class CVGenerationRequest(BaseModel):
    target_role: str

class Highlight(BaseModel):
    title: str
    text: str

class WorkExperience(BaseModel):
    company: str
    position: str
    period: str
    description: str
    achievements: List[Highlight]
    technologies: Optional[List[str]] = None
    location: Optional[str] = None

class Experience(BaseModel):
    project_name: str
    achievements: List[Highlight]
    stack: List[str]
    description: Optional[str] = None
    url: Optional[str] = None
    note: Optional[str] = None
    highlighted_tech: Optional[List[str]] = None

class Education(BaseModel):
    institution: str
    degree: str
    year: str
    note: Optional[str] = None

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
    languages: List[str]
    skills: List[SkillCategory]


