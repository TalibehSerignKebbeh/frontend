import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import isSameHour from "date-fns/isSameHour";
import isSameMinute from "date-fns/isSameMinute";
import isToday from "date-fns/isToday";
import isYesterday from "date-fns/isYesterday";
import parseISO from "date-fns/parseISO";



export function formatOtherDate(date) {

        if (isToday(parseISO(date))) {
            // if (isSameMinute(parseISO(date), new Date())) {
            //     return formatDistanceToNow(parseISO(date)) + " ago"
            // }
            // if (isSameHour(parseISO(date), new Date())) {
            //     return formatDistanceToNow(parseISO(date))+ " ago"
            // }
        return "Today at " + format(parseISO(date), 'kk:mm b');

        } 

        if (isYesterday(parseISO(date))) {
             return "Yesterday at " + format(parseISO(date), 'kk : mm b');
         }

    return format(parseISO(date), 'do MMM, yyyy HH:mm b');
    // do MMM yyyy HH:mm b

}

export function formatNotificationDate(date) {

        if (isToday(parseISO(date))) {
            if (isSameMinute(parseISO(date), new Date())) {
                return formatDistanceToNow(parseISO(date)) + " ago"
            }
            if (isSameHour(parseISO(date), new Date())) {
                return formatDistanceToNow(parseISO(date))+ " ago"
            }
        return "Today at " + format(parseISO(date), 'kk:mm b');

        } 

        if (isYesterday(parseISO(date))) {
             return "Yesterday at " + format(parseISO(date), 'kk : mm b');
         }

    return format(parseISO(date), 'do MMM, yyyy HH:mm b');
    // do MMM yyyy HH:mm b

}