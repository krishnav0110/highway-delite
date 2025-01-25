export const validateEmail = (email: string): boolean => {
  email = email.trim();

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return false;
  }

  return true;
};

export const validateName = (name: string): boolean => {
  name = name.trim();
  const firstName = name.split(" ").at(0)?.trim();
  const lastName = name.split(" ").at(-1)?.trim();

  let isValid = true;

  if (!firstName || !/^[a-z]+$/i.test(firstName)) {
    isValid = false;
  }

  if (!lastName || !/^[a-z]+$/i.test(lastName)) {
    isValid = false;
  }

  return isValid;
};

export const validatePassword = (password: string): boolean => {
  password = password.trim();

  if (!password || password.length < 6) {
    return false;
  }
  return true;
};