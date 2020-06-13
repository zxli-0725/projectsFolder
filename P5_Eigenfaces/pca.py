import numpy as np
import scipy
import matplotlib.pyplot as plt
from scipy.io import loadmat
from scipy.linalg import eigh as largest_eigh
from scipy.sparse.linalg.eigen.arpack import eigsh as largest_eigsh
"""
name: Zhuoxuan Li
project name: pca.py
"""


"""
load the dataset from a provided .mat file, re-center it around the origin and 
return it as a NumPy array of floats
@:param filename 
"""
def load_and_center_dataset(filename):
    dataset = loadmat(filename)  # load the dataset
    x = dataset['fea']  # get the fea array
    x = x - np.mean(x, axis=0)  # recenter the dataset
    return x


"""
calculate and return the covariance matrix of the dataset as a NumPy 
matrix (d x d array)
@:param dataset
"""
def get_covariance(dataset):
    x = np.array(dataset)  # get the array of dataset
    x = np.dot(np.transpose(x), x)/(len(x)-1)  # get the covariance matrix of the dataset
    return x


"""
perform eigen decomposition on the covariance matrix S and return a diagonal matrix
(NumPy array) with the largest m eigenvalues on the diagonal, and a matrix (NumPy array)
with the corresponding eigenvectors as columns
@:param S
@:param m
"""
def get_eig(S, m):
    val, vec = largest_eigh(S, eigvals=(len(S)-m, len(S)-1))  # get the eigen value and vector
    sorted_vec = np.fliplr(vec)  # sort the vector
    val = np.flip(val)  # flip it to the right order
    matrix = np.diag(val)  # make the matrix
    return matrix, sorted_vec


"""
project each image into your m-dimensional space and return the new representation
as a d x 1 NumPy array
@:param image
@:param U
"""
def project_image(image, U):
    return np.dot(U, np.dot(np.transpose(image), U))


"""
use matplotlib to display a visual representation of the original 
image and the projected image side-by-side
@:param orig
@:param proj
"""
def display_image(orig, proj):
    # reshape the orig and proj
    re_orig = np.reshape(orig, [32, 32])
    re_proj = np.reshape(proj, [32, 32])
    trans_orig = np.transpose(re_orig)
    trans_proj = np.transpose(re_proj)
    # get into the subplot
    fig, (ax1, ax2) = plt.subplots(1, 2)
    # set the title of those two
    ax1.title.set_text('Original')
    ax2.title.set_text('Projection')
    # create the image and the colorbar
    im1 = ax1.imshow(trans_orig, aspect='equal')
    fig.colorbar(im1, fraction=0.045, ax=ax1)
    im2 = ax2.imshow(trans_proj, aspect='equal')
    fig.colorbar(im2, fraction=0.045, ax=ax2)
    # print out the image
    plt.show()





