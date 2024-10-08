// helper function to format the date
// Formats date as MM/DD/YYYY
// obtained the the following lines of code from Module 14 of mini project

module.exports = {
    format_date: (date) => {
      return date.toLocaleDateString();
    }
};

