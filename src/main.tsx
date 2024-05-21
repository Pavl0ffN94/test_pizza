import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style.sass';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux';
import {EmployeEditor} from './components/employEditor';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/add' element={<EmployeEditor />} />
        <Route path='/:id' element={<EmployeEditor />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
