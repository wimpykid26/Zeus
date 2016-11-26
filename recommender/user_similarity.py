import math

matrix = []
similarity_matrix = []
user_mean_array = []
m = 0
n = 0
def initialize():

    global m
    global n
    global matrix
    global similarity_matrix
    global user_mean_array
    user1_mean = 0
    user2_mean = 0
    user1_rated = 0
    user2_rated = 0
    numerator = 0.0
    denominator1 = 0.0
    denominator2 = 0.0
    pearson_correlation = 0.0
    m = int(input('number of rows, m = '))
    n = int(input('number of columns, n = '))
    matrix = [[0 for j in range(n)] for i in range(m)]
    user_mean_array = [0 for i in range(m)]
    for i in range(0, m):
        for j in range(0, n):
            print ('entry in row: ', i + 1, ' column: ', j + 1)
            matrix[i][j] = int(input())

def compute(user1, user2):

    global m
    global n
    global matrix
    global similarity_matrix
    global user_mean_array
    user1_mean = 0
    user2_mean = 0
    user1_rated = 0
    user2_rated = 0
    numerator = 0.0
    denominator1 = 0.0
    denominator2 = 0.0
    pearson_correlation = 0.0
    for j in range(0, n):
        if matrix[user1 - 1][j] is not 0:
            user1_mean += matrix[user1 - 1][j]
            user1_rated += 1
        if matrix[user2 - 1][j] is not 0:
            user2_rated += 1
            user2_mean += matrix[user2 - 1][j]
    user1_mean = user1_mean / user1_rated
    user2_mean = user2_mean / user2_rated
    user_mean_array[user1 - 1] = user1_mean
    user_mean_array[user2 - 1] = user2_mean
    # print("user1")
    # print(user1)
    # print("user2")
    # print(user2)
    # print("m")
    # print(m)
    # print("n")
    # print(n)
    print("user1mean")
    print(user1_mean)
    print("user2mean")
    print(user2_mean)
    for j in range(0, n):
      if matrix[user1 - 1][j] is not 0 and matrix[user2 - 1][j] is not 0:
        numerator += (matrix[user1 - 1][j] - user1_mean) * (matrix[user2 - 1][j] - user2_mean)
        # print("value")
        # print(math.pow((matrix[user1 - 1][j] - user1_mean), 2))
        # print(math.pow((matrix[user2 - 1][j] - user2_mean), 2))
        # print(j)
        # print(matrix[user2 - 1][j] - user2_mean)
        # print(matrix)
        denominator1 += math.pow((matrix[user1 - 1][j] - user1_mean), 2)
        denominator2 += math.pow((matrix[user2 - 1][j] - user2_mean), 2)
    print("denominator2")
    print(denominator2)
    print("denominator1")
    print(denominator1)
    pearson_correlation = numerator / (math.sqrt(denominator1) * math.sqrt(denominator2))
    similarity_matrix = [[0 for j in range(n)] for i in range(m)]
    similarity_matrix[user1 - 1][user2 - 1] = pearson_correlation
    similarity_matrix[user2 - 1][user1 - 1] = pearson_correlation
    print(pearson_correlation)
def predict(article_no, user):

    predict_article_rating = 0.0
    predict_article_rating += user_mean_array[user - 1]
    filtering_numerator = 0
    filtering_denominator = 0
    for i in range(0, m):
      if matrix[i][article_no - 1] is not 0 and m is not user - 1:
        filtering_numerator += (similarity_matrix[i][user - 1]) * (matrix[i][article_no - 1] - user_mean_array[i])
        filtering_denominator += (similarity_matrix[i][user - 1])
    predict_article_rating = filtering_numerator / filtering_denominator
    print(predict_article_rating)

if __name__ == "__main__":
    initialize()
    compute(3, 1)
    # for i in range(0, m):
    #   for j in range(0, m):
    #     compute(i + 1, j + 1)
    predict(3, 4)