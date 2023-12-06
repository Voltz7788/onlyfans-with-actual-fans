import * as EmailValidator from "email-validator";

export const isNameInvalid = (value: string) => {
  return /^[a-zA-Z\s]+$/.test(value) ? false : true;
};

export const isEmailInvalid = (value: string) => {
  return EmailValidator.validate(value) ? false : true;
};

export const isPasswordSignupValid = (value: string) => {
  return /^.{6,}$/.test(value) ? false : true;
};

export const isPasswordLoginValid = (value: string) => {
  return /^.+$/.test(value) ? false : true;
};
