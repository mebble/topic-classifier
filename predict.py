import keras.preprocessing.text
import numpy as np

model = keras.models.load_model('./model1')

text = np.array(['''The government official blamed the deterioration in air quality to a “very poor” level across much of the city on a fall in temperature and lighter wind, as both seasonal changes allow pollution to accumulate.
The official - speaking on condition of anonymity due to the sensitivity of the situation - said air quality would continue to worsen around Diwali, which falls on Nov. 7.
Pollution levels will be exacerbated as farmers in areas close to Delhi burn crop residue in preparation for new planting and people let off fireworks to mark the Hindu festival.
“We are heading into a deadly cocktail with Diwali and peak stubble burning time,” the official said.
“If we come back into the "poor" category of pollution, it will be a very big achievement.”
On Wednesday, air quality in Delhi hit the “very poor” level at more than half of its monitoring stations, according to the government’s Central Pollution Control Board - the worst set of readings since a dust storm hit the city in June.
Late last year, Delhi and a large part of northern India were covered in a toxic smog from burning crop waste and the countless firecrackers let off for Diwali, forcing authorities to shut power stations, ban construction and clamp down on garbage burning.
Despite pressure from health experts, the government this year held off on a wholesale ban on fireworks and has faced criticism for failing to prevent farmers in states neighbouring Delhi from burning stubble.'''])
print(text.shape)

tk = keras.preprocessing.text.Tokenizer(
        nb_words=2000,
        filters=keras.preprocessing.text.base_filter(),
        lower=True,
        split=" ")

tk.fit_on_texts(text)
prediction = model.predict(np.array(tk.texts_to_sequences(text)))
print(prediction)
