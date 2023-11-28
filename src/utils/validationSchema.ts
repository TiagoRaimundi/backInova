import * as yup from 'yup'

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const CELLPHONE_REGEX = /^\(\d{2}\)\s\d{4,5}\-\d{4}$/;

export const CreateUserViewerSchema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .required("Name is missing!")
    .min(3, "Name is too short!")
    .max(20, "Name is too long!"),
    email: yup
    .string()
    .required("Email is missing!")
    .email("Invalid email id!"),    
    password: yup
    .string()
    .trim()
    .required("Password is missing"!)
    .min(8, "Password is too short!")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
    "Password is too simple!")

})

export const CreateUserStreamerSchema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .required("Name is missing!")
    .min(3, "Name is too short!")
    .max(20, "Name is too long!"),
    email: yup
    .string()
    .required("Email is missing!")
    .email("Invalid email id!"),    
    password: yup
    .string()
    .trim()
    .required("Password is missing"!)
    .min(8, "Password is too short!")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
    "Password is too simple!"),
    cpf: yup
    .string()
    .trim()
    .required("CPF number is required")
    .matches(CPF_REGEX, "Invalid CPF format"),
    phoneNumber: yup
    .string()
    .trim()
    .required("Cellphone number is required")
    .matches(CELLPHONE_REGEX, "Invalid cellphone number format")
    


})