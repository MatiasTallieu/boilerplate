

import {InputField} from "@/components/primitives";
import {StyledButton} from "@/components/StyledButton";
import {router} from "expo-router";
import {useState} from "react";
import {useAuthStore} from "@/state/useAuthStore";
import {AuthLayout} from "@/components/custom/AuthLayout";




export function LoginPage(){


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuthStore();



    const handleLogin = async () => {
        setError('');
        try {
            await login(email, password);
            router.replace('/');
        } catch {
            setError('Login failed. Check your credentials.');
        }
    };

    return (
    <AuthLayout
            linkText="Don't have an account? Sign up"
            linkHref="/signup"
            linkTestID="go-to-signup"
        >
            <InputField label="Email" value={email} onChangeText={setEmail}
                        placeholder="Value" testID="email-input" />
            <InputField label="Password" value={password} onChangeText={setPassword}
                        secureTextEntry placeholder="Value" testID="password-input"
                        error={error !== '' ? error : undefined} />
            <StyledButton label="Sign In" onPress={handleLogin}
                          isLoading={isLoading} testID="login-button" />
        </AuthLayout>
    );
}
