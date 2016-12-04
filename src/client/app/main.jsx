import InfiniteScroll from 'react-infinite-scroller';
import ImageLoader from 'react-imageloader';
var Router  = require('react-router')

//var Individual = require('./individual.jsx');
var Link = Router.Link;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var React = require('react');
var ReactDOM = require('react-dom');
var converter = new Showdown.converter();
var ArticleBox = React.createClass({
  loadArticlesFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(incomingData) {
        this.setState({data: incomingData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadMore: function(article) {
    //console.log('load');
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(incomingData) {
          this.setState({data: this.state.data.concat(incomingData),
                         hasMore: (article < 15)});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  },
  handleContentSubmit:function(article) {
    $.ajax({
      url: this.props.url2,
      dataType: 'json',
      type: 'PUT',
      data: article,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState() {
    return {hasMore: true,data:[]};
  },

  componentDidMount() {
    this.loadArticlesFromServer();
    setInterval(this.loadArticlesFromServer, this.props.pollInterval);
  },

  render() {
    return (
       <InfiniteScroll
       loader={<div className="loader">Loading ...</div>}
       loadMore={this.loadMore}
       hasMore={this.state.hasMore}
       >
       <ArticleList category = {this.props.category}data={this.state.data} url={this.props.url} onContentChanged={this.handleContentSubmit}/>
       </InfiniteScroll>
    )
  }
});
class SearchForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: '', result: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //console.log(this.state.value)
    this.loadSearchResults(this.state.value)
    event.preventDefault();
  }
  loadSearchResults(query) {
    console.log(query)
    $.ajax({
      url: this.props.urlsolr,
      dataType: 'json',
      data: {queryString: query},
      success: function(incomingData) {
        console.log(incomingData)
        this.setState({result: incomingData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
var Article = React.createClass({
  getInitialState() {
    return {content : "", summary : ""};
  },
  handleUpvote(e) {
    e.preventDefault();
    var upvotes=this.props.upvotes + 1;
    var downvotes=this.props.downvotes;
    this.props.onContentSubmit({id:this.props.id, upvotes: upvotes, downvotes: downvotes});
    return;
  },
  handleDownvote(e) {
    e.preventDefault();
    var upvotes=this.props.upvotes;
    var downvotes=this.props.downvotes + 1;
    this.props.onContentSubmit({id:this.props.id, upvotes: upvotes, downvotes: downvotes});
    return;
  },
  handleClick(e) {
    document.cookie = this.props.title;
    window.location = "http://localhost:3000/individual.html"
  },
  getArticleSummary(articleText) {
    //console.log(articleText)
    $.ajax({
      url: this.props.urlSummary,
      dataType: 'text',
      data: {text : articleText},
      success: function(data) {
        this.setState({summary: data});
        //console.log(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadArticleContent() {
    var rawFile = new XMLHttpRequest();
    //console.log(this.props.text)
    rawFile.open("GET", this.props.text, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                this.setState({content : rawFile.responseText});
                //console.log(this.state.content)
                this.getArticleSummary(rawFile.responseText);
            }
        }
    }.bind(this)
    rawFile.send(null);
  },
  componentDidMount() {
    this.loadArticleContent();

  },
  render() {
    var articleContent = this.state.summary;
    var rawMarkup = converter.makeHtml(this.props.heading.toString());
    return (
      <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
      <header className="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white" ref="image_container">
      <img src={this.props.image_url} data-src="holder.js/140x140" alt='Thumbnail'/>
      </header>
      <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
      <div className="mdl-card__supporting-text" id="supporting-text">
      <h4 href={this.props.title}>{this.props.title}</h4>
      {articleContent}
      </div>
      <div className="mdl-card__actions" >
      <a onClick={this.handleClick} className="mdl-button">Read whole Article</a>
      <a href="#" className="mdl-button" onClick={this.handleUpvote} ref="upvote">Upvote:{this.props.upvotes}</a>
      <a href="#" className="mdl-button" onClick={this.handleDownvote}ref="downvote">Downvote:{this.props.downvotes}</a>
      </div>
      </div>
      <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="btn1">
      <i className="material-icons">more_vert</i>
      </button>
      <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right" htmlFor="btn1">
      <li className="mdl-menu__item">Lorem</li>
      <li className="mdl-menu__item" disabled>Ipsum</li>
      <li className="mdl-menu__item">Dolor</li>
      </ul>
      </section>
    )
  }
});

var ArticleList = React.createClass({
  callMaster(article) {
    this.props.onContentChanged(article)
  },
  render() {
    var articleNodes = this.props.data.map(function (article) {
      return (
        <Article category = {this.props.category} urlSummary="http://localhost:5000/get_summary" id={article.id} title={article.title} heading={article.url} image_url={article.image_url} text={article.path} upvotes={article.upvotes} downvotes={article.downvotes} onContentSubmit={this.callMaster}>
        </Article>
      );
    },this);
    return(
      <div>
      {articleNodes}
      </div>
    )
  }
});

var Header = React.createClass({
  render() {
    return(
      <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
      <div className="mdl-layout--large-screen-only mdl-layout__header-row">
      </div>
      <div className="mdl-layout--large-screen-only mdl-layout__header-row">
      <h3>Recommendation Portal</h3>
      </div>
      <div className="mdl-layout--large-screen-only mdl-layout__header-row">
      <SearchForm urlsolr = "http://localhost:5000/get_solr" />
      </div>
      <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark">
      <a href="#overview" className="mdl-layout__tab is-active">Entertainment</a>
      <a href="#world" className="mdl-layout__tab">World</a>
      <a href="#national" className="mdl-layout__tab">National</a>
      <a href="#sports" className="mdl-layout__tab">Sports</a>
      <a href="#features" className="mdl-layout__tab">Business</a>
      <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent" id="add">
      <i className="material-icons" role="presentation">add</i>
      <span className="visuallyhidden">Add</span>
      </button>
      </div>
      </header>
    )
  }
});

var Footer = React.createClass({
  render() {
    return (
      <footer className="mdl-mega-footer">
      <div className="mdl-mega-footer--middle-section">
      <div className="mdl-mega-footer--drop-down-section">
      {/*<input className="mdl-mega-footer--heading-checkbox" type="checkbox" >
      <h1 className="mdl-mega-footer--heading">Features</h1>
      <ul className="mdl-mega-footer--link-list">
      <li><a href="#">About</a></li>
      <li><a href="#">Terms</a></li>
      <li><a href="#">Partners</a></li>
      <li><a href="#">Updates</a></li>
      </ul>
      </input>*/}
      </div>
      <div className="mdl-mega-footer--drop-down-section">
      {/*<input className="mdl-mega-footer--heading-checkbox" type="checkbox" >
      <h1 className="mdl-mega-footer--heading">Details</h1>
      <ul className="mdl-mega-footer--link-list">
      <li><a href="#">Spec</a></li>
      <li><a href="#">Tools</a></li>
      <li><a href="#">Resources</a></li>
      </ul>
      </input>*/}
      </div>
      <div className="mdl-mega-footer--drop-down-section">
      {/*<input className="mdl-mega-footer--heading-checkbox" type="checkbox" >
      <h1 className="mdl-mega-footer--heading">Technology</h1>
      <ul className="mdl-mega-footer--link-list">
      <li><a href="#">How it works</a></li>
      <li><a href="#">Patterns</a></li>
      <li><a href="#">Usage</a></li>
      <li><a href="#">Products</a></li>
      <li><a href="#">Contracts</a></li>
      </ul>
      </input>*/}
      </div>
      <div className="mdl-mega-footer--drop-down-section">
      {/* <input className="mdl-mega-footer--heading-checkbox" type="checkbox" >
      <h1 className="mdl-mega-footer--heading">FAQ</h1>
      <ul className="mdl-mega-footer--link-list">
      <li><a href="#">Questions</a></li>
      <li><a href="#">Answers</a></li>
      <li><a href="#">Contact us</a></li>
      </ul>
      </input>*/}
      </div>
      </div>
      <div className="mdl-mega-footer--bottom-section">
      <div className="mdl-logo">
      More Information
      </div>
      <ul className="mdl-mega-footer--link-list">
      <li><a href="https://developers.google.com/web/starter-kit/">Web Starter Kit</a></li>
      <li><a href="#">Help</a></li>
      <li><a href="#">Privacy and Terms</a></li>
      </ul>
      </div>
      </footer>

    )
  }
});
var MainComponent = React.createClass({
  render() {
    return (
      <main className="mdl-layout__content">
      <div className="mdl-layout__tab-panel is-active" id="overview">
      <ArticleBox url={this.props.url} url2={this.props.url2} pollInterval="2000" category = "national"/>
      </div>
      <div className="mdl-layout__tab-panel" id="world">
      <section className="section--center mdl-grid mdl-grid--no-spacing">
      <div className="mdl-cell mdl-cell--12-col">
      <h4>World</h4>
      <ArticleBox url={this.props.url3} url2={this.props.url2} pollInterval="2000" category = "national"/>
      </div>
      </section>
      </div>
      <div className="mdl-layout__tab-panel" id="sports">
      <section className="section--center mdl-grid mdl-grid--no-spacing">
      <div className="mdl-cell mdl-cell--12-col">
      <h4>Sports</h4>
      <ArticleBox url={this.props.url4} url2={this.props.url2} pollInterval="2000" category = "national"/>
      </div>
      </section>
      </div>
      <Footer/>
      </main>
    )
  }
});
var Main = React.createClass({
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header/>
      <MainComponent url4="json/sports.json" url="json/national.json" url3="json/world.json" url2="edit"/>
      </div>

    );
  }

});
// var routes = (
//   <Route name="app" path="/" handler={Article}>
//     <Route name="ideas" handler={Individual} />
//     <DefaultRoute handler={Home} />
//   </Route>
// );

ReactDOM.render(
  <Main/>,
  document.getElementById('mainContainer')
);
