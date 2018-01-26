import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
import Web3 from 'web3';


export default class App extends Component {

	constructor(props) {
     super(props);

		 var url = "http://localhost:7545";

		 window.web3 = Web3();

		 if (typeof window.web3 !== undefined) {
			 window.web3 = new Web3(new Web3.providers.HttpProvider(url));
		 } else {

		 }

  }

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	getVal = e => {
		return 123;
	}

	render() {

		return (
			<div id="app">
				<Header/>
				<Router onChange={this.handleRoute}>
					<Home path="/"/>
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
