import './App.css';
import SearchableCardList from './components/SearchableCardList';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <SearchableCardList />
      </ErrorBoundary>
    </div>
  );
}
