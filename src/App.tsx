import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { FormWithHook } from './pages/FormWithHook';
import { Uncontrolled } from './pages/UncontrolledForm';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/uncontrolled-form" element={<Uncontrolled />} />
          <Route path="/with-hook-form" element={<FormWithHook />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
