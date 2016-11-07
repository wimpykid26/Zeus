var NavToolbar = React.createClass({
	render : function() {
		return (
		    <div>
        <div class = "mdl-layout--large-screen-only mdl-layout__header-row">
          <h3>Name &amp; Title</h3>
        </div>
        <div class="mdl-layout--large-screen-only mdl-layout__header-row">
        </div>
        </div>
		);		
	}
})
ReactDOM.render(
  <NavToolbar/>,
  document.getElementById('app')
);
