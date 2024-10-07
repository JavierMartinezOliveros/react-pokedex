import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '../../assets/back-arrow';
import { Weight } from '../../assets/weight';
import { Height } from '../../assets/height';
import { StatBar } from '../StatBar/StatBar.component';
import './detail.styles.scss';

interface DetailProps {
  name: string;
  number: number;
  image: string;
  height: number;
  weight: number;
  types: string[];
  moves: string[];
  description: string;
  stats: { name: string; value: number }[];
  onNext: () => void; 
  onPrevious: () => void;
}

export const Detail = ({ name, number, image, types, height, weight, moves, description, stats, onNext, onPrevious }: DetailProps) => {
  const navigate = useNavigate();

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formattedNumber = number.toString().padStart(3, '0');

  return (
    <div className="detail">
      <div className='detail-header'>
        <div className='detail-top'>
          <div className='detail-nav'>
            <button 
              className='back-button' 
              onClick={() => navigate('/')}
            >
              <ArrowBack />
            </button>
            <h1>{capitalizeFirstLetter(name)}</h1>
          </div>
          <p className='detail-number'># {formattedNumber}</p>
        </div>
        <img className='detail-image' src={image} alt={name} />
        
        <button 
          className="detail-navigation-left" 
          onClick={onPrevious}
        >
          <img src="/react-pokedex/arrow-left.png" />
        </button>
        <button 
          className="detail-navigation-right" 
          onClick={onNext}
        >
          <img src="/react-pokedex/arrow-right.png" />
        </button>
      
      </div>
      <div className='detail-content'>
        <div className='detail-type'>
          {types.map((type, index) => (
            <span key={index} className={`detail-type__${type}`}>
              {capitalizeFirstLetter(type)}
            </span>
          ))}
        </div>
        <div className='detail-about'>
          <h2>About</h2>
          <div className='detail-about-content'>
            <div className='detail-about-data'>
              <Weight className='detail-about-icon' />
              {weight} Kg
              <p>Weight</p>
            </div>
            <div className='detail-about-data'>
              <Height className='detail-about-icon' />
              {height} cm
              <p>Height</p>
            </div>
            <div className='detail-about-data'>
              {moves}
              <p>Moves</p>
            </div>

          </div>

        </div>
        <div className='detail-description'>
          {description}
        </div>
        <div className='detail-base-stats'>
          <h2>Base Stats</h2>
          {stats.map((stat) => (
            <StatBar 
              key={stat.name} 
              name={stat.name} 
              value={stat.value} 
            />
          ))}
        </div>
      </div>  
    </div>
  )
}