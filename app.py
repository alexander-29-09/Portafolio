from flask import Flask, request, jsonify
from flask_cors import CORS
import resend
import os

app = Flask(__name__)

# 🔥 CORS (IMPORTANTE)
CORS(app, resources={r"/*": {"origins": "*"}})

# 🔐 API KEY desde variables de entorno
resend.api_key = os.environ.get("RESEND_API_KEY")

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.json

        nombre = data.get('nombre')
        email = data.get('email')
        mensaje = data.get('mensaje')

        if not nombre or not email or not mensaje:
            return jsonify({"error": "Faltan datos"}), 400

        # 📩 Contenido del correo
        contenido = f"""
        <h2>Nuevo mensaje desde tu portafolio</h2>
        <p><b>Nombre:</b> {nombre}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Mensaje:</b><br>{mensaje}</p>
        """

        params = {
            "from": "onboarding@resend.dev",  # puedes cambiar luego
            "to": ["helpdesk.unab@gmail.com"],
            "subject": "Nuevo mensaje desde portafolio",
            "html": contenido
        }

        resend.Emails.send(params)

        return jsonify({"status": "ok", "message": "Correo enviado"})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


# 🔥 Ruta test (opcional)
@app.route('/')
def home():
    return "API funcionando 🚀"


if __name__ == '__main__':
    app.run(debug=True)