from keras.datasets import reuters

(x_train, y_train), (x_test, y_test) = reuters.load_data(num_words=1000,
                                                         test_split=0.2)

print(y_train)
# Decode review data
word_index = reuters.get_word_index()
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])
decoded_review = ' '.join([reverse_word_index.get(i - 3, '?') for i in y_train[0]])
print(decoded_review)
