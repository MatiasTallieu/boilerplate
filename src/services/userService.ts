import {supabase} from "@/uitls/supabase/supabase";

type responseValidUser = {
    isValid: boolean;
    message?: string;
};


const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export async function validateUser(
    email: string,
    password: string,
    confirmPassword: string
): Promise<responseValidUser> {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
        return { isValid: false, message: 'Enter an email and a password.' };
    }
    if (!isValidEmail(trimmedEmail)) {
        return { isValid: false, message: 'Enter a valid email address.' };
    }
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters.' };
    }
    if (password !== confirmPassword) {
        return { isValid: false, message: 'Passwords do not match.' };
    }
    return { isValid: true };
}




export async function SignUp(email: string, password: string): Promise<void> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('User not created');
  }
}

export const userService = {
    signup: SignUp,
}