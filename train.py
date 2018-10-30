import pickle
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

x_train, x_test, y_train, y_test = train_test_split(data.data, data.target)
# list(t[:80] for t in x_train[:10])

print('Computing...')
# Create the vectorizer, fit to training data
vectorizer = TfidfVectorizer(stop_words="english", max_features=1000, decode_error="ignore")
vectorizer.fit(x_train)
model = MultinomialNB()
# transform the list of text to tf-idf before passing it to the model
model.fit(vectorizer.transform(x_train), y_train)

# Testing
y_pred = model.predict(vectorizer.transform(x_test))
print("Model's Accuracy is {}".format(100 * accuracy_score(y_test, y_pred)))

print('Pickling model and vectorizer...')
with open('model.pickle', 'wb') as fd:
    pickle.dump(model, fd)
with open('vectorizer.pickle', 'wb') as fd:
    pickle.dump(vectorizer, fd)
print('Done')
