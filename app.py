from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)  # Permite conexión desde tu frontend

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.json

        nombre = data.get('nombre')
        email = data.get('email')
        mensaje = data.get('mensaje')

        # Validación básica
        if not nombre or not email or not mensaje:
            return jsonify({"error": "Faltan datos"}), 400

        # Contenido del correo
        contenido = f"""
Nuevo contacto desde tu portafolio:

Nombre: {nombre}
Correo: {email}
Mensaje:
{mensaje}
"""

        msg = MIMEText(contenido)
        msg['Subject'] = 'Nuevo mensaje desde portafolio'
        msg['From'] = "helpdesk.unab@gmail.com"
        msg['To'] = "helpdesk.unab@gmail.com"

        # Enviar correo
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login("helpdesk.unab@gmail.com", "uxcrmjeveduutwqp")
        server.send_message(msg)
        server.quit()

        return jsonify({"status": "ok", "message": "Correo enviado correctamente"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Ruta de prueba (opcional)
@app.route('/')
def home():
    return "Backend funcionando 🚀"


if __name__ == '__main__':
    app.run(debug=True)