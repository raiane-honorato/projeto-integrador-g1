import { format } from 'date-fns';

function formatDate(date) {
  let dateFromMilisecondsToDateAndTime = new Date(date);
  let formatedDate = format(dateFromMilisecondsToDateAndTime, `dd/mm/yyyy`)
  return formatedDate;
}

export default formatDate;