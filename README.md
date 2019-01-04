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

## Demo GIFs

## Theory
### Classification
The classifier operates on a document `D` by taking in the text contents of that document, and producing a list of `n` probabilities <code>P<sub>i</sub></code> that correspond to predefined labels <code>L<sub>i</sub></code> that `D` can be classified into.
### Concept Difference
Given a document `D` and a list of `n` labels <code>L<sub>i</sub></code>, the probability distribution <code>P(D)</code> has to satisfy the probability constraints:

Hence, all possible probability distributions `P(D)`, when plotted as vectors along axes <code>L<sub>i</sub></code>, lie on a hyperplane in <code>R<sup>n</sup></code> that is clipped off to only the positive points. Plotting two particular `P(D1)` and `P(D2)` will reveal them as points on this plane. To find the concept difference, we take their Euclidean distance and divide it by `MAX_DIST`. `MAG_DIST` is the largest distance between two points on this plane, which is equal to `sqrt(2)`. The resulting fraction is the concept difference between `D1` and `D2`.

Every label is an axis that's orthogonal to every other label. So two documents, D1 and D2, that are labelled as being 100% of two labels, say Sports and Politics respectively, will have a concept difference of 100%.

### Example
Let's take the example of a classifier that classifies two documents, `D1` and `D2` as being in one of three categories: Sports, Politics and Technology. Suppose the classification results are the probability distributions:
```latex
Distribution P(D1):
P(D1 = Sports) = 0.2
P(D1 = Politics) = 0.6
P(D1 = Technology) = 0.2

Distribution P(D2):
P(D2 = Sports) = 0.1
P(D2 = Politics) = 0.1
P(D2 = Technology) = 0.8
```
This says that document `D1` is most likely a document on Politics, and `D2` is most likely on Technology. Plotting these two distributions as vectors, taking their Euclidean distance and dividing it by `sqrt(2)` will give us the concept difference between `D1` and `D2`.
