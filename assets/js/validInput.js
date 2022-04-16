export const validInput = input => {
  const todoLength = input.value.trim().length

  return {
    isValid: todoLength > 4 && todoLength < 100 ? true : false
  }
}
