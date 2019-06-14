const { isEmpty } = require('../helpers/validations')

const validateAddStudent = data => {
    const errors = {}
    if(isEmpty(data.name)) {
        errors.name = "Campo requerido"
    }
    if(isEmpty(data.email)) {
        errors.email = "Campo requerido"
    }
    return isEmpty(errors) ? null : errors
}

module.exports = {
    validateAddStudent
}