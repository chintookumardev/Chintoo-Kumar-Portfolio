from flask import Flask, request, jsonify, send_from_directory
from pathlib import Path
import re

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent


# ==========================================
# HOME PAGE
# ==========================================


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


# ==========================================
# STATIC FILES
# ==========================================


@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(BASE_DIR, filename)


# ==========================================
# CONTACT FORM
# ==========================================


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"success": False, "message": "Invalid request."}), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    # Required fields
    if not name or not email or not subject or not message:
        return jsonify({"success": False, "message": "Please fill in all fields."}), 400

    # Email validation
    email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"

    if not re.match(email_pattern, email):
        return (
            jsonify(
                {"success": False, "message": "Please enter a valid email address."}
            ),
            400,
        )

    # --------------------------------------
    # For now, print the message.
    # You can connect Gmail/SMTP/database later.
    # --------------------------------------

    print("\n===================================")
    print("NEW PORTFOLIO CONTACT")
    print("===================================")
    print(f"Name    : {name}")
    print(f"Email   : {email}")
    print(f"Subject : {subject}")
    print(f"Message : {message}")
    print("===================================\n")

    return jsonify(
        {"success": True, "message": "Your message has been received successfully."}
    )


# ==========================================
# HEALTH CHECK
# ==========================================


@app.route("/api/health")
def health():
    return jsonify(
        {"status": "online", "message": "Chintoo Kumar Portfolio API is running."}
    )


# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
