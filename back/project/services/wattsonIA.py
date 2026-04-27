from ibm_watsonx_ai.foundation_models import ModelInference
import requests


# def get_model():
#     return ModelInference(
#         model_id="meta/llama-3-3-70b-instruct",
#         credentials={
#             "apikey": "04Icbd8uoPKwA8kKJO88nMkoKlM6XVhSrKBxkxFcfpq2",
#             "url": "https://us-south.ml.cloud.ibm.com"
#         },
#         project_id="59ffbf5a-c4ab-45a4-8e6f-ff57ee18f40a"
#     )
    

API_KEY = "04Icbd8uoPKwA8kKJO88nMkoKlM6XVhSrKBxkxFcfpq2"
PROJECT_ID = "59ffbf5a-c4ab-45a4-8e6f-ff57ee18f40a"

def get_token():
    url = "https://iam.cloud.ibm.com/identity/token"

    data = {
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        "apikey": API_KEY
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = requests.post(url, data=data, headers=headers)
    return response.json()["access_token"]


def send_message(text):
    token = get_token()

    url = "https://eu-gb.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-05-29"

    body = {
        "messages": [
            {
                "role": "user",
                "content": text
            }
        ],
        "project_id": PROJECT_ID,
        "model_id": "meta-llama/llama-3-3-70b-instruct",
        "temperature": 0.7,
        "max_tokens": 500
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    response = requests.post(url, headers=headers, json=body)

    if response.status_code != 200:
        return response.text

    data = response.json()

    return data["choices"][0]["message"]["content"]

# def send_message(text):
#     prompt = f"""
#     Responda APENAS com uma frase clara.

#     Pergunta: {text}

#     Se souber a resposta, responda diretamente.
#     Se não souber, diga: "Não sei".

#     Resposta:
#     """
#     model = get_model()
#     response = model.generate(prompt=prompt)

#     try:
#         result = response["results"][0]["generated_text"].strip()

        
#         if not result or result in ["?", ".", ""]:
#             return "Não consegui gerar uma resposta agora."

#         return result

#     except Exception as e:
#         return "Erro ao gerar resposta."

