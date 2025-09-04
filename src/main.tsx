import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/app';
import { GIT_BASE_URL } from './utils/route';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router basename={GIT_BASE_URL}>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</React.StrictMode>
);
