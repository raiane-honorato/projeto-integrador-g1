function formatDate(date) {
  let dateFromMilisecondsToDateAndTime = new Date(date);
  let friendlyDate = dateFromMilisecondsToDateAndTime.toLocaleDateString('pt-Br',{ dateStyle: 'long' } )
  return friendlyDate;
}

export default formatDate;