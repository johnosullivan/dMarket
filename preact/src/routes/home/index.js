import { h, Component } from 'preact';
import style from './style';
import web3service from '../../services/web3service';

export default class Home extends Component {

	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return (
			<div class={style.home}>
			</div>
		);
	}
}
