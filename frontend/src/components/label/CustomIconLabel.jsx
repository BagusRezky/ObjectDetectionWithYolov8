import PropTypes from 'prop-types';
import { IconCircle } from '@tabler/icons-react';

function CustomIconLabel({ icon: Icon, label, color }) {
    return (
        <div className="flex items-center gap-1">
            <Icon size={20} stroke={2} color={color} />
            <span className="font-inter-tight font-medium text-base text-neutral-black">{label}</span>
        </div>
    );
}   

CustomIconLabel.propTypes = {
    icon: PropTypes.elementType.isRequired,  // Icon component
    label: PropTypes.string.isRequired,      // Label text
    color: PropTypes.string.isRequired       // Color of the icon
};  

export default CustomIconLabel;