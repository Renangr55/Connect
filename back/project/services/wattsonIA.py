from ibm_watsonx_ai.foundation_models import ModelInference

def get_model():
    return ModelInference(
        model_id="ibm/granite-8b-code-instruct",
        credentials={
            "apikey": "pl-GAQdbzYIG7Fuf1agZHNHgUz0DWhFUMtdwF_KH_aXy",
            "url": "https://us-south.ml.cloud.ibm.com"
        },
        project_id="b6b7400c-2822-45c3-991a-15a5f77eef71"
    )
    


def send_message(text):
    prompt = f"""
    Responda APENAS com uma frase clara.

    Pergunta: {text}

    Se souber a resposta, responda diretamente.
    Se não souber, diga: "Não sei".

    Resposta:
    """
    model = get_model()
    response = model.generate(prompt=prompt)

    try:
        result = response["results"][0]["generated_text"].strip()

        # 🔥 tratamento inteligente
        if not result or result in ["?", ".", ""]:
            return "Não consegui gerar uma resposta agora."

        return result

    except Exception as e:
        return "Erro ao gerar resposta."

