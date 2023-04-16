import React from 'react';

const MultiSelect = ({ options, selectedOptions, setSelectedOptions }) => {

    const handleChange = (event) => {
        setSelectedOptions(Array.from(event.target.selectedOptions, (option) => option.value));
    };

    return (
        <div className="wd-multiselect-container">
        <select
            className="wd-multiselect"
            multiple
            required={true}
            size="3"
            value={selectedOptions}
            onChange={handleChange}
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        </div>
    );
};

export default MultiSelect;
