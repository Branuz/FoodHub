import json
from flask import Flask, jsonify, send_from_directory, request, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import datetime
import secrets
from os import getenv
from flask_marshmallow import Marshmallow

app = Flask(__name__, static_folder="../client/build", static_url_path="")

#Heroku uri replacement fix
uri = getenv("DATABASE_URL") # or other relevant config var
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)


#app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_DATABASE_URI"] = ("postgresql:///jpoussu")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False 
db = SQLAlchemy(app)
ma = Marshmallow(app)

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

#Create new account Route
@app.route("/create-account", methods=["POST"])
def create_account():
    username = request.json ["username"]
    email = request.json ["email"]
    password = request.json ["password"]
    token = secrets.token_hex()
    
    sql = "INSERT INTO users (username, email, password, token) VALUES (:username, :email, :password, :token)"

    db.session.execute(sql, {"username":username, "email":email, "password":password, "token" : token})
    db.session.commit()

    return redirect("/")

#Verify that the email/username and password are valid
@app.route("/get/user", methods=["POST"])
def verify_user():
    email = request.json ["email"]
    password = request.json ["password"]
    
    sql = "SELECT token From users WHERE email=(:email) AND password=(:password) OR username=(:email) AND password=(:password)"
    result = db.session.execute(sql, {"email":email, "password":password})
    token = result.fetchone()

    if token == None:
        return json.dumps({'success':False}), 403, {'ContentType':'application/json'} 
        
    return json.dumps({'success':True}), 200, {'ContentType':'application/json', "token":token[0]} 

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

#Get recipe based on id
@app.route("/update/<id>/", methods=["PUT"])
def update_recipe(id):
    recipe = Recipes.query.get(id)

    title = request.json["title"]
    body = request.json["body"]

    recipe.title = title
    recipe.body = body

    db.session.commit()
    return recipe_schema.jsonify(recipe)

#Deletes article based on id
@app.route("/delete/<id>/", methods=["DELETE"])
def recipe_delete(id):
    recipe = Recipes.query.get(id)
    db.session.delete(recipe)
    db.session.commit()

    return recipe_schema.jsonify(recipe)

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/recipes/create/")
def recipe_form():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/login")
def login_page():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
