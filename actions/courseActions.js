const Course = require('../schemas/Course');

const { validateAddCourse } = require('../validations/course_validation');

// Retorna todos los cursos en la base de datos
const getCourses = async () => {
  try {
    const courses = await Course.find();
    return { data: courses };
  } catch (err) {
    return { data: [], error: 'No fue posible obtener los cursos' };
  }
};

// Busca y retorna un curso en especifico
const getCourse = async id => {
  try {
    const course = await Course.findById(id);
    return { data: course };
  } catch (err) {
    return { data: {}, error: 'No fue posible encontrar el curso' };
  }
};

// Valida, agrega y retorna un nuevo curso
const addCourse = async courseData => {
  const errors = validateAddCourse(courseData);
  if (errors) {
    return { error: errors };
  }
  const newCourse = new Course(courseData);
  try {
    const savedCourse = await newCourse.save();
    return { data: savedCourse };
  } catch (err) {
    return { error: 'No fue posible guardar el nuevo curso', data: {} };
  }
};

module.exports = {
  getCourses,
  addCourse,
  getCourse
};
