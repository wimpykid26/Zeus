from gensim import corpora
from gensim import models
from gensim import similarities
from collections import defaultdict
import pprint

import os

class MyCorpus(object):
	"""docstring for MyCorpus"""
	def main(self):
		list2 = ['']
		directory = '/home/dwaipayan/Zeus/recommender/samples'
		for filename in os.listdir(directory):
			if filename.endswith(".txt"):
				f = open(os.path.join(directory, filename),'r')
				str = ''
				for line in f.readlines():
					str += line
				list2.append(str)
			else:
				continue				
		
		stoplist = set('for a of the and to in'.split())
		texts = [[word for word in line.lower().split() if word not in stoplist ]for line in list2]
		frequency = defaultdict(int)
		for text in texts:
			for token in text:
				frequency[token]+=1
		texts = [[token for token in text if frequency[token]>1]for text in texts]
		print(texts)
		dictionary = corpora.Dictionary(texts)
		corpus = [dictionary.doc2bow(text) for text in texts]
		lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=2)
		new_doc = "Various forms of football can be identified in history, often as popular peasant games. Contemporary codes of football can be traced back to the codification of these games at English public schools during the nineteenth century.[3][4] The expanse of the British Empire allowed these rules of football to spread to areas of British influence outside of the directly controlled Empire.[5] By the end of the nineteenth century, distinct regional codes were already developing: Gaelic football, for example, deliberately incorporated the rules of local traditional football games in order to maintain their heritage.[6] In 1888, The Football League was founded in England, becoming the first of many professional football competitions. During the twentieth century, several of the various kinds of football grew to become some of the most popular team sports in the world."
		new_vec = dictionary.doc2bow(new_doc.lower().split())
		vec_lsi = lsi[new_vec]
		index = similarities.MatrixSimilarity(lsi[corpus])
		sims = index[vec_lsi]
		sims = sorted(enumerate(sims), key=lambda item: -item[1])
		print(sims)
		#print(new_vec)
		return dictionary

	def __init__(self):
		self.main()
			#yield list2

documents = ["Human machine interface for lab abc computer applications",
             "A survey of user opinion of computer system response time",
              "The EPS user interface management system",
              "System and human system engineering testing of EPS",
              "Relation of user perceived response time to error measurement",
              "The generation of random binary unordered trees",
              "The intersection graph of paths in trees",
              "Graph minor IV Widths of trees and well quasi ordering",
              "Graph minors A survey"]

#pprint(texts)
corpus_memory_friendly = MyCorpus()
#print(corpus_memory_friendly.token2id)
#for vector in corpus_memory_friendly:
	#print(vector)

