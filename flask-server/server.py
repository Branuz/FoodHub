import json
from flask import Flask, send_from_directory, request, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import secrets
from os import getenv

app = Flask(__name__, static_folder="../client/build", static_url_path="")

#Heroku uri replacement fix
uri = getenv("DATABASE_URL") # or other relevant config var
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)


#app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_DATABASE_URI"] = ("postgresql:///jpoussu")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False 
db = SQLAlchemy(app)

CORS(app)

#Create new account Route
@app.route("/create-account", methods=["POST"])
def create_account():
    username = request.json ["username"]
    email = request.json ["email"]
    password = request.json ["password"]
    token = secrets.token_hex()
    
    sql = "INSERT INTO users (username, email, password, token) VALUES (:username, :email, :password, :token);"

    db.session.execute(sql, {"username":username, "email":email, "password":password, "token" : token})
    db.session.commit()

    return redirect("/")

#Verify that the email/username and password are valid
@app.route("/get/user", methods=["POST"])
def verify_user():
    email = request.json ["email"]
    password = request.json ["password"]
    
    sql = "SELECT token From users WHERE email=(:email) AND password=(:password) OR username=(:email) AND password=(:password);"
    result = db.session.execute(sql, {"email":email, "password":password})
    token = result.fetchone()

    if token == None:
        return json.dumps({'success':False}), 403, {'ContentType':'application/json'} 

    return json.dumps({'success':True}), 200, {'ContentType':'application/json', "token":token[0]} 

#Verify that the user has editing rights
@app.route("/recipe/verify", methods=["POST"])
def verify_recipe_creator():
    title = request.json ["title"]
    user_token = request.json ["token"]
    
    sql = "SELECT user_token From recipes WHERE title=(:title);"
    result = db.session.execute(sql, {"title":title})
    token = result.fetchone()

    if user_token != token[0]:
        return json.dumps({'success':False}), 403, {'ContentType':'application/json'} 

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

#Create recipe Route
@app.route("/add", methods=["POST"])
def add_recipe():
    title = request.json ["title"]
    description = request.json ["description"]
    type = request.json ["type"]
    cooking_time = request.json ["cookingTime"]
    instructions = request.json ["instructions"]
    ingredients = request.json["ingredientList"]
    token = request.json["token"]
    date = datetime.now()

    sql = "INSERT INTO recipes (title, description, type, cooking_time, instructions, date, user_token) VALUES (:title, :description, :type, :cooking_time, :instructions, :date, :user_token);"
    data = {"title":title, "description":description, "type" : type, "cooking_time" : cooking_time, "instructions" : instructions, "date" : date, "user_token":token}
    db.session.execute(sql, data)
    db.session.commit()
    
    sql = "SELECT id FROM recipes WHERE title=:title;"
    id_query = db.session.execute(sql, {"title":title})
    recipe_id = id_query.fetchone()[0]


    for item in ingredients:
        ingredient_name = item["ingredient"]
        amount = item["amount"]
        measurement_type = item["measurement"]

        sql = "INSERT INTO ingredient (ingredient_name) VALUES (:ingredient_name) ON CONFLICT DO NOTHING;"
        db.session.execute(sql, {"ingredient_name":ingredient_name})

        sql = "SELECT id FROM ingredient WHERE ingredient_name=:ingredient_name;"
        id_query = db.session.execute(sql, {"ingredient_name":ingredient_name})
        ingredient_id = id_query.fetchone()[0]

        sql = "INSERT INTO ingredients (recipe_id , ingredient_id, amount, measurement_type) VALUES (:recipe_id, :ingredient_id, :amount, :measurement_type);"
        data = {"recipe_id":recipe_id, "ingredient_id":ingredient_id, "amount":amount, "measurement_type":measurement_type}
        db.session.execute(sql, data)

    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

#Get all recipes
@app.route("/get", methods=["GET"])
def get_recipe():
    data = []
    sql = "SELECT * FROM recipes;"
    results = db.session.execute(sql).fetchall()
    
    for row in results:
        data.append(list(row))

    return json.dumps(data, indent=4, sort_keys=True, default=str)


#Get recipe ingredients based on id
@app.route("/get/<id>/", methods=["GET"])
def recipe_details(id):
    data = []
    sql = "SELECT * FROM ingredients WHERE recipe_id = :id ;"
    results = db.session.execute(sql, {"id":id}).fetchall()
    
    for row in results:
        data.append(list(row))

    return json.dumps(data, indent=4, sort_keys=True, default=str)

#Get recipe based on id
@app.route("/update/<id>/", methods=["PUT"])
def update_recipe(id):
    title = request.json ["title"]
    description = request.json ["description"]
    type = request.json ["type"]
    cooking_time = request.json ["cookingTime"]
    instructions = request.json ["instructions"]
    date = datetime.now()

    sql = "UPDATE recipes SET title=:title, description=:description, type=:type, cooking_time=:cooking_time, instructions=:instructions, date=:date WHERE id=:id;"
    data = {"title":title, "description":description, "type" : type, "cooking_time" : cooking_time, "instructions" : instructions, "date" : date, "id" : id}
    db.session.execute(sql, data)

    db.session.commit()
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

#Deletes article based on id
@app.route("/delete/<id>/", methods=["DELETE"])
def recipe_delete(id):
    sql = "DELETE FROM ingredients WHERE recipe_id = :id;"
    db.session.execute(sql, {"id":id})

    sql = "DELETE FROM recipes WHERE id = :id;"
    db.session.execute(sql, {"id":id})
    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

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
