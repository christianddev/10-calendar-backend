const moment = require("moment");

const isDate = (value) => {
  try {
    if (!value) {
      return false
    }
    const date = moment(value)
    return date.isValid()
  } catch (error) {
    console.log('error')
    return false
  }
};

module.exports = {
  isDate,
};
