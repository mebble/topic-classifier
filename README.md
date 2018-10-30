# Concept Difference
This is a client-server implementation of a text classifier
that labels two given texts into one of 5 labels. Then, using some fancy math magic, we can calculate a number denoting the difference in "concept" between the two texts. "Concept" here simply refers to the stuff the text talks about (its topic, words used, etc).

## Develop With Us
Run the following commands to set up the project
- `$ git clone https://github.com/mebble/topic-classifier.git`
- `$ cd topic-classifier`
- `$ virtualenv -p python3 venv`
- `$ source ./venv/bin/activate`
- `(venv) $ pip install -r requirements.txt`

Flask (our web server) requires some environment variables to run
- `(venv) $ export FLASK_APP=server.py`
- `(venv) $ export FLASK_ENV=development` (not to be set in production)

Train the model
- `(venv) $ python train.py`

Run the server
- `(venv) $ flask run`

## Note
- If `virtualenv` is not installed, install it using your OS package manager such as `$ sudo apt install virtualenv` (Ubuntu)
