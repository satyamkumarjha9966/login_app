import toast from 'react-hot-toast';
import { authenticate } from './helper';

// Validate login page username
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    if (values.username) {
        // Check User Exist or Not
        const { status } = await authenticate(values.username);

        if (status !== 200) {
            errors.exist = toast.error('User Does Not Exist');
        }
    }

    return errors;
}

// Validate login page password
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);

    return errors;
}

// Validate Register Form
export async function registrationValidate(values) {
    const errors = usernameVerify({}, values) && passwordVerify({}, values) && emailVerify({}, values);

    return errors;
}

// Validate Profile Page
export async function profilePageValidate(values) {
    const errors = emailVerify({}, values)

    return errors;
}

// **********************************
// Validate Reset Password
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if (values.password !== values.confirm_password) {
        errors.confirm_password = toast.error("Password Not Matched");
    }

    return errors;
}
//***********************************
 
// Validate Password
function passwordVerify(errors = {}, values) {
    const specialChars = /[$&+,:;=?@#|'<>.-^*()%!]/
    
    if (!values.password) {
        errors.password = toast.error("Password is Required")
    }else if (values.password.includes(" ")) {
        errors.password = toast.error("Wrong Password")
    }else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4 Char")
    }else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must have Special Char");
    }

    return errors;
}

// Validate Username
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username is Required');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username!')
    }

    return error;
}

// Validate E-mail
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required")
    }else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong E-mail")
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid Email Address")
    }
}