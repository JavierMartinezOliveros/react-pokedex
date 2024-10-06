import { useNavigate } from 'react-router-dom';
import './card.styles.scss';

interface CardProps {
  number: number;
  name: string;
  image: string;
}

export const Card = ({ number, name, image }: CardProps) => {
  const navigate = useNavigate();

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formattedNumber = number.toString().padStart(3, '0');

  return (
    <div className="card" onClick={() => navigate(`/pokemon/${number}`)}>
      <div className='card-number'># {formattedNumber}</div>
      <div className='card-content'>
        <img className='card-image' src={image} alt={name} />
        <h2 className='card-name'>{capitalizeFirstLetter(name)}</h2>
      </div>
    </div>
  )
} 