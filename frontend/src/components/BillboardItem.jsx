import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import "../../src/index.css";

function BillboardItem({ id, image, size, address }) {
  const navigate = useNavigate();

  // Function to handle navigation on click
  const handleCardClick = () => {
    navigate(`/all-billboard/${id}`); // Navigate to the specified route
  };

  return (
    <div 
    onClick={handleCardClick}
    className="custom-card hover:cursor-pointer flex flex-col gap-3">
      <img
        src={image}
        alt="Billboard"
        className="rounded-lg w-full h-40 object-cover"
      />
      <div className="flex flex-col">
        <h5 className="font-inter-tight font-medium text-xl text-neutral-black">{`Billboard ukuran ${size}`}</h5>
        <p className="font-inter-tight font-regular text-sm text-neutral-700">{address}</p>
      </div>
    </div>
  );
}

BillboardItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default BillboardItem;
