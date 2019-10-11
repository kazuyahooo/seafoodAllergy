import flask
from flask import render_template, request
from pymongo import MongoClient

client = MongoClient('mongodb+srv://Liao:871029@cluster0-sk2jk.mongodb.net')
db = client['EventResourse']
col = db['Event']

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["JSON_AS_ASCII"] = False

app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

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
    #activity_data是使用者輸入表單的資料    
    activity_data = request.values.to_dict()
    insert_data(activity_data)
    
    return render_template('postYourActivity.html',title='MyActivity', activity=activity_data)


app.run()