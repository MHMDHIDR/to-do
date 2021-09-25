export const validInput = (input) => {
  const todoLength = input.value.trim().length;

  return todoLength > 10 && todoLength < 100 ? true : false;
};
