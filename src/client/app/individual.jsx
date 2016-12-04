import ImageLoader from 'react-imageloader';

var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('react-slick');

var ContentCard = React.createClass({
  getInitialState() {
    return {content : "", heading: ""};
  },
  getHeading() {
    console.log("ASdasd"+document.cookie)
    this.setState({heading : unescape(document.cookie)})
  },
  loadArticleContent() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "samples/zeus/national/1.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                this.setState({content : rawFile.responseText});
                this.getHeading();
            }
        }
    }.bind(this)
    rawFile.send(null);
  },
  componentDidMount() {
    this.loadArticleContent();
  },
  render(){
    var contentCard=this.state.content;
    return(
      <div className="wow fadeInUp content-card">
      <div className="icon-and-title-flex">
      <img src="img/ic_launcher.png" className="appicon"></img>
      <div className="title-container">
      <span className="text-title">{this.state.heading}</span>
      <br></br><div className="intertext-padding"></div>
      <span className="text-subtitle">by Hindustan Times</span>
      <br></br><div className="intertext-padding"></div>
      <span className="text-subtitle">27/10/1997</span>
      </div>
      </div><br></br><br></br>
      <span className="text-description">{contentCard}</span>
      </div>
    )
  }
}
);
var SimpleSlider = React.createClass({
  loadSimilarArticleContent(similarArticleArray) {
    var a = new Array(10);
    for (var i = 0; i < 10;i++)
    {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", similarArticleArray[i], false);
      rawFile.onreadystatechange = function ()
      {
        if(rawFile.readyState === 4)
        {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
            a[i] = rawFile.responseText;
          }
        }
      }.bind(this)
      rawFile.send(null);
    }
    this.setState({recommendedArticleText : a})
  },
  loadSimilarContent() {
    $.ajax({
      url: this.props.url2,
      dataType: 'json',
      type: 'PUT',
      data: this.state.data,
      success: function(data) {
        this.setState({similarContent: data});
        this.loadSimilarArticleContent(this.state.similarContent)

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url2, status, err.toString());
      }.bind(this)
    });
  },
  // loadSummaryContent(articleTextArray) {
  //   console.log(articleTextArray[3])
  //   $.ajax({
  //     url: this.props.urlSummary,
  //     dataType: 'text',
  //     type: 'GET',
  //     data: {text : articleTextArray[0]},
  //     success: function(data) {
  //       this.setState({summaryContent : data});
  //       //console.log(data);
  //       //console.log(this.state.summaryContent)
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.url2, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  loadSimilarImageUrl(similarImageList) {
    $.ajax({
      url: this.props.url3,
      dataType: 'json',
      type: 'PUT',
      data: this.state.data,
      success: function(data) {
        this.setState({imageUrlArray: data});
    //    console.log(this.state.imageUrlArray)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url2, status, err.toString());
      }.bind(this)
    });
  },
  loadSimilarFromServer() {
    $.ajax({
      url: this.props.urlSimilarity,
      dataType: 'text',
      data: {article_id:2, category:'national'},
      success: function(incomingData) {
        this.setState({data:(incomingData)});
    //    console.log(incomingData)
        this.loadSimilarContent()
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState() {
    return {data:[], similarContent:[], recommendedArticleText:[], imageUrlArray:[], summaryContent:[]};
  },
  componentDidMount() {
    this.loadSimilarFromServer();
    this.loadSimilarImageUrl(this.state.similarContent)
    setInterval(this.loadSimilarFromServer, this.props.pollInterval);
  },
  componentDidUpdate() {
      //console.log(this.state.recommendedArticleText,this.state.image_urlArray)
      //this.loadSummaryContent(this.state.recommendedArticleText)
  },
  render: function () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      className: "wow fadeInUp content-works",
      slidesToShow: 5,
      slidesToScroll: 1
    };

    return (
      <Slider {...settings}>
      <div className="screenshot-item">
      <a href="img/screenshots/ss1.png" data-featherlight="image">
      <ImageLoader
      src={this.state.imageUrlArray}
      wrapper={React.DOM.div}
      style={{height: '2em'},{width: '20em'}}
      >
      Image load failed!
      </ImageLoader>
      <div className="screenshot-item-description">
      {this.state.recommendedArticleText[0]}
      </div>
      </a>
      </div>
      <div className="screenshot-item">
      <a href="img/screenshots/ss2.png" data-featherlight="image">
      <img src="img/screenshots/ss2.png"/>
      <div className="screenshot-item-description"></div>
      </a>
      </div>
      <div className="screenshot-item">
      <a href="img/screenshots/ss3.png" data-featherlight="image">
      <img src="img/screenshots/ss3.png"/>
      <div className="screenshot-item-description"></div>
      </a>
      </div>
      <div className="screenshot-item">
      <a href="img/screenshots/ss4.png" data-featherlight="image">
      <img src="img/screenshots/ss4.png"/>
      <div className="screenshot-item-description"></div>
      </a>
      </div>

      </Slider>

    );
  }
});
var RecommendCard = React.createClass({
  render(){
    return(
      <div className="wow fadeInUp content-card2">
      <div className="title-container">
      <span className="text-title2">{this.props.url}</span>
      <br></br><div className="intertext-padding"></div>
      </div>
      </div>
    )
  }
});

var IndividualCard = React.createClass({
  render(){
    return(
      <div className="wow fadeInUp content-works">
      <div className="screenshot-item">
      <a href="img/screenshots/ss1.png" data-featherlight="image">
      <img src="img/screenshots/ss1.png"/>
      <div className="screenshot-item-description"></div>
      </a>
      </div>
      <div className="screenshot-item">
      <a href="img/screenshots/ss2.png" data-featherlight="image">
      <img src="img/screenshots/ss2.png"/>
      <div className="screenshot-item-description"></div>
      </a>
      </div>
      <div className="screenshot-item">
      <a href="img/screenshots/ss3.png" data-featherlight="image">
      <img src="img/screenshots/ss3.png"/>
      <div className="screenshot-item-description"></div>
      </a>
      </div>
      <div className="screenshot-item">
      <a href="img/screenshots/ss4.png" data-featherlight="image">
      <img src="img/screenshots/ss4.png"/>
      <div className="screenshot-item-description"></div>
      </a>
      </div>
      </div>

    )
  }
});

var DetailCard = React.createClass({
  render(){
    return(
      <div className="wow fadeInUp content-card">
      <span className="text-subtitle">Details</span>
      <br></br><br></br>
      <div>

      <div className="detail-item">
      <iron-icon className="details-icon" icon="mail"></iron-icon>
      <span className="text-description">Entertainment</span>
      </div>
      <div className="detail-item">
      <iron-icon className="details-icon" icon="star"></iron-icon>
      <span className="text-description">Number of Upvotes : </span>
      </div>
      <div className="detail-item">
      <iron-icon className="details-icon" icon="info"></iron-icon>
      <span className="text-description">Version 1.0.295</span>
      </div>
      <div className="detail-item">
      <iron-icon className="details-icon" icon="mail"></iron-icon>
      <span className="text-description">Dwaipayan Saha</span>
      </div>
      <div className="detail-item">
      <iron-icon className="details-icon" icon="android"></iron-icon>
      <span className="text-description">Android 4.0.3+</span>
      </div>
      <div className="detail-item">
      <iron-icon className="details-icon" icon="assessment"></iron-icon>
      <span className="text-description">10,000+ downloads</span>
      </div>
      <div className="detail-item">
      <iron-icon className="details-icon" icon="extension"></iron-icon>
      <span className="text-description">Contains in-app purchases</span>
      </div>
      </div>
      </div>
    )
  }
})

var Main = React.createClass({
  render() {
    return (
      <div className="container">
      <div className="cover-image"></div>
      <div className="desktop-fab-container ">
      <a href="YOUR_APP_URL_HERE">
      <paper-fab className="wow fadeInUp desktop-fab" icon="shop"></paper-fab>
      </a>
      </div>
      <ContentCard/>
      <RecommendCard url="Other Recommendations"/>
      <SimpleSlider urlSummarizer="http://localhost:5000/get_summary" urlSimilarity="http://localhost:5000/get_similar" url2="retrieve" url3="image" pollInterval="2000"/>
      <RecommendCard url="People Also Liked"/>
      <SimpleSlider/>
      <DetailCard/>
      <div className="empty-space">
      <div className="meta-container wow fadeInUp">
      <div className="wow fadeInUp detail-item watermark credits">
      <span className="text-description credits-text">Article Recommendation<a href="http://faizmalkani.com"> powered by Gensim</a></span>
      </div>
      </div>
      </div>
      </div>
    )
  }

});

ReactDOM.render(
  <Main/>,
  document.getElementById('mainContainer')
);
