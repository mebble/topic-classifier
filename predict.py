import keras.preprocessing.text
import numpy as np

model = keras.models.load_model('./model')

def vectorize_sequences(sequences, dimension=10000):
	results = np.zeros((len(sequences), dimension))
	for i, sequence in enumerate(sequences):
		results[i, sequence] = 1.
	return results

text = np.array(['''The government official blamed the deterioration in air quality
to a “very poor” level across much of the city on a fall in temperature and
lighter wind, as both seasonal changes allow pollution to accumulate'''])
print(text.shape)

tk = keras.preprocessing.text.Tokenizer(
        num_words=10000,
        lower=True,
        split=" ")

tk.fit_on_texts(text)
text_sequence = np.array(tk.texts_to_sequences(text))
text_sequence = vectorize_sequences(text_sequence)
prediction = model.predict(text_sequence)
print(prediction)
