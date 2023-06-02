import { v4 as uuid } from 'uuid'
export default {
  User: {
    firstName: async (parent, args, context, info) => parent.firstName,
    lastName: async (parent, args, context, info) => parent.lastName,
    email: async (parent, args, context, info) => parent.email,
    courseResults: async (parent, args, { db }, info) => {
      return db.chain
        .get("courseResults")
        .filter({ learnerId: parent.id })
        .value();
    },
  },
  Query: {
    users: async (parent, args, { db }, info) => {
      return db.chain.get("users").value();
    },
    user: async (parent, { id }, { db }, info) => {
      return db.chain.get("users").find({ id }).value();
    },
  },
  Mutation: {
    createUser: async (
      parent,
      { firstName, lastName, email },
      { db },
      info
    ) => {
      const id = uuid();
      const newUser = { id, firstName, lastName, email };

      db.data.users.push(newUser);

      await db.write();

      return { ...newUser };
    },
    deleteUser: async (parent, { id }, { db }, info) => {
      try {
        db.data.users = db.data.users.filter(user => user.id !== id);
        await db.write();

        return true;
      } catch (e) {
        return false;
      }
    },
    updateUser: async (
      parent,
      { id, firstName, lastName, email },
      { db },
      info
    ) => {
      const user = db.data.users.find(user => user.id === id);
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
      }
      await db.write();

      return { ...user };
    },
  },
};
