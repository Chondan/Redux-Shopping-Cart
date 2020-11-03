import React from 'react';
import './App.css';
import { ItemsList } from './features';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Navbar } from './app/Navbar';
import { Cart } from './features';

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/Redux-Shopping-Cart" component={ItemsList} />
					<Route exact path="/Redux-Shopping-Cart/cart" component={Cart} />
					<Redirect to="/Redux-Shopping-Cart" />
				</Switch>
			</div>
		</Router>
	);
}

export default App;