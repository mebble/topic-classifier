import pickle
from sklearn.datasets import load_files
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

DATA_DIR = "./bbc/"

data = load_files(DATA_DIR, encoding="utf-8", decode_error="replace")
x_train, x_test, y_train, y_test = train_test_split(data.data, data.target)

print('Computing...')

# Create the vectorizer, fit to training data
vectorizer = TfidfVectorizer(stop_words="english", max_features=1000, decode_error="ignore")
vectorizer.fit(x_train)
x_train_vec = vectorizer.transform(x_train)
x_test_vec = vectorizer.transform(x_test)

# Create and train the model
model = MultinomialNB()
model.fit(x_train_vec, y_train)

# Testing
y_pred = model.predict(x_test_vec)
print("Model's Accuracy is {}".format(100 * accuracy_score(y_test, y_pred)))

print('Pickling model and vectorizer...')
with open('model.pickle', 'wb') as fd:
    pickle.dump(model, fd)
with open('vectorizer.pickle', 'wb') as fd:
    pickle.dump(vectorizer, fd)

print('Done')
