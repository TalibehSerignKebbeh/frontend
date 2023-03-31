import React from 'react';



export const formatNumber = (number) => {
const options = { style: 'decimal', useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2, minimumIntegerDigits: 1, currency: 'GMD', currencyDisplay: 'symbol' };
const formattedNumber = number?.toLocaleString('en-US', {...options}); // "$1,234,567.89"
    return formattedNumber;
}

export function getStyles(role, roles, theme) {
    return {
      fontWeight:
        roles?.indexOf(role) === -1
          ? theme?.typography?.fontWeightRegular
          : theme?.typography?.fontWeightMedium,
    };
  }
const Format = () => {
    return (
        <div>
            
        </div>
    );
}

export default Format;
