import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
// ✅ Redux store import
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux provider wrap */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
