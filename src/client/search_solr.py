import solr


def search(keyword,value):
    s = solr.Solr("http://localhost:8983/solr/minor")
    response = s.select(keyword + ':' + value)
    print(response)
    for i in response.results:
          print i
#    return response

search("category", "entertainment")
