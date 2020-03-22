import { createActions } from "reduxsauce";

const generate = prefix =>
  createActions(
    {
      getAll: null,
      getAllSuccess: ["entities"],
      getAllFailure: ["error"],
      get: ["id"],
      getSuccess: ["entity"],
      getFailure: ["error"],
      create: ["entity"],
      createSuccess: ["id", "entity"],
      createFailure: ["error"],
      update: ["id", "entity"],
      updateSuccess: ["id", "entity"],
      updateFailure: ["error"],
      delete: ["id"],
      deleteSuccess: ["id"],
      deleteFailure: ["error"]
    },
    { prefix: `${prefix.toUpperCase()}_` }
  );

const actions = {};
const actionTypes = [];

["event", "resource", "setting"].forEach(action => {
  const { Creators, Types } = generate(action);
  actionTypes[action] = Types;
  actions[action] = Creators;
});

export { actionTypes, actions };
