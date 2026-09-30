import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || '91XXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com'}>
    <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);


