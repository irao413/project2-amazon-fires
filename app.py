#HTML and JavaScript: using the database data returned from Flask:
#yourJavaScriptFunction() {
#  var chartData = {{ chart_data|tojson }}; 

# Postgres SQL db = fire_project_db
# Postgres tables = brazil_fires, brazil_states_deforestation
# sqlite table = brazil_fires
# sqlite database = fire.db

# https://ucsd.bootcampcontent.com/UCSD-Coding-Bootcamp/ucsd-sd-data-pt-01-2020-u-c/blob/master/01-Lesson-Plans/10-Advanced-Data-Storage-and-Retrieval/3/Activities/10-Ins_Flask_with_ORM/Solved/app.py

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///fire.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Fire = Base.classes.brazil_fires

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/passengers"
    )


@app.route("/api/v1.0/names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Fire.state).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/v1.0/passengers")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Fire.year, Fire.month, Fire.state, Fire.latitude, Fire.longitude, Fire.firespots).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_fires = []
    for year, month, state, latitude, longitude, firespots in results:
        fire_dict = {}
        fire_dict["year"] = year
        fire_dict["month"] = month
        fire_dict["state"] = state
        fire_dict["latitude"] = latitude
        fire_dict["longitude"] = longitude
        fire_dict["firespots"] = firespots
        all_fires.append(fire_dict)

    return jsonify(all_fires)


if __name__ == '__main__':
    app.run(debug=True)
