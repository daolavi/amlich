import moment from "moment";
const CalendarVietnamese = require('date-chinese').CalendarVietnamese

let Transformer = {
  methods: {
    solar2lunar(d) {
      var day = new moment(d);
      var cal = new CalendarVietnamese();
      cal.fromGregorian(day.year(), day.month()+1, day.date());
      var cdate = cal.get();
      var gyear = cal.yearFromEpochCycle();
      return {
        'day': gyear + "-" + cdate[2] + "-" + cdate[4],
        'dayTxt': cdate[4] + "." + cdate[2],
        'isYunMonth': cdate[3]
      }
    }
  }
}

export default Transformer
