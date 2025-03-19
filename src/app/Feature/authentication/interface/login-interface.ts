export class UserLogin {
    email: string = '';
    password: string = '';
}
export class ForgotPassword {
    email?: string = '';
    password?: string = '';
    confirmPass?: string ='';
}
export class ChangePassword {
    oldPassword: string = '';
    newPassword: string = '';
    confirmPass?: string = '';
    userId?:string = '';
}

export class UpdatePassword {
    newPassword?: string;
    userId?:string;
}

export class ApiResponse {
    message?: string = '';
    success?: string = '';
    token?: string = '';
    userId?:number | null ;
    id?:string ='';
    status?:string = '';
}
export class OtpJson {
    otp?: string = '';
}

export class CustomError extends Error {
    customMessage?: string;
    error?: {
        error: string; // This defines a key named 'error' in the object
        [key: string]: any; // This allows for additional properties in the object, if needed
    };
  }
  

  export interface LoginResponse {
    success: boolean;
    message: string;
    userId: number;
  }