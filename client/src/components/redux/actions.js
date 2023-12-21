export const updateContent = (content) => {
  return {
    type: "UPDATE_CONTENT",
    payload: content,
  };
};

export const updateTodos = (todos) => {
  return {
    type: "UPDATE_TODOS",
    payload: todos,
  };
};