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
        errors.name = 'Tên không được bỏ trống';
    }

    if (!email) {
        errors.email = 'Email không được bỏ trống';
    } else if (!validator.isEmail(email)) {
        errors.email = 'Email không đúng định dạng';
    }

    if (!password) {
        errors.password = 'Mật khẩu không được bỏ trống';
    } else if (!validator.isLength(password, { min: 6 })) {
        errors.password = 'Mật khẩu phải ít nhất 6 ký tự';
    }

    if (!phone) {
        errors.phone = 'Số điện thoại không được bỏ trống';
    }

    if (!birthday) {
        errors.birthday = 'Ngày sinh không được bỏ trống'
    }

    if (!gender) {
        errors.gender = 'Giới tính chưa được chọn'
    }

    return errors;
}
