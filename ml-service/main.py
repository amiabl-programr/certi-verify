# main.py
from fastapi import FastAPI
from code_assesment_service import router as code_router
from mcq_service import router as mcq_router

app = FastAPI()

app.include_router(code_router, prefix="/code-assessment")
app.include_router(mcq_router, prefix="/mcq")
