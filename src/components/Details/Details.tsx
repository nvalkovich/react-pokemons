import { useSearchParams } from 'react-router-dom';
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
            <button className="card-details-container__btn-close btn">
              Close
            </button>
            {card ? (
              <div className="card-details">
                <h1 className="title">{card.name}</h1>
                <ul className="card-details__details">
                  <p>
                    <span className="detail-category">Supertype: </span>
                    {card.supertype}
                  </p>
                  <p>
                    <span className="detail-category">Subtypes: </span>{' '}
                    {card.subtypes.join(', ')}
                  </p>
                  {card.types && (
                    <p>
                      <span className="detail-category">Types:</span>{' '}
                      {card.types?.join(', ')}
                    </p>
                  )}
                  {card.level && (
                    <p>
                      <span className="detail-category">Level:</span>{' '}
                      {card.level}
                    </p>
                  )}
                  {card.hp && (
                    <p>
                      <span className="detail-category">HP:</span> {card.hp}
                    </p>
                  )}
                  {card.abilities && (
                    <p>
                      <span className="detail-category">Abilities: </span>
                      {card.abilities
                        ?.map((ability) => ability.name)
                        .join(', ')}
                    </p>
                  )}
                  {card.attacks && (
                    <p>
                      <span className="detail-category">Attacks: </span>
                      {card.attacks?.map((attack) => attack.name).join(', ')}
                    </p>
                  )}
                  {card.rarity && (
                    <p>
                      <span className="detail-category">Rarity: </span>{' '}
                      {card.rarity}
                    </p>
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
