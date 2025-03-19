export const loginConst = {
    requiredUser: 'Email is required.',
    requiredPass: 'Password is required.',
    invalidUserAndPass: 'Username and password must be required.',
    invalidCred: 'Invalid credentials. Please try again.',
    invalidUser: 'Invalid email format',
    oldPassword: 'Old Password is required',
    newPassword: 'New Password is required',
    confirmPass: 'Confirm Password is required',
    newConfirmSame: 'New Password and Confirm Password should be same',
    emptyFields: 'Please fill the required fields',
    passLength: 'Password must have 8 character long',
    pass : 'password123',
    wrongPassword  : 'wrongPassword',
    passwordLength : 'Password must have 8 character long',
    invalidEmail : 'Please enter a valid email',
    newPasswordNotValid: 'New Password is invalid',
    confirmPassNotValid: 'Confirm Password is invalid',
}

export const welcomeText = {
    welcomeTo: 'Welcome to',
    theme: 'Middleware',
    // description: 'Middleware offers authentic Indian sweets and snacks, made with the finest ingredients. Indulge in rich flavors and traditional recipes. Taste the joy of India today!'
    description: ''
}

export interface Response {
    message : string
}
