from django.shortcuts import redirect
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__, static_folder="../client/build", static_url_path="")
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///jpoussu"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False 
db = SQLAlchemy(app)
ma = Marshmallow(app)

db.create_all()
CORS(app)

class Recipes(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text)
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body

class RecipeSchema(ma.Schema):
    class Meta:
        fields = ("id" , "title", "body", "date")

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)

        
#Users API Route
@app.route("/users")
def users():
    return {"users": ["User1", "User2", "User3"]}

#Create recipe Route
@app.route("/add", methods=["POST"])
def add_recipe():
    title = request.json ["title"]
    body = request.json ["body"]

    recipes = Recipes(title, body)
    db.session.add(recipes)
    db.session.commit()

    return recipe_schema.jsonify(recipes)

#Get all recipes
@app.route("/get", methods=["GET"])
def get_recipe():
    all_recipes = Recipes.query.all()
    results = recipes_schema.dump(all_recipes)
    return jsonify(results)

#Get recipe based on id
@app.route("/get/<id>/", methods=["GET"])
def recipe_details(id):
    recipe = Recipes.query.get(id)
    return recipe_schema.jsonify(recipe)

#Index API Route
@app.route("/api", methods=["GET"])
@cross_origin()
def index():
    result = db.session.execute("SELECT * FROM users")
    messages = result.fetchall()
    return {
        "tutorial":"Flask react Heroku"
    }

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run(debug=True)
