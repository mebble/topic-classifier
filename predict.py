import pickle
from sklearn.datasets import load_files
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

DATA_DIR = "./bbc/"
data = load_files(DATA_DIR, encoding="utf-8", decode_error="replace")
X_train, X_test, y_train, y_test = train_test_split(data.data, data.target)

with open('model.pickle', 'rb') as fd:
    model = pickle.load(fd)
with open('vectorizer.pickle', 'rb') as fd:
    vectorizer = pickle.load(fd)

f1 = open("input1.txt","r")
f2 = open("input2.txt","r")
inputs = [f1.read(),f2.read()]

# Testing
# y_pred1 = model.predict(vectorizer.transform(X_test))
# print("Model's Accuracy is " + str(100*accuracy_score(y_test,y_pred1)) + "%")

def predictions(docs):
    docs_trans = vectorizer.transform(docs)
    pred = model.predict(docs_trans)
    pred_proba = model.predict_proba(docs_trans)

    concept_diff = 0.0
    num_labels = len(data.target_names)
    for i in range(num_labels):
        diff = abs(pred_proba[0][i] - pred_proba[1][i])
        concept_diff = max(concept_diff, diff)
    
    probs1, probs2 = pred_proba.tolist()
    probs1 = [(data.target_names[i], prob) for i, prob in enumerate(probs1)]
    probs2 = [(data.target_names[i], prob) for i, prob in enumerate(probs2)]
    result = {
        'concept_diff': concept_diff,
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
