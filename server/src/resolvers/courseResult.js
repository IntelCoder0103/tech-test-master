import { v4 as uuid } from 'uuid';
export default {
  CourseResult: {
    name: async (parent, args, context, info) => parent.name,
    score: async (parent, args, context, info) => parent.score,
    learnerId:  async (parent, args, context, info) => parent.learnerId
  },
  Query: {
    courseResults: async (parent, args, { db }, info) => {
      return db.chain.get('courseResults').value()
    },
    courseResult: async (parent, {id}, { db }, info) => {
      return db.chain.get('courseResults').find({ id }).value();
    }
  },
  Mutation: {
    createCourseResult: async (parent, { name, score, learnerId }, { db }, info) => {
      const id = uuid();
      const newCourse = {
        id, name, score, learnerId
      };
      db.data.courseResults.push(newCourse);

      await db.write();

      return { ...newCourse };
    },
    deleteCourseResult: async (parent, { id }, { db }, info) => {
      try {
        db.data.courseResults = db.data.courseResults.filter(course => course.id !== id);
        await db.write();

        return true;
      } catch (e) {
        return false;
      }
    },
    updateCourseResult: async (parent, { id, name, score, learnerId }, { db }, info) => {
      const course = db.data.courseResults.find(course => course.id === id);
      if (course) {
        course.name = name;
        course.score = score;
        course.learnerId = learnerId;
      }
      await db.write();

      return { ...course };
    }
  }
}