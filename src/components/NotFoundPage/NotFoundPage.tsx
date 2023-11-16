import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-numbers">
        <span className="not-found-numbers__number">4</span>
        <img
          src="./svg/pokeball.svg"
          className="not-found-numbers__image"
        ></img>
        <span className="not-found-numbers__number">4</span>
      </div>

      <p className="not-found-text">Page not found</p>
    </div>
  );
}
