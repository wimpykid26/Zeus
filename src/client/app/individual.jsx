var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('react-slick');

var ContentCard = React.createClass({
    render(){
        return(
         <div className="wow fadeInUp content-card">
            <div className="icon-and-title-flex">
                <img src="img/ic_launcher.png" className="appicon"></img>
                <div className="title-container">
                    <span className="text-title">Christiano Ronaldo</span>
                    <br></br><div className="intertext-padding"></div>
                    <span className="text-subtitle">by Hindustan Times</span>
                    <br></br><div className="intertext-padding"></div>
                    <span className="text-subtitle">27/10/1997</span>
                </div>
            </div><br></br><br></br>
            <span className="text-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida tristique condimentum. Quisque tempus eleifend sollicitudin. Nulla congue in erat et euismod. Nulla pellentesque leo id dui tempor lobortis. Phasellus sollicitudin ut massa eu dictum. Pellentesque viverra a diam a feugiat. Morbi non lorem et ex finibus elementum. Morbi pharetra risus eget quam pellentesque, sed laoreet purus malesuada. Aenean ut nibh quis lacus mollis euismod. Maecenas pellentesque magna vehicula convallis hendrerit. Sed maximus urna sed suscipit facilisis. Aenean posuere, ligula quis fermentum vulputate, quam nisi pulvinar felis, et sodales ligula augue sit amet nunc. Curabitur eget orci et tortor rhoncus consequat et id nunc.></span>
         </div>
            )
        }
    }
);
var SimpleSlider = React.createClass({
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
                    <span className="text-description">Average Rating 4.4</span>
                </div>
                <div className="detail-item">
                    <iron-icon className="details-icon" icon="info"></iron-icon>
                    <span className="text-description">Version 1.0.295</span>
                </div>
                <div className="detail-item">
                    <iron-icon className="details-icon" icon="mail"></iron-icon>
                    <span className="text-description">malkanifaiz@gmail.com</span>
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
                <SimpleSlider/>
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
