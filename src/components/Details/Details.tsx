import { useNavigate, useSearchParams } from 'react-router-dom';
import Api from '../../Api';
import { useEffect, useState } from 'react';
import { CardData } from '../../types/interfaces';
import Loader from '../Loader';
import './Details.css';

const api = new Api();

export default function Details() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [card, setCard] = useState<CardData | null>(null);
  const [isFetching, setFetching] = useState(false);

  const navigate = useNavigate();

  const onCloseClick = () => {
    searchParams.delete('id');
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  useEffect(() => {
    const search = async () => {
      setFetching(true);

      try {
        if (!id) {
          return;
        }
        const card = await api.getCard(id);
        setCard(card);
      } finally {
        setFetching(false);
      }
    };

    search().catch(console.error);
  }, [id]);

  return (
    <>
      {isFetching ? (
        <div className="details-loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <div className="card-details-container">
            {card ? (
              <div className="card-details">
                <button
                  className="card-details-container__btn-close btn"
                  onClick={onCloseClick}
                >
                  Close
                </button>
                <h1 className="card-details__title title">{card.name}</h1>
                <ul className="card-details__details">
                  <li>
                    <span className="detail-category">Supertype: </span>
                    {card.supertype}
                  </li>
                  <li>
                    <span className="detail-category">Subtypes: </span>{' '}
                    {card.subtypes.join(', ')}
                  </li>
                  {card.types && (
                    <li>
                      <span className="detail-category">Types:</span>{' '}
                      {card.types?.join(', ')}
                    </li>
                  )}
                  {card.level && (
                    <li>
                      <span className="detail-category">Level:</span>{' '}
                      {card.level}
                    </li>
                  )}
                  {card.hp && (
                    <li>
                      <span className="detail-category">HP:</span> {card.hp}
                    </li>
                  )}
                  {card.abilities && (
                    <li>
                      <span className="detail-category">Abilities: </span>
                      {card.abilities
                        ?.map((ability) => ability.name)
                        .join(', ')}
                    </li>
                  )}
                  {card.attacks && (
                    <li>
                      <span className="detail-category">Attacks: </span>
                      {card.attacks?.map((attack) => attack.name).join(', ')}
                    </li>
                  )}
                  {card.rarity && (
                    <li>
                      <span className="detail-category">Rarity: </span>{' '}
                      {card.rarity}
                    </li>
                  )}
                </ul>
                <img
                  className="card-details__image"
                  src={card.images.small}
                  alt={card.name}
                ></img>
                {card.flavorText && (
                  <p className="card-details__description">{card.flavorText}</p>
                )}
              </div>
            ) : (
              <div>Not found</div>
            )}
          </div>
        </>
      )}
    </>
  );
}
