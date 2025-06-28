import requests
import os
from flask import current_app

def send_email_via_api(to_email, subject, html_content):
    """Send email using SendGrid's Web API instead of SMTP"""
    
    api_key = os.environ.get("SENDGRID_API_KEY")
    from_email = os.environ.get("EMAIL_USER")
    
    if not api_key or not from_email:
        raise Exception("SendGrid API key or sender email not configured")
    
    url = "https://api.sendgrid.com/v3/mail/send"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "personalizations": [
            {
                "to": [{"email": to_email}],
                "subject": subject
            }
        ],
        "from": {"email": from_email, "name": "Venuo Events"},
        "content": [
            {
                "type": "text/html",
                "value": html_content
            }
        ]
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 202:
        print(f"Email sent successfully to {to_email}")
        return True
    else:
        print(f"Failed to send email: {response.status_code} - {response.text}")
        raise Exception(f"Email sending failed: {response.text}")
