import  parseISO  from 'date-fns/parseISO';
import  isValid  from 'date-fns/isValid';
import  format  from 'date-fns/format';

export function isStringValidDate(dateString) {
  const parsedDate = parseISO(dateString);
  return isValid(parsedDate);
}
export function formatDayDateWithTime(dateString) {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, '');
}

export const GetError = (err) => {
  if (!err?.request) { 
    return 'Request block by cors'
  }
    if (!err?.response) {
        return 'No backend server response';
    }
    if (err?.response?.status === 500) {
        return "An internal server error occurred";
    }
     if (err?.response?.status === 403) {
        return "Your authentication state has expired please login again";
    }
    if (err?.response?.data?.errors?.length) return err?.response?.data?.errors
    return err?.response?.data?.message

}
