type formDataType = {
  email: string;
  password: string;
  name?: string;
};

type invalidDataType = {
  email: boolean;
  password: boolean;
  name?: boolean;
};

export const isLoginSubmittable = (
  loginData: formDataType,
  invalidData: invalidDataType
) => {
  if (
    loginData.email === "" ||
    loginData.password === "" ||
    invalidData.email === true ||
    invalidData.password === true
  ) {
    return true;
  }

  return false;
};

export const isSignupSubmittable = (
  signupData: formDataType,
  invalidData: invalidDataType
) => {
  if (
    signupData.name === "" ||
    signupData.email === "" ||
    signupData.password === "" ||
    invalidData.name === true ||
    invalidData.email === true ||
    invalidData.password === true
  ) {
    return true;
  }

  return false;
};
