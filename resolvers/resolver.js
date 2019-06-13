const courses = [
  {
    _id: '121',
    title: 'Primer titulo',
    teacher: 'Angel Hernandez',
    description: 'Este es el primer curso',
    topic: 'mate'
  },
  {
    _id: '111',
    title: 'Segundo titulo',
    teacher: 'Angel Hernandez',
    description: 'Este es el primer curso',
    topic: 'mate'
  },
  {
    _id: '222',
    title: 'Tercero titulo',
    teacher: 'Angel Hernandez',
    description: 'Este es el primer curso',
    topic: 'mate'
  }
];

module.exports = {
  Query: {
    getCourses: () => {
      return courses;
    },
    getCourse: (root, args) => {
      const { id } = args;
      const course = courses.find(c => c._id === id);
      return course;
    }
  }
};
