const Student = require('../schemas/Student')
const { validateAddStudent } = require('../validations/student_validation')

const getStudents = async () => {
    const response = {data: []}
    try {
        const students = await Student.find()
        response.data = students
    } catch(err) {
        response.error = "No fue posible obtener los estudiantes"
    }
    return response
}

const getStudent = async id => {
    const response = { data: { }}
    try {
        const student = await Student.findById(id)
        response.data = student
    } catch (err) {
        response.error = "No fue posible obtener al estudiante"
    }
    return response
}

const addStudent = async (data) => {
    const errors = validateAddStudent(data)
    const response = { data: { }}
    if(errors) {
        response.error = errors
    } else {
        const newStudent = new Student(data)
        try {
            const savedStudent = await newStudent.save()
            response.data = savedStudent
        } catch(err) {
            response.error = "No se pudo guardar al nuevo estudiante"
        }
    }
    
    return response
}

const updateStudent = async (id, newData) => {
    const response = { data: {}}
    try {
        const findedStutent = await Student.findById(id)
        if(newData.name) {
            findedStutent.name = newData.name
        }
        if(newData.email) {
            findedStutent.email = newData.email
        }
        const savedStudent = await findedStutent.save()
        response.data = savedStudent
    } catch(err) {
        response.error = `No fue posible actualizar al estudiante: ${id}`
    }
    return response
}

module.exports = {
    getStudents,
    getStudent,
    addStudent,
    updateStudent
}