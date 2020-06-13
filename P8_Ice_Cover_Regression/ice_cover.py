import csv
import statistics
from statistics import mean
import random
"""
name: Zhuoxuan Li
project name: ice_cover.py
"""


"""
takes no arguments and returns the data as described below in an n-by-2 array
"""
def get_dataset():
    result = []
    with open('history.csv', encoding='utf-8-sig', mode='r') as csvfile:
        reader = csv.reader(csvfile)
        for r in reader:  # get all the variables
            result.append(r)
        new_r = []

        for e in result:  # change everything to int
            new_element = [int(i) for i in e]
            new_r.append(new_element)

    return new_r


"""
takes the dataset as produced by the previous function and prints several statistics 
about the data; does not return anything
"""
def print_stats(dataset):
    print(len(dataset))
    y = []
    for d in dataset:
        y.append(d[1])
    # mean = statistics.mean(y)
    print(str("%.2f" % mean(y)))
    print(str("%.2f" % statistics.stdev(y)))


"""
calculates and returns the mean squared error on the dataset given fixed betas
"""
def regression(beta_0, beta_1, dataset = get_dataset()):
    vals = []
    # dataset = get_dataset()
    for d in dataset:  # get all numbers to a list to calculate
        v = (beta_0 + beta_1 * d[0] - d[1]) ** 2
        vals.append(v)
    return mean(vals)


"""
performs a single step of gradient descent on the MSE and returns the derivative values as a tuple
"""
def gradient_descent(beta_0, beta_1, dataset = get_dataset()):
    vals = []
    vals2 = []
    # dataset = get_dataset()
    for d in dataset:  # get all numbers to a list to calculate
        v = beta_0 + beta_1 * d[0] - d[1]
        v2 = (beta_0 + beta_1 * d[0] - d[1]) * d[0]
        vals.append(v)
        vals2.append(v2)
    return mean(vals) * 2, mean(vals2) * 2


"""
 performs T iterations of gradient descent starting at LaTeX: (\beta_0, \beta_1) = (0,0)
 with the given parameter and prints the results; does not return anything
"""
def iterate_gradient(T, eta):
    b0 = [0.0]
    b1 = [0.0]
    for i in range(T):  # calculate the answer by the given formula
        g1 = gradient_descent(b0[i], b1[i])[0]
        g2 = gradient_descent(b0[i], b1[i])[1]
        new_b0 = b0[i] - eta * g1
        new_b1 = b1[i] - eta * g2
        b0.append(new_b0)
        b1.append(new_b1)
        print(str(i + 1) + " " + str("%.2f" % new_b0) + " " + str("%.2f" % new_b1) + " " + str("%.2f" % regression(new_b0, new_b1)))


"""
using the closed-form solution, calculates and returns the values of beta_0 and beta_1
and the corresponding MSE as a three-element tuple
"""
def compute_betas():
    dataset = get_dataset()
    x = []
    y = []
    up = 0
    down = 0
    for d in dataset:  # get all numbers to list to calculate
        x.append(d[0])
        y.append(d[1])
    mean_x = mean(x)
    mean_y = mean(y)
    for d in dataset:  # calculate the answer by the given formula
        up = up + (d[0] - mean_x) * (d[1] - mean_y)
        down = down + (d[0] - mean_x) **2
    b1 = up / down
    b0 = mean_y - (b1 * mean_x)
    return b0, b1, regression(b0, b1)


"""
using the closed-form solution betas, return the predicted number of ice days for that year
"""
def predict(year):
    b0, b1, _ = compute_betas()  # calculate the answer by the given formula
    return b0 + b1 * year


"""
normalizes the data before performing gradient descent, prints results as in function 5
"""
def iterate_normalized(T, eta):
    dataset = get_dataset()
    x = []
    for d in dataset:  # get all numbers to a list to calculate
        x.append(d[0])
    mean_x = mean(x)
    standard_x = statistics.stdev(x)
    for i in range(len(dataset)):  # normalize x
        dataset[i][0] = (dataset[i][0] - mean_x)/standard_x
    b0 = 0
    b1 = 0
    for i in range(T):  # calculate the answer by the given formula
        g1 = gradient_descent(b0, b1, dataset)[0]
        g2 = gradient_descent(b0, b1, dataset)[1]
        b0 = b0 - (eta * g1)
        b1 = b1 - (eta * g2)
        print(str(i + 1) + " " + str("%.2f" % b0) + " " + str("%.2f" % b1) + " " + str("%.2f" % regression(b0, b1, dataset)))


"""
 performs stochastic gradient descent, prints results as in function 5
"""
def sgd(T, eta):
    dataset = get_dataset()
    x = []
    for d in dataset:  # get all numbers to a list to calculate
        x.append(d[0])
    mean_x = mean(x)
    standard_x = statistics.stdev(x)
    for i in range(len(dataset)):  # normalize x
        dataset[i][0] = (dataset[i][0] - mean_x) / standard_x

    b0 = 0
    b1 = 0

    for i in range(T):  # calculate the answer by the given formula
        random_index = random.randint(0, len(dataset) - 1)
        a = dataset[random_index]
        g1 = 2 * (b0 + (b1 * a[0]) - a[1])
        g2 = 2 * (b0 + (b1 * a[0]) - a[1]) * a[0]
        b0 = b0 - eta * g1
        b1 = b1 - eta * g2
        print(str(i + 1) + " " + str("%.2f" % b0) + " " + str("%.2f" % b1) + " " + str("%.2f" % regression(b0, b1, dataset)))


