import flask
from flask import render_template, request, jsonify, redirect
from flask_security import Security, MongoEngineUserDatastore, UserMixin, RoleMixin, login_required, current_user, roles_accepted
from pymongo import MongoClient
from flask_mongoengine import MongoEngine


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["JSON_AS_ASCII"] = False
app.config["MONGODB_HOST"] = "mongodb+srv://Liao:871029@cluster0-sk2jk.mongodb.net/flaskTest"
app.config["MONGODB_DB"] = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['SECURITY_PASSWORD_SALT'] = 'bcrypt'
app.config['SECURITY_LOGIN_USER_TEMPLATE']='security/login.html'
app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

client = MongoClient('mongodb+srv://Liao:871029@cluster0-sk2jk.mongodb.net')
db = client['EventResourse']
col = db['Event']

db = MongoEngine(app)


# 不同種權限身份
class Role(db.Document, RoleMixin):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)

# 使用者資訊
class User(db.Document, UserMixin):
    username = db.StringField(max_length=255)
    password = db.StringField(max_length=255)
    active = db.BooleanField(default=True)
    confirmed_at = db.DateTimeField()
    roles = db.ListField(db.ReferenceField(Role), default=[])
    
user_datastore = MongoEngineUserDatastore(db, User, Role)
security = Security(app, user_datastore)

#沒有權限導引畫面
def unauthorized_callback():
	return '沒有權限'

# 設定未授權時轉跳畫面
security._state.unauthorized_handler(unauthorized_callback)

@app.before_first_request
def create_user():
    user_role = user_datastore.find_or_create_role('user')
    if user_datastore.get_user('user') == None:
        user_datastore.create_user(
            username='user', password='user', roles=[user_role]
        )
    admin_role = user_datastore.find_or_create_role('admin')
    if user_datastore.get_user('root') == None:
        user_datastore.create_user(
            username='root', password='root', roles=[admin_role]
        )
    guest_role = user_datastore.find_or_create_role('guest')
    if user_datastore.get_user('guest') == None:
        user_datastore.create_user(
            username='guest', password='guest', roles=[guest_role]
        )
        
def insert_data(event):
    if col.find_one({"eventName":event["eventName"]}) is None:
        col.insert_one(event)
        print('insert success')
    else:
        print(col.find_one({"eventName":event["eventName"]}))

@app.route('/')
@login_required
def login():
   return render_template("index.html")
    

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

@app.route('/searchcomplete', methods=['GET','POST'])
def searchEvent():
    data= request.get_json()
    print(data)
    events=list()
    event={
            'eventName' :'lovetony',
            'http':'http://www.google.tw',
            'eventB_M' : '2019:10:15',
            'eventLocation' : 'China Taipei',
    }
    events.append(event)
    return jsonify(events)
#    searchResult=list()
#    searchEventName = request.values['searchEventName']
#    print('\n\n'+searchEventName+'\n')
#    events= col.find({'eventName':searchEventName})
#    for event in events:
#        del event['_id']
#        searchResult.append(event)
#        print(event)
#    return jsonify(searchResult)
##    print('\n\n'+events+'\n')
##    eventsRS = col.find_one({"eventName":searchEventName})
##    print(eventsRS)
#    return '123'


app.run(host="140.121.199.231",port="27018")