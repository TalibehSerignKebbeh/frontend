

export const formatNumber = (number) => {
const options = { style: 'decimal', useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2, minimumIntegerDigits: 1, currency: 'GMD', currencyDisplay: 'symbol' };
const formattedNumber = number?.toLocaleString('en-US', {...options}); // "$1,234,567.89"
    return formattedNumber;
}

export const formatChartNumber = (number) => {
const options = { style: 'decimal', useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2, minimumIntegerDigits: 1, currency: 'GMD', currencyDisplay: 'symbol' };
const formattedNumber = number?.toLocaleString('en-US', {...options}); // "$1,234,567.89"
    return formattedNumber;
}

export const stringToColour = (str)=> {
  var hash = 0;
  for (var i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value?.toString(16)).substr(-2);
  }
  return colour;
}

export function getStyles(role, roles, theme) {
    return {
      fontWeight:
        roles?.indexOf(role) === -1
          ? theme?.typography?.fontWeightRegular
          : theme?.typography?.fontWeightMedium,
    };
  }

export const monthNames = ["January", "February",
    "March", 'April',
    "May", 'June', "July",
    "August", "September",
    "October", "November",
  "December"];
    
    export const months = ["Jan", "Feb",
    "Mar", 'Apr',
    "May", 'Jun', "Jul",
    "Aug", "Sept",
    "Oct", "Nov",
    "Dec"];
