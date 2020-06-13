import random
"""
name: Zhuoxuan Li
project name: envelope_sim.py
"""



"""
this function expects two boolean parameter (whether you switch envelopes or not, and whether 
you want to see the printed explanation of the simulation) and returns True or False based 
on whether you selected the correct envelope
@:param switch whether you switch envelopes or not
@:param verbose whether you want to see the printed explanation of the simulation
"""
def pick_envelope(switch, verbose):
    envelope = [0, 0, 0, 0]  # begining of the envelope
    i = random.randint(0, 3)  # pick a random index
    envelope[i] = 1  # change that ball to red
    envelope1 = envelope[0: 2]  # divided the envelope to two

    env1 = ["b", "b"]  # set original env1 to be both black

    for i in range(len(envelope1)):  # check if the red one is in 1
        if envelope1[i] == 1:
            env1[i] = "r"

    envelope2 = envelope[2:]

    env2 = ["b", "b"]  # set original env2 to be both black

    for i in range(len(envelope2)):  # check if the red one is in 1
        if envelope2[i] == 1:
            env2[i] = "r"
    # pick two random integer to pick ball and env
    j = random.randint(0, 1)
    k = random.randint(0, 1)
    if j == 0:  # if env 1 was chose
        ball = env1[k]  # pick a ball
    else:  # if env 2 was chose
        ball = env2[k]

    if verbose:  # check if we need to print out the words
        print("Envelope 0:" + str(env1[0]) + str(env1[1]))
        print("Envelope 1:" + str(env2[0]) + str(env2[1]))
        print("I picked envelope " + str(j))
        print("and drew a " + str(ball))
        if ball != "r":
            if switch:  # check if we need to switch
                if j == 0:
                    x = 1
                else:
                    x = 0
                print("Switch to envelope " + str(x))
                j = x

    if j == 0:  # check whether the envelope is correct
        if envelope1.count(1) > 0:
            return True
        else:
            return False
    else:
        if envelope2.count(1) > 0:
            return True
        else:
            return False


"""
this function runs n simulations of envelope picking under both strategies (switch n times,
don't switch n times) and prints the percent of times the correct envelope was chosen for each
@:param n switch times
"""
def run_simulation(n):
    print("After " + str(n) + " simulations:")
    num_true = 0
    num_false = 0
    # loop through the n get the num with switch
    for i in range(n):
        num_true += helper_switch(True, n)
    # loop through the n get the num without switch
    for i in range(n):
        num_false += helper_nonswitch(False, n)

    percent_true = (num_true / n) * 100
    percent_false = (num_false / n) * 100
    print("  Switch successful: " + str(percent_true) + str("%"))
    print("  No-switch successful: " + str(percent_false) + str("%"))


"""
this function runs to get the number of choose correct with switch
@:param switch whether you switch envelopes or not
@:param n switch times
"""
def helper_switch(switch, n):
    counter = 0
    envelope = [0, 0, 0, 0]  # begining of the envelope
    i = random.randint(0, 3)  # pick a random index
    envelope[i] = 1  # change that ball to red
    envelope1 = envelope[0: 2]  # divided the envelope to two

    env1 = ["b", "b"]  # set original env1 to be both black

    for i in range(len(envelope1)):  # check if the red one is in 1
        if envelope1[i] == 1:
            env1[i] = "r"

    envelope2 = envelope[2:]

    env2 = ["b", "b"]  # set original env2 to be both black

    for i in range(len(envelope2)):  # check if the red one is in 1
        if envelope2[i] == 1:
            env2[i] = "r"
    # pick two random integer to pick ball and env
    j = random.randint(0, 1)
    k = random.randint(0, 1)
    if j == 0:  # if env 1 was chose
        ball = env1[k]  # pick a ball
    else:  # if env 2 was chose
        ball = env2[k]

    if ball != "r":
        if switch:
            if j == 0:
                x = 1
            else:
                x = 0
            j = x

    if j == 0:
        if envelope1.count(1) > 0:
            counter = counter + 1
    else:
        if envelope2.count(1) > 0:
            counter = counter + 1
    return counter

"""
this function runs to get the number of choose correct without switch
@:param switch whether you switch envelopes or not
@:param n switch times
"""
def helper_nonswitch(switch, n):
    counter = 0
    envelope = [0, 0, 0, 0]  # begining of the envelope
    i = random.randint(0, 3)  # pick a random index
    envelope[i] = 1  # change that ball to red
    envelope1 = envelope[0: 2]  # divided the envelope to two

    # pick one random env
    j = random.randint(0, 1)
    # check the number of success
    if envelope1.count(1) > 0:
        if j == 0:
            counter = counter +1
        else:
            if switch:
                counter = counter + 1

    envelope2 = envelope[2:]

    if envelope2.count(1) > 0:
        if j == 1:
            counter = counter +1
        else:
            if switch:
                counter = counter+1
    return counter


