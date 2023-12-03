import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { DataTiles } from '../components/DataTiles';
import './MainPage.css';

export const MainPage: React.FC = () => {
  const dataList = useAppSelector((state) => state.form.dataList);

  return (
    <>
      <ul className="main-links">
        <li>
          <Link to="/uncontrolled-form">Uncontrolled form</Link>
        </li>
        <li>
          <Link to="/with-hook-form">Form with RHF</Link>
        </li>
      </ul>
      <div className="data-tiles">
        {dataList && <DataTiles data={dataList} />}
      </div>
    </>
  );
};
