const moment = require("moment");

const isDate = (value) => {
  try {
    if (!value) {
      return false
    }
    const date = moment(value)
    return date.isValid()
  } catch (error) {
    console.error('isDate', error)
    return false
  }
};

module.exports = {
  isDate,
};
