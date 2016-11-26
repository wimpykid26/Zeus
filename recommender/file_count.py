import os


def file_count(folder):
    count = next(os.walk("/home/mera_naam_dwaipayan/Dwaipayan/Zeus/recommender/samples/zeus/"+folder))[2]  # dir is your directory path as string
    return len(count)+1
