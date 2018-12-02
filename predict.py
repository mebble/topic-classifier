import pickle
from math import sqrt
from sklearn.datasets import load_files
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

DATA_DIR = "./bbc/"
data = load_files(DATA_DIR, encoding="utf-8", decode_error="replace")
X_train, X_test, y_train, y_test = train_test_split(data.data, data.target)

print('Loading the pickles...')
with open('model.pickle', 'rb') as fd:
    model = pickle.load(fd)
with open('vectorizer.pickle', 'rb') as fd:
    vectorizer = pickle.load(fd)
print('Done')

def predictions(docs):
    docs_trans = vectorizer.transform(docs)
    pred = model.predict(docs_trans)
    pred_proba = model.predict_proba(docs_trans)

    probs1, probs2 = pred_proba.tolist()

    diff = concept_diff(tuple(probs1), tuple(probs2))
    probs1 = [(data.target_names[i], prob) for i, prob in enumerate(probs1)]
    probs2 = [(data.target_names[i], prob) for i, prob in enumerate(probs2)]

    result = {
        'concept_diff': diff,
        'doc1': {
            'prob': probs1,
            'label': data.target_names[pred[0]]
        },
        'doc2': {
            'prob': probs2,
            'label': data.target_names[pred[1]]
        }
    }

    return result

def concept_diff(probs1, probs2):
    mag_max = sqrt(2)
    return mag(delta(probs1, probs2)) / mag_max

def mag(point):
    return sqrt(sum([x**2 for x in point]))

def delta(p1, p2):
    return tuple([x1 - x2 for (x1, x2) in zip(p1, p2)])
