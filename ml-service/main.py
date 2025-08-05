from fastapi import FastAPI
from mcq_service import router as mcq_router
from code_assesment_service import router as code_router

app = FastAPI(
    title="HashProof MCQ Assessment System", 
    description="AI-powered MCQ assessment system using DeepSeek",
    version="1.0.0"
)
app.include_router(mcq_router)
app.include_router(code_router)
