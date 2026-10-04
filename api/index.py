import os
import json
import base64
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from google import genai
from google.genai import types
from datetime import datetime, timezone

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client()

# Global Anonymous Community Metric
community_metrics = {
    "cases_analyzed": 0,
    "complaints_drafted": 0
}

# --- Unified Incident Architecture ---
class IncidentCase(BaseModel):
    id: str = "case_1"
    title: str = "New Case"
    user_problem: str = ""
    language: str = "English"
    incident_type: Optional[str] = None
    suspicious_content: Optional[str] = None
    screenshot_base64: Optional[str] = None
    urls_contacts: List[str] = []
    user_provided_facts: Optional[str] = None
    extracted_evidence: Optional[Dict[str, Any]] = None
    ai_analysis: Optional[Dict[str, Any]] = None
    complaint_status: str = "INITIALIZED"

# Privacy Guardrail
PRIVACY_GUARDRAIL = """
CRITICAL PRIVACY RULE: NEVER output, echo, verify, or format Aadhaar, RRN, or MyNumber digits under ANY circumstances. If encountered, output '[ID REDACTED]'.
"""

# --- 1. Track A: Scam & Message Analyzer (DETECT) ---
@app.post("/api/check_message")
async def check_message(req: IncidentCase):
    global community_metrics
    community_metrics["cases_analyzed"] += 1
    
    system_instruction = f"""
    You are 'Saral Sahayak', an independent investor protection assistant. Analyze the provided message, image, URL, or phone number for financial fraud.
    
    ANALYSIS RULES:
    1. Analyze BOTH text and visual context (logos, urgency).
    2. If a URL or Phone Number is provided, analyze its syntactic structure (e.g., look-alike domains, URL shorteners, unusual country codes). 
    3. DO NOT hallucinate registry data, WHOIS info, or official affiliation. If a link/number cannot be definitively verified, state that uncertainty clearly. A valid URL format does not mean it is safe.
    4. Keep explanations simple. No investment advice.
    {PRIVACY_GUARDRAIL}
    
    Return ONLY JSON format. ALL TEXT MUST BE IN {req.language}:
    {{
        "risk_level": "HIGH" | "MEDIUM" | "LOW" | "UNABLE TO DETERMINE" | "LEGITIMATE",
        "extracted_content": {{
            "sender_or_org": "extracted name or 'Not visible'",
            "amount_or_return": "extracted amount/return or 'Not visible'"
        }},
        "what_we_found": [
            {{
                "indicator": "e.g., Guaranteed Return, Fake Authority, Look-alike Domain, Suspicious Link",
                "evidence": "exact text, URL, or visual cue",
                "why_it_matters": "Simple explanation of why this matters in {req.language}."
            }}
        ],
        "what_to_verify": ["Specific step to check official sources in {req.language}"],
        "safe_next_step": "Actionable safe advice in {req.language}.",
        "failure_reason": "If UNABLE TO DETERMINE, explain why in {req.language}. Otherwise empty string."
    }}
    """
    
    contents = [f"Language requested: {req.language}"]
    if req.suspicious_content: contents.append(f"Content Text: {req.suspicious_content}")
    if req.urls_contacts: contents.append(f"URLs/Contacts: {', '.join(req.urls_contacts)}")
        
    if req.screenshot_base64:
        try:
            header, encoded = req.screenshot_base64.split(",", 1) if "," in req.screenshot_base64 else ("data:image/jpeg;base64", req.screenshot_base64)
            mime_type = header.split(":")[1].split(";")[0] if ":" in header else "image/jpeg"
            image_bytes = base64.b64decode(encoded)
            contents.append(types.Part.from_bytes(data=image_bytes, mime_type=mime_type))
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid image format.")

    return await generate_gemini_json(system_instruction, contents)

# --- 2. Track B: Claim Checker (UNDERSTAND) ---
@app.post("/api/check_claim")
async def check_claim(req: IncidentCase):
    global community_metrics
    community_metrics["cases_analyzed"] += 1
    system_instruction = f"Analyze the financial claim/ad. Do NOT blindly say TRUE/FALSE. No investment advice. {PRIVACY_GUARDRAIL} Return ONLY JSON with ALL values translated to {req.language}: {{\"claim_summary\": \"...\", \"claim_type\": \"...\", \"what_we_found\": [\"...\"], \"evidence_needed\": \"...\", \"explanation\": \"...\", \"user_action\": \"...\"}}"
    return await generate_gemini_json(system_instruction, [f"Language: {req.language}\nContent: {req.suspicious_content}"])

# --- 3. Emergency / Evidence Builder (PRESERVE) ---
@app.post("/api/build_evidence")
async def build_evidence(req: IncidentCase):
    system_instruction = f"""
    Extract facts from the user's narrative. Identify missing info to build a complete grievance.
    Do NOT ask for passwords, OTPs, or sensitive IDs. Ask ONLY relevant questions for this case type.
    {PRIVACY_GUARDRAIL}
    
    Return ONLY JSON format. ALL QUESTIONS AND EXPLANATIONS MUST BE IN {req.language}:
    {{
        "extracted_evidence": {{
            "scammer_name_or_platform": "Extracted or ''",
            "amount_lost": "Extracted or ''",
            "transaction_id": "Extracted or ''",
            "date": "Extracted or ''",
            "contact_method": "Extracted or ''"
        }},
        "missing_information": [
            {{
                "field": "e.g., transaction_id",
                "question": "Ask the user for this specific missing detail in {req.language}.",
                "why_we_need_this": "Explain why this helps the official complaint in {req.language}."
            }}
        ],
        "incident_category": "SEBI Intermediary Grievance" | "Cyber Fraud" | "Fake App Scam" | "Other"
    }}
    """
    return await generate_gemini_json(system_instruction, [f"Language: {req.language}\nUser Facts: {req.user_provided_facts}"])

# --- 4. Complaint Generator (REPORT) ---
@app.post("/api/analyze")
async def analyze_complaint(req: IncidentCase):
    global community_metrics
    community_metrics["complaints_drafted"] += 1
    
    system_instruction = f"""
    Generate a formal complaint in {req.language}. 
    Use ONLY the confirmed evidence provided. DO NOT invent dates, amounts, or names.
    {PRIVACY_GUARDRAIL}
    
    CRITICAL ROUTING RULES:
    - Only route to "SCORES" if against a SEBI-registered intermediary. Official process: Contact intermediary FIRST, then SCORES.
    - Route to "CYBERCRIME" (cybercrime.gov.in) for WhatsApp scams, fake trading apps, or unauthorized bank transfers.
    
    Return ONLY JSON format. ALL TEXT MUST BE IN {req.language}: 
    {{
        "category": "SEBI SCORES category or Cybercrime category", 
        "entity_name": "Target entity", 
        "formal_complaint_text": "Chronological complaint (Complainant Details, Summary, Dates, What Happened, Loss, Relief Requested).", 
        "reporting_route": "SCORES" | "CYBERCRIME" | "BANK",
        "vernacular_instructions": "Step-by-step instructions (e.g. 1. Preserve Evidence, 2. Approach Intermediary, 3. Escalate to SCORES/Cybercrime) in {req.language}."
    }}
    """
    context_text = f"Language: {req.language}\nConfirmed User Problem: {req.user_problem}\nConfirmed Extracted Evidence: {json.dumps(req.extracted_evidence)}"
    return await generate_gemini_json(system_instruction, [context_text])

# --- Metrics Fetcher (Real-time & Community) ---
@app.get("/api/metrics")
async def get_metrics():
    return {
        "official": {
            "status": "unavailable",
            "message": "Official SEBI/SCORES data currently unavailable",
            "source": "Official SEBI/SCORES Data",
            "last_updated": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
        },
        "community": {
            "cases_analyzed": community_metrics["cases_analyzed"],
            "complaints_drafted": community_metrics["complaints_drafted"]
        }
    }

# --- Chatbot Endpoint ---
class ChatMessage(BaseModel):
    message: str
    language: str = "English"

@app.post("/api/chat")
async def chat_with_bot(req: ChatMessage):
    system_instruction = f"You are 'Saral Sahayak', an independent AI assistant. Reply in {req.language}. Keep answers under 3 sentences. {PRIVACY_GUARDRAIL}"
    try:
        response = client.models.generate_content(model="gemini-3.8-flash", contents=req.message, config=types.GenerateContentConfig(system_instruction=system_instruction))
        return {"reply": response.text}
    except Exception:
        try:
            response = client.models.generate_content(model="gemini-3.5-flash-lite", contents=req.message, config=types.GenerateContentConfig(system_instruction=system_instruction))
            return {"reply": response.text}
        except Exception as e:
            raise HTTPException(status_code=503, detail=str(e))

# Helper Function
async def generate_gemini_json(sys_inst: str, contents: list):
    models_to_try = ["gemini-3.8-flash", "gemini-3.5-flash-lite"]
    last_err = None
    for m in models_to_try:
        try:
            res = client.models.generate_content(model=m, contents=contents, config=types.GenerateContentConfig(system_instruction=sys_inst, response_mime_type="application/json"))
            return json.loads(res.text)
        except Exception as e:
            last_err = str(e)
    raise HTTPException(status_code=503, detail=f"AI busy. ({last_err})")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)