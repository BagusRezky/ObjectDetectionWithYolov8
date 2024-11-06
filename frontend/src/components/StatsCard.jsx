import PropTypes from 'prop-types'; // Ensure you import PropTypes
import { IconCircle, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'; // Import your default icon
import '../../src/index.css';

function StatsCard({ title, icon: Icon, value, percentage }) {
  // Define the color and stroke for the icon
  const iconColor = "#1b1b1b";
  const iconStroke = 1.5;

  return (
    <div className="custom-card pb-3 flex flex-col gap-8">
      <div className="flex items-center gap-1">
        {/* Render the icon if provided; otherwise, use the default icon */}
        {Icon ? (
          <Icon size={20} stroke={iconStroke} color={iconColor} />
        ) : (
          <IconCircle size={20} color={iconColor} stroke={iconStroke} />
        )}
        <h4 className="fontinter-tight font-regular text-base text-neutral-black">{title}</h4>
      </div>
      <div className="flex items-end justify-between ">
        <h3 className='font-inter-tight font-semibold text-[28px] text-neutral-black'>
          {value}
        </h3>
        <div className='flex items-center gap-1'>
          {percentage > 0 ?
            <IconTrendingUp size={16} stroke={2} color="#43936C" /> : <IconTrendingDown size={16} stroke={2} color="#CE161E" />}
          <span className={`font-inter-tight font-semibold text-sm ${percentage > 0 ? 'text-green' : 'text-red'}`}>
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}

// Define PropTypes for StatsCard
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,  // title must be a string and is required
  value: PropTypes.string.isRequired,  // value must be a string and is required
  percentage: PropTypes.number,         // percentage must be a string but is not required
  icon: PropTypes.elementType            // icon must be a valid React component
};

export default StatsCard;
