import csv
import numpy as np
import math

from scipy.spatial import distance


def load_data(filepath):
    # create a new list for result
    result = []
    # open and read the file
    with open(filepath, 'r') as f:
        reader = csv.DictReader(f)
        for r in reader:
            result.append(r)
        for d in result:
            del d['Lat']
            del d['Long']
    return result


# def calculate_x_y(time_series):
#     n = time_series['4/1/20']
#     t = len(time_series)
#
#     if int(n) <= 0:
#         x = float("NaN")
#         y = float("NaN")
#         return x, y
#     values = []
#     keys = []
#     new_ts = {}
#
#     # with 10 times less cases
#     threshold10 = int(n) / 10
#     for key, val in time_series.items():
#         if key != 'Province/State' and key != 'Country/Region':
#             new_ts[key] = val
#
#     items = list(new_ts.items())
#
#     j = len(items) - 1
#
#     while j >= 0:
#         if int(items[j][1]) > threshold10:
#             j = j - 1
#         else:
#             temp_x = j
#             break
#
#     x = len(items) - temp_x - 1
#
#
#     # for k in keys:
#     #     values.append(time_series[k])
#     # cal_max = []
#     # for i in range(len(values)):
#     #     if int(values[i]) <= threshold10:
#     #         cal_max.append(float(values[i]))
#     # i = max(cal_max)
#     # if i is float("NaN"):
#     #     x = float("NaN")
#     # else:
#     #     x = t - i
#
#     # find the day with 100 times less cases
#     threshold100 = int(n) / 100
#
#     k = temp_x
#     while k >= 0:
#         if int(items[k][1]) > threshold100:
#             k = k - 1
#         else:
#             temp_y = k
#             break
#
#     y = temp_x - temp_y
#     # cal_max2 = []
#     # for i in range(len(values)):
#     #     if int(values[i]) <= threshold100:
#     #         cal_max2.append(float(values[i]))
#     # j = max(cal_max2)
#     # if j is float("NaN"):
#     #     y = float("NaN")
#     # else:
#     #     y = i - j
#     return x, y
def calculate_x_y(time_series):
    series = list(time_series.values())
    del series[:2]
    series = [int(i) for i in series]
    t = len(series) - 1
    n = series[t]

    if n <= 0:
        return math.nan, math.nan

    calc_max = []
    threshold10 = n / 10
    for i in range(len(series)):
        if series[i] <= threshold10:
            calc_max.append(i)

    if len(calc_max) == 0:
        x = math.nan
    else:
        i = max(calc_max)
        x = t - i

    calc_max = []
    # find the day with 100 times less cases
    threshold100 = n / 100
    for j in range(len(series)):
        if series[j] <= threshold100:
            calc_max.append(j)

    if len(calc_max) == 0:
        y = math.nan
    else:
        j = max(calc_max)
        y = i - j

    return x, y


def hac(dataset):
    clusters = []
    for i in range(len(dataset)):
        if not (math.isnan(dataset[i][0]) or math.isnan(dataset[i][1])):
            clusters.append(dataset[i])

    limit = len(clusters)
    matrix = []
    new_c = []
    n_clusters = limit
    while n_clusters > 1:
        cluster1, cluster2 = clusters_to_be_merged(clusters)

        clusters.append(merge(cluster1, cluster2))
        matrix.append([clusters.index(cluster1), clusters.index(cluster2), distBetClusters(cluster1, cluster2),
                       (len(cluster1) + len(cluster2))])
        # not_cluster.append(cluster1)
        # not_cluster.append(cluster2)
        n_clusters = n_clusters - 1

        return matrix

def merge(c1,c2):
    c = []
    for i in c1:
        c.append(i)
    for j in c2:
        c.append(j)
    return c


def distBetClusters(c1, c2):
    # dis_min = math.inf
    # print(c1)
    # print(c2)
    # # for x in c1:
    # #     for y in c2:
    # #         print(x)
    # #         print(y)
    # dist = math.sqrt(pow(c1[0] - c2[0], 2) + pow(c1[1] - c2[1], 2))
    #         #dist = distance.euclidean(i, j)
    # if dis_min > dist:
    #     dis_min = dist
    # return dis_min
    dis_min = math.inf
    for i in c1:
        for j in c2:
            dist = distance.euclidean(i, j)
            if dis_min > dist:
                dis_min = dist
    return dis_min



def clusters_to_be_merged(clusters):
    dis_min = math.inf
    for i in range(len(clusters)):
        for j in range(len(clusters)):
            if j != i:
                dist = distBetClusters(clusters[i], clusters[j])
                if dist == 0:
                    c1 = clusters[i]
                    c2 = clusters[j]
                    # return c1, c2
                elif dis_min > dist:
                    dis_min = dist
                    c1 = clusters[i]
                    c2 = clusters[j]
    return c1, c2
# def hac(dataset):
#     valid_data = [x for x in dataset if not (math.isnan(x[0]) or math.isnan(x[1]))]
#
#     limit = len(valid_data)
#     z = []
#     v = []
#
#     for i in range(limit):
#         v.append([i, valid_data[i]])
#     cluster = []
#     cluster_size = len(cluster)
#
#     while len(v) > 0:
#         if cluster_size == 0:
#             x, y, smalest_dist, length = get_points_points_distance(v)
#             z.append([x, y, smalest_dist, length])
#             cluster.append([valid_data[x], valid_data[y], smalest_dist, len(valid_data)])
#     return np.asmatrix(z)
#
#
# def get_points_points_distance(clusters):
#     min_dis = math.inf
#     for i in range(len(clusters) - 1):
#         for j in range(i+1, len(clusters)):
#             dist = calc_euclidean_distance(clusters[i][1], clusters[j][1])
#
#             if dist < min_dis:
#                 x = clusters[i][0]
#                 y = clusters[j][0]
#                 min_dis = dist
#     return x, y, min_dis, len(clusters[i]) + len(clusters[j])
#
#
# def calc_euclidean_distance(p1, p2):
#     d = math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)
#     return d



reader = load_data('time_series_covid19_confirmed_global.csv')
dataset = []
for each in reader:
    dataset.append(calculate_x_y(each))
print(dataset[6])
print(hac(dataset))
# print(calculate_x_y({'Province/State': '', 'Country/Region': 'Afghanistan', '1/22/20': '0', '1/23/20': '0', '1/24/20': '0', '1/25/20': '0', '1/26/20': '0', '1/27/20': '0', '1/28/20': '0', '1/29/20': '0', '1/30/20': '0', '1/31/20': '0', '2/1/20': '0', '2/2/20': '0', '2/3/20': '0', '2/4/20': '0', '2/5/20': '0', '2/6/20': '0', '2/7/20': '0', '2/8/20': '0', '2/9/20': '0', '2/10/20': '0', '2/11/20': '0', '2/12/20': '0', '2/13/20': '0', '2/14/20': '0', '2/15/20': '0', '2/16/20': '0', '2/17/20': '0', '2/18/20': '0', '2/19/20': '0', '2/20/20': '0', '2/21/20': '0', '2/22/20': '0', '2/23/20': '0', '2/24/20': '1', '2/25/20': '1', '2/26/20': '1', '2/27/20': '1', '2/28/20': '1', '2/29/20': '1', '3/1/20': '1', '3/2/20': '1', '3/3/20': '1', '3/4/20': '1', '3/5/20': '1', '3/6/20': '1', '3/7/20': '1', '3/8/20': '4', '3/9/20': '4', '3/10/20': '5', '3/11/20': '7', '3/12/20': '7', '3/13/20': '7', '3/14/20': '11', '3/15/20': '16', '3/16/20': '21', '3/17/20': '22', '3/18/20': '22', '3/19/20': '22', '3/20/20': '24', '3/21/20': '24', '3/22/20': '40', '3/23/20': '40', '3/24/20': '74', '3/25/20': '84', '3/26/20': '94', '3/27/20': '110', '3/28/20': '110', '3/29/20': '120', '3/30/20': '170', '3/31/20': '174', '4/1/20': '237'}))