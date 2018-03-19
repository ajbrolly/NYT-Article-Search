import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Switch>
							<Route path="/" component={Home} />
							<Route exact path="/saved" component={Home} />
							<Route component={NoMatch} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	};
};



export default App;
