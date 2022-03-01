import { h } from 'preact';
// import { Router } from 'preact-router';

import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import SearchHolidays from '../routes/profile';



const App = () => (
	<div id="app">
		<Header />
			<Home path="/" />
			<SearchHolidays />
	</div>
)

export default App;
