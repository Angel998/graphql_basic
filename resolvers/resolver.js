const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  addPeopleToCourse
} = require("../actions/courseActions");

const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent
} = require("../actions/studentActions");

module.exports = {
  Query: {
    getCourses: async () => {
      const response = await getCourses();
      return response.data;
    },
    getCourse: async (_, { id }) => {
      const response = await getCourse(id);
      return response.data;
    },
    getStudents: async () => {
      const response = await getStudents();
      return response.data;
    },
    getStudent: async (_, { id }) => {
      const response = await getStudent(id);
      return response.data;
    }
  },
  Mutation: {
    createCourse: async (_, { input }) => {
      const response = await addCourse(input);
      return response.data;
    },
    editCourse: async (_, { id, input }) => {
      const response = await updateCourse(id, input);
      return response.data;
    },
    createStudent: async (_, { input }) => {
      const response = await addStudent(input);
      return response.data;
    },
    editStudent: async (_, { id, input }) => {
      const response = await updateStudent(id, input);
      return response.data;
    },
    addPeopleToCourse: async (_, { id_course, id_person }) => {
      const response = await addPeopleToCourse(id_course, id_person);
      return response.data;
    }
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {}
  }
};
