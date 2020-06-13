import os
import math
"""
name: Zhuoxuan Li
project name: classify.py
"""


"""
create and return a vocabulary as a list of word types with counts >= cutoff in the training directory
@:param training_directory
@:param cutoff
"""
def create_vocabulary(training_directory, cutoff):
    # create a new list for result
    result = list()
    txt_path = []
    vocabulary = []
    v_list = []
    diction = {}
    # open the directory
    for subdir, dirs, files in os.walk(training_directory):
        for f in files:
            path = subdir + os.sep + f
            if path.endswith(".txt"):
                txt_path.append(path)
    # open each file
    for i in txt_path:
        with open(i, "r", encoding='utf-8') as f:
            vocabulary.append(f.read().splitlines())
    # loop through the vocabulary
    for v in vocabulary:
        for word in v:
            # append each word in a list
            v_list.append(word)
            # if the word is already in the diction
            if word in diction:
                diction[word] = diction[word] + 1
            else:  # if it is not in the diction
                diction[word] = 1
    # compare the word values and cutoff
    for word in diction.keys():
        if diction.get(word) >= cutoff:
            result.append(word)
    # get the sorted list
    sort = sorted(result)
    return sort


"""
create and return a bag of words Python dictionary from a single document
@:param vocab
@:param filepath
"""
def create_bow(vocab, filepath):
    word = []
    diction = {}
    counter = 0
    # open the file and read the context
    with open(filepath, 'r', encoding='utf-8') as f:
        word = f.read().splitlines()
    # loop through the word
    for w in word:
        # if vocab contains the key
        if w in vocab:
            # if diction contains the key
            if w in diction:
                diction[w] = diction[w] + 1
            else:
                diction[w] = 1
        else:  # if diction does not contains key
            counter = counter + 1
            diction[None] = counter  # the increment the None
    return diction


"""
create and return training set (bag of words Python dictionary + label) from the files in a training directory
@:param vocab
@:param directory
"""
def load_training_data(vocab, directory):
    # read all the sub directory of the directory
    subdir = os.listdir(directory)
    dictionary = {}
    load_data = []
    # loop through the list of subdir
    for year in subdir:
        # enter each subdir and create the directory
        for f in os.listdir(directory + year):
            dictionary['label'] = year
            dictionary['bow'] = create_bow(vocab, directory + year + os.sep + f)
            load_data.append(dict(dictionary))
    return load_data


"""
given a training set, estimate and return the prior probability p(label) of each label
@:param training_data
@:param label_list
"""
def prior(training_data, label_list):
    length = len(training_data)
    diction = {}
    index = 0
    counter = []
    # loop through the label list
    for i in label_list:
        c = 0
        # loop through the training data
        for d in training_data:
            if i == d['label']:
                c = c + 1
        # append the counter in a list
        counter.append(c)
        # calculate the prior probability
        diction[i] = math.log(counter[index]) - math.log(length)
        index = index + 1
    return diction


"""
 given a training set and a vocabulary, estimate and return the class conditional distribution LaTeX: P\left(word\mid label\right)
 P(word|label) over all words for the given label using smoothing
@:param vocab
@:param training_data
@:param label
"""
def p_word_given_label(vocab, training_data, label):
    # initialize and calculate the size
    size = len(vocab)
    diction = {}
    bow_list = []
    labels = []
    # loop through the training data and append into two lists
    for d in training_data:
        bow_list.append(d['bow'])
        if d['label'] == label:
            labels.append(d['bow'])

    bow_dict = {}
    # loop through bow_list
    for b in bow_list:
        for i in b:
            if i in bow_dict:
                bow_dict[i] = bow_dict[i] + b[i]
            else:
                bow_dict[i] = b[i]
    # loop through the labels
    for i in labels:
        for k in i:
            if k in diction:
                diction[k] = diction[k] + i[k]
            else:
                diction[k] = i[k]
    # check if there is a None inside, if not, update it
    if not None in diction:
        diction.update({None, 0})

    output = {}
    # loop through the bow-dict and diction to implement the output
    for w in bow_dict:
        for i in diction:
            if w in diction:
                output[i] = diction[i]
            else:
                output[w] = 0
    count = 0
    # implement the count
    for i in diction:
        count = count + diction[i]
    # calculate all the values
    for i in output:
        num = math.log(((output[i] + 1) / (size + count + 1)))
        output[i] = num
    return output


"""
loads the training data, estimates the prior distribution P(label) and class conditional distributions 
return the trained model
@:param training_directory
@:param cutoff
"""
def train(training_directory, cutoff):
    # initialize all the data
    train_dict = {}
    v = create_vocabulary(training_directory, cutoff)
    l = load_training_data(v,training_directory)
    p = prior(l, ['2020', '2016'])
    log_p1 = p_word_given_label(v, l, '2016')
    log_p2 = p_word_given_label(v, l, '2020')
    # put them into the dictionary
    train_dict['vocabulary'] = v
    train_dict['log prior'] = p
    train_dict['log p(w|y=2016)'] = log_p1
    train_dict['log p(w|y=2020)'] = log_p2
    return train_dict


"""
given a trained model, predict the label for the test document (see below for 
implementation details including return value)
@:param model
@:param filepath
"""
def classify(model, filepath):
    diction = {}
    vocab = model['vocabulary']
    words = create_bow(vocab, filepath)
    counter = 0
    total_2016 = 0
    total_2020 = 0
    # loop through the model to find the values of log p
    for k in model:
        if k == 'log p(w|y=2020)':
            # get the lop prior value of 2020
            log_2020 = model['log prior']['2020']
            total_2020 = log_2020
            for w in words:  # loop through the bow to get each log p
                p_each = model['log p(w|y=2020)'][w] * words[w]
                total_2020 = p_each + total_2020
            diction['log p(y=2020|x)'] = total_2020
    # loop through the model to find the values of log p
    for k in model:
        if k == 'log p(w|y=2016)':
            # get the lop prior value of 2016
            log_2016 = model['log prior']['2016']
            total_2016 = log_2016
            for w in words:  # loop through the bow to get each log p
                p_each = model['log p(w|y=2016)'][w] * words[w]
                total_2016 = p_each + total_2016
            diction['log p(y=2016|x)'] = total_2016
    # compare the total nums
    if total_2016 < total_2020:
        diction['predicted y'] = '2020'
    else:
        diction['predicted y'] = '2016'
    return diction







