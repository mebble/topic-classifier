import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_files
from sklearn.metrics import classification_report, accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

DATA_DIR = "./bbc/"

data = load_files(DATA_DIR, encoding="utf-8", decode_error="replace")
# calculate count of each category
labels, counts = np.unique(data.target, return_counts=True)
# convert data.target_names to np array for fancy indexing
labels_str = np.array(data.target_names)
# print(labels_str)
# print(dict(zip(labels_str, counts)))

X_train, X_test, y_train, y_test = train_test_split(data.data, data.target)
# list(t[:80] for t in X_train[:10])

vectorizer = TfidfVectorizer(stop_words="english", max_features=1000, decode_error="ignore")
vectorizer.fit(X_train)



model = MultinomialNB()
# transform the list of text to tf-idf before passing it to the model
model.fit(vectorizer.transform(X_train), y_train)
 
f1 = open("input1.txt","r")
f2 = open("input2.txt","r")
inputs = [f1.read(),f2.read()]

# Testing
y_pred1 = model.predict(vectorizer.transform(X_test))
print("Model's Accuracy is " + str(100*accuracy_score(y_test,y_pred1)) + "%")

y_pred = model.predict_proba(vectorizer.transform(inputs))
yy = model.predict(vectorizer.transform(inputs))
print("The first document mainly talks about --> "+data.target_names[yy[0]])
print("The second document mainly talks about -->"+data.target_names[yy[1]])


concept_diff = 0.0

for i in range(len(y_pred[0])):
    concept_diff = max(concept_diff,(abs(y_pred[0][i]-y_pred[1][i])))
print("Concept difference in given documents (%) is: ")
print(str(100*(concept_diff))+" %")
