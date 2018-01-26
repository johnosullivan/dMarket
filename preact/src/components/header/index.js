import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
//import style from './style';
import Toolbar from 'preact-material-components/Toolbar';
import 'preact-material-components/style.css';

export default class Header extends Component {

	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {

		var style = {
			'background-color':'#123456'
		}

		return (
			<div>

      </div>
		);
	}
}
