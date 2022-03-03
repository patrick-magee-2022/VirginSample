import { h } from 'preact';
// import { Router } from 'preact-router';

import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
// Code-splitting is automated for `routes` directory
import Home from './home';
import Search from './search/search.component';



const App = () => (
	<div id="app">
		<Header />
			<Home path="/" />
			<Search />
	</div>
)

export default App;
