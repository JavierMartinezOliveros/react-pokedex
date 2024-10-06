import './statbar.styles.scss';

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
}

export const StatBar = ({ name, value, maxValue = 200 }:StatBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="stat-bar">
      <p>{name}</p>
      <div className="stat-data">
        <p><span>{value}</span></p>
        <div className='progress-bar'>
          <div className="filler" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};
