import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import isSameHour from "date-fns/isSameHour";
import isSameMinute from "date-fns/isSameMinute";
import isToday from "date-fns/isToday";
import isYesterday from "date-fns/isYesterday";
import parseISO from "date-fns/parseISO";



export function formatDate(date, formatString) {

    if (date) {
        if (isToday(parseISO(date))) {
            if (isSameMinute(parseISO(date), new Date())) {
                return formatDistanceToNow(date) + " ago"
            }
            if (isSameHour(parseISO(date), new Date())) {
                return formatDistanceToNow(date)+ " ago"
            }
        return "Today at " + format(parseISO(date), 'kk:mm bbb');

        } 

        if (isYesterday(parseISO(date))) {
             return "Yesterday at " + format(parseISO(date), 'kk : mm bbb');
         }

        return format(parseISO(date), 'do MMM, yyyy HH:mm aa');
    }

    return 'invalid date recieve'
}



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
  for (var j = 0; j < 3; j++) {
    var value = (hash >> (j * 8)) & 0xFF;
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
