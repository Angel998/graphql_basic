const Course = require("../schemas/Course");

const { validateAddCourse } = require("../validations/course_validation");
const { getStudent } = require("./studentActions");

// Retorna todos los cursos en la base de datos
const getCourses = async () => {
  const response = { data: [] };
  try {
    const courses = await Course.find();
    response.data = courses;
  } catch (err) {
    response.error = "No fue posible obtener los cursos";
  }
  return response;
};

// Busca y retorna un curso en especifico
const getCourse = async id => {
  const response = { data: {} };
  try {
    const course = await Course.findById(id);
    response.data = course;
  } catch (err) {
    response.error = "No fue posible encontrar el curso";
  }
  return response;
};

// Valida, agrega y retorna un nuevo curso
const addCourse = async courseData => {
  const response = { data: {} };
  const errors = validateAddCourse(courseData);
  if (errors) {
    response.error = errors;
  } else {
    const newCourse = new Course(courseData);
    try {
      const savedCourse = await newCourse.save();
      response.data = savedCourse;
    } catch (err) {
      response.error = "No fue posible guardar el nuevo curso";
    }
  }

  return response;
};

const updateCourse = async (id, newData) => {
  const response = { data: {} };
  try {
    const findedCourse = await Course.findById(id);
    if (newData.title) {
      findedCourse.title = newData.title;
    }
    if (newData.teacher) {
      findedCourse.teacher = newData.teacher;
    }
    if (newData.description) {
      findedCourse.description = newData.description;
    }
    if (newData.topic) {
      findedCourse.topic = newData.topic;
    }
    const savedCourse = await findedCourse.save();
    response.data = savedCourse;
  } catch (err) {
    response.error = "No fue posible actualizar el curso";
  }
  return response;
};

const addPeopleToCourse = async (id_course, id_people) => {
  const response = { data: {} };
  const courseResponse = await getCourse(id_course);
  if (courseResponse.error) {
    response.error = courseResponse.error;
    return response;
  }

  const studentResponse = await getStudent(id_people);
  if (studentResponse.error) {
    response.error = studentResponse.error;
    return response;
  }

  const course = courseResponse.data;
  const student = studentResponse.data;

  if (course.people.findIndex(p => p._id.equals(student._id)) >= 0) {
    response.error = "La persona ya se encuentra en el curso";
  } else {
    courseResponse.data.people.push(studentResponse.data);
    try {
      const savedCourse = await courseResponse.data.save();
      response.data = savedCourse;
    } catch (err) {
      response.error = "No se pudo agregar a la persona en el curso";
    }
  }

  return response;
};

module.exports = {
  getCourses,
  addCourse,
  getCourse,
  updateCourse,
  addPeopleToCourse
};
