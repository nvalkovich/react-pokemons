import './App.css';
import SearchableCardList from './components/SearchableCardList';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<SearchableCardList />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}
