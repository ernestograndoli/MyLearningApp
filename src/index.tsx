import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import News from '../src/app/routes/news';
import New from '../src/app/routes/new';
import About from '../src/app/routes/about';
import ErrorPage from '../src/app/routes/errorPage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/news" element={<News />}>
            <Route path=":newId" element={<New />}/>
          </Route>
          <Route path="/about" element={<About />}/>
          <Route path="*" element={<ErrorPage />}/>
        </Route>
      </Routes>      
    </BrowserRouter>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
