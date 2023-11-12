import './App.css';
import SearchableCardList from './components/SearchableCardList';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './components/Details';
import NotFoundPage from './components/NotFoundPage';

export default function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchableCardList />}>
              <Route index element={null} />
              <Route path="details" element={<Details />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}
