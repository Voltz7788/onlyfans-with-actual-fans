type styleParams = {
  focused: boolean;
  invalid: boolean;
  value?: string;
};

export const labelStylingChecker = ({
  focused,
  invalid,
  value,
}: styleParams) => {
  if (focused) {
    return labelStyles.focused;
  }

  if (invalid && value === "") {
    return labelStyles.invalidEmpty;
  }

  if (invalid) {
    return labelStyles.invalidFilled;
  }

  if (value === "") {
    return labelStyles.unfocusedEmpty;
  }

  return labelStyles.unfocusedFilled;
};

export const inputStyleChecker = ({ focused, invalid }: styleParams) => {
  if (focused) {
    return inputStyles.focused;
  }

  if (invalid) {
    return inputStyles.invalid;
  }

  return inputStyles.unfocused;
};

export const showWarningChecker = ({ focused, invalid }: styleParams) => {
  if (focused) {
    return false;
  }

  if (invalid) {
    return true;
  }
};

const labelStyles = {
  focused: "text-sky-400 -top-2 text-xs",
  unfocusedEmpty: "text-gray-400 top-1/4 text-base",
  unfocusedFilled: "text-gray-400 -top-2 text-xs",
  invalidEmpty: "text-red-400 top-1/4 text-base",
  invalidFilled: "text-red-400 -top-2 text-xs",
};

const inputStyles = {
  focused: "border-sky-400 text-black-500",
  unfocused: "border-gray-300 text-black-500",
  invalid: "border-red-400 text-red-500",
};
