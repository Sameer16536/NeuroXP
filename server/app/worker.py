from celery import Celery
import os
import  time


REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")


celery_app  = Celery(
    "neuroxp_worker",
    broker=REDIS_URL,
    backend=REDIS_URL,
)

celery_app.conf.update(
    task_serializer='json',
    result_serializer='json',
    accept_content=['json'],
    timezone='UTC',
    enable_utc=True,
)


# TODO: Integrate real AI logic here later
@celery_app.task(name = "generate_ai_insight")
def generate_ai_insight(user_id: int, habits: list):
    """
    Simulate a heavy AI task (e.g., calling OpenAI).
    In a real SaaS, this would take 3-10 seconds.
    """
    print(f"🤖 AI Worker: Analyzing data for User {user_id}...")
    
    # SIMULATION: Replace this with actual LangChain/OpenAI code later
    time.sleep(5) 
    
    insight = f"Based on your {len(habits)} habits, you are 20% more productive in the mornings."
    
    print(f"✅ AI Worker: Finished User {user_id}")
    return {"user_id": user_id, "insight": insight}