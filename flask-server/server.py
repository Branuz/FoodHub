from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="../client/build")
CORS(app)

#Users API Route
@app.route("/users")
def users():
    return {"users": ["User1", "User2", "User3"]}

#Index API Route
@app.route("/api", methods=["GET"])
@cross_origin
def index():
    return {
        "Testing api index"
    }

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run(debug=True)