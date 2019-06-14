const { getCourses, getCourse } = require('../actions/courseActions');

module.exports = {
  Query: {
    getCourses: async () => {
      const response = await getCourses();
      return response.data;
    },
    getCourse: async (_, args) => {
      const { id } = args;
      const response = await getCourse(id);
      return response.data;
    }
  }
};
