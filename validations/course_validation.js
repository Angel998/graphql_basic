// const validator = require('validator');
const { isEmpty } = require('../helpers/validations');

const validateAddCourse = newCourse => {
  const errors = {};
  if (isEmpty(newCourse.title)) {
    errors.title = 'Campo requerido';
  }

  if (isEmpty(newCourse.teacher)) {
    errors.teacher = 'Campo requerido';
  }

  if (isEmpty(newCourse.description)) {
    errors.description = 'Campo requerido';
  }

  if (isEmpty(newCourse.topic)) {
    errors.topic = 'Campo requerido';
  }
  return isEmpty(errors) ? null : errors;
};

module.exports = {
  validateAddCourse: validateAddCourse
};
