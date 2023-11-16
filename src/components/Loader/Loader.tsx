import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-wrapper" data-testid="loader">
      <img className="loader" src="./svg/pokeball.svg" alt="loader"></img>
    </div>
  );
}
