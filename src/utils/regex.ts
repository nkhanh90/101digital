export const isNumber = (value: string) => {
  const reg = /^[\d]+$/;
  return reg.test(value);
};

export const isAlphaNumeric = (value: string) => {
  const reg = /^[A-Za-z0-9]*$/;
  return reg.test(value);
};

export const isEmail = (value: string) => {
  const reg = /^[a-zA-Z\d.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/;
  return reg.test(value);
};

export const isPasswordStrength = (value: string) => {
  const reg = /(?=.*[a-zA-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=.{8,})/;
  return reg.test(value) && value.length >= 8;
};

export const isDecimal = (value: string) => {
  const reg = /^\d*\.?\d*$/;
  return reg.test(value);
};
