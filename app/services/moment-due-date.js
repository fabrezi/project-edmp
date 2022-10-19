const hoildays = {
  "1/3/2022": "New Year Day",
  "1/17/2022": "Martin Luther King Jr Day",
  "5/30/2022": "Memorial Day",
  "7/4/2022": "Independence Day",
  "9/5/2022": "Labor Day",
  "11/24/2022": "Thanksgiving Day",
  "11/25/2022": "Thanksgiving Friday",
  "12/23/2022": "Christmas Eve",
  "12/26/2022": "Christmas Day",
  "12/27/2022": "Year-End Shutdown",
  "12/28/2022": "Year-End Shutdown",
  "12/29/2022": "Year-End Shutdown",
  "12/30/2022": "Year-End Shutdown",
}

check_holiday = (time) => {
  time = new Date(time);
  var day_string = time.toLocaleDateString();
  // var mm = time.getMonth() + 1;
  // var dd = time.getDate();
  // var yyyy = time.getFullYear();
  // var day_string = mm + '/' + dd + '/' + yyyy;
  return Object.keys(hoildays).includes(day_string);
}

check_weekend = (time) => {
  time = new Date(time);
  var day = time.getDay();
  return (day == 0) || (day == 6);
}

exports.calculate_due_date = (reqeust_date, offset) => {
  var due_date = reqeust_date;
  while (offset != 0) {
    offset = offset - 1;
    due_date.setDate(due_date.getDate() + 1);;
    if (check_holiday(due_date) || check_weekend(due_date)) {
      offset = offset + 1;
    }
  }
  return due_date;
}