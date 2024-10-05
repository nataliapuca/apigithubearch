import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .defined()
    .max(28, "Name cannot exceed 28 characters")
    .matches(
      /^[a-zA-Z0-9-]+$/,
      "Name can only contain alphanumeric characters and dashes"
    ),
});
