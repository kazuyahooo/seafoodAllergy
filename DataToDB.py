import flask
from flask import render_template, request
from pymongo import MongoClient

client = MongoClient('mongodb+srv://Liao:871029@cluster0-sk2jk.mongodb.net')
db = client['EventResourse']
col = db['Event']

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["JSON_AS_ASCII"] = False

def insert_data(event):
    if col.find_one({"eventName":event["eventName"]}) is None:
        col.insert_one(event)
        print('insert success')
    else:
        print(col.find_one({"eventName":event["eventName"]}))

@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/elements.html')
def element():
    return render_template("elements.html")
@app.route('/complete', methods=['GET'])
def complete():
    activity_data = request.values.to_dict()
    insert_data(activity_data)
    return 'Hello'+request.values['eventName'] 


app.run()