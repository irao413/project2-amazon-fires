# from Ian:
# As you work on project #2 here is some helper code to get you started on connecting your database to your Flask API and html page:
#Flask: querying your database and passing database data to your html page:
#@app.route('/')
#def get_chart_data():
    # get_data_from_db is a custom function you write to query your database
#    db_data = get_data_from_db()
                                
#    return render_template('index.html', chart_data=db_data)

#HTML and JavaScript: using the database data returned from Flask:
#yourJavaScriptFunction() {
#  var chartData = {{ chart_data|tojson }}; 

# Postgres SQL db = fire_project_db

# Online info about Python With PostgresSql, SQLAlchemy And Flask:
# https://www.c-sharpcorner.com/article/python-with-postgressql-sqlalchemy-and-flask2/

# activity about Flask, jsonify:
# https://ucsd.bootcampcontent.com/UCSD-Coding-Bootcamp/ucsd-sd-data-pt-01-2020-u-c/blob/master/01-Lesson-Plans/10-Advanced-Data-Storage-and-Retrieval/3/Activities/08-Ins_Variable_Rule/Solved/app.py
from flask import Flask, render_template, jsonify

from sqlalchemy import create_engine
engine = create_engine(f'postgresql://{PGUSER}:{PGPASSWORD}@localhost:5432/brazil_fires')
connection = engine.connect()


app = Flask(__name__)


@app.route('/')
def get_chart_data():
    # get_data_from_db is a custom function you write to query your database
    db_data = get_data_from_db()
                                
    return render_template('index.html', chart_data=db_data)

def get_data_from_db():
    

# @app.route("/")
# def index():
#    mars = mongo.db.mars.find_one()
#    return render_template("index.html", mars=mars)


#@app.route("/scrape")
#def scrape():
#    mars = mongo.db.mars
#    mars_data = scrape_mars.scrape_all()
#    mars.replace_one({}, mars_data, upsert=True)
#    return "Scraping Successful!"


if __name__ == "__main__":
    app.run()
