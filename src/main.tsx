import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/app';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</React.StrictMode>
);
