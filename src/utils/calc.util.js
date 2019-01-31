const add = (a, b) => {
  return parseFloat(a) + parseFloat(b);
};

const sub = (a, b) => {
  return parseFloat(a) - parseFloat(b);
};

const multi = (a, b) => {
  return parseFloat(a) * parseFloat(b);
};

const div = (a, b) => {
  return parseFloat(b) == 0 ? null : parseFloat(a) / parseFloat(b);
};

const factorial = n => {
  if (parseInt(n) == 0) return 1;
  let result = 1;
  for (let i = 1; i <= parseInt(n); i++) {
    result *= i;
  }
  return result;
};

export { add, sub, multi, div, factorial };
