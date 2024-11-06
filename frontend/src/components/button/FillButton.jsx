import React from 'react';
import PropTypes from 'prop-types';

function FillButton({ label, onClick, type = 'button', disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="flex items-center justify-center rounded-lg bg-navy px-4 h-11 font-inter-tight text-base font-medium text-white" 
            disabled={disabled}
        >
            {label}
        </button>
    );
}

FillButton.propTypes = {
    label: PropTypes.string.isRequired,        // Text to display on the button
    onClick: PropTypes.func,                   // Function to call on button click
    type: PropTypes.oneOf(['button', 'submit', 'reset']), // Type of button
    disabled: PropTypes.bool                   // To disable the button
};

FillButton.defaultProps = {
    onClick: () => { },                         // Default empty function if none provided
    type: 'button',                            // Default button type
    disabled: false                            // Button is enabled by default
};

export default FillButton;
