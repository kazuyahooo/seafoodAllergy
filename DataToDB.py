import flask
from flask import render_template, request, jsonify
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
@app.route('/index.html', methods=['GET'])
def home():
    temp_events=list()
    event={
       "http":"http://www.accupass.com/event/1904040739571150361040",
       "img":"static/images/pic01.jpg"
       }
    temp_events.append(event)
    event={
           "http":"http://www.accupass.com/event/1909140357534178828000",
           "img":"static/images/pic02.png"
           }
    temp_events.append(event)
    event={
           "http":"http://www.accupass.com/event/1901271544488531904750",
           "img":"static/images/pic03.png"
           }
    temp_events.append(event)
    return render_template("index.html",event = temp_events)

@app.route('/elements.html')
def element():
    return render_template("elements.html")

@app.route('/complete', methods=['GET'])
def complete():
    #activity_data是使用者輸入表單的資料    
    activity_data = request.values.to_dict()
    insert_data(activity_data)
    print(activity_data)
    return render_template('postYourActivity.html',title='MyActivity', activity=activity_data)

@app.route('/search', methods=['GET'])
def searchPage():
    return render_template('generic.html')

@app.route('/searchcomplete', methods=['GET'])
def searchEvent():
    searchResult=list()
    searchEventName = request.values['searchEventName']
    print('\n\n'+searchEventName+'\n')
    events= col.find({'eventName':searchEventName})
    for event in events:
        del event['_id']
        searchResult.append(event)
        print(event)
    return jsonify(searchResult)
#    print('\n\n'+events+'\n')
#    eventsRS = col.find_one({"eventName":searchEventName})
#    print(eventsRS)
    return '123'
app.run()