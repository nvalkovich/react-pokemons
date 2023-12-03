import { TileData } from '../types/interfaces';
import './DataTiles.css';

type DataTilesProps = {
  data: TileData[];
};

export const DataTiles = ({ data }: DataTilesProps) => {
  const reversedData = [...data].reverse();

  return (
    <>
      {reversedData.map((dataItem, index) => {
        return (
          <div
            key={dataItem.id}
            className="data-tile"
            id={index === 0 ? 'new' : 'old'}
          >
            <div className="data-tile__list">
              <p>Name: {dataItem.name}</p>
              <p>Age: {dataItem.age}</p>
              <p>Email: {dataItem.email}</p>
              <p>Password: {dataItem.password}</p>
              <p>Confirmed password: {dataItem.password}</p>
              <p>Gender: {dataItem.gender}</p>
              <p>
                Conditions accepted:{' '}
                {dataItem.conditionsAccepted ? 'yes' : 'no'}
              </p>
              <img src={dataItem.file} width={200}></img>
              <p>Country: {dataItem.country}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
