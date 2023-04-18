import validator from 'validator';

declare interface SignupFormValues {
    name: string,
    email: string,
    password: string,
    phone: string,
    birthday: string,
    gender: string
}
interface ValidationErrors {
    name?: string,
    email?: string,
    password?: string,
    phone?: string,
    birthday?: string,
    gender?: string,
  }

export default function ValidateSignupForm({ name, email, password, phone, birthday, gender }: SignupFormValues) {

    const errors: ValidationErrors = { };

    if (!name) {
        errors.name = 'Name is required';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!validator.isEmail(email)) {
        errors.email = 'Invalid email';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (!validator.isLength(password, { min: 6 })) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (!phone) {
        errors.phone = 'Phone is required';
    }
    // else if(!validator.isEmpty(phone)){
    //     errors.phone = 'Please full in'
    // }

    if (!birthday) {
        errors.birthday = 'Birthday is required'
    }

    if (!gender) {
        errors.gender = 'Gender is required'
    }

    // if (!confirmPassword) {
    //   errors.confirmPassword = 'Confirm password is required';
    // } else if (password !== confirmPassword) {
    //   errors.confirmPassword = 'Passwords do not match';
    // }

    return errors;
}
