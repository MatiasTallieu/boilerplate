import {useState} from "react";
import {useAuthStore} from "@/state/useAuthStore";
import {userService, validateUser} from "@/services/userService";
import {sleep} from "@supabase/auth-js/src/lib/helpers";
import {router} from "expo-router";
import {StyleSheet, Text} from "react-native";
import {InputField} from "@/components/primitives";
import {StyledButton} from "@/components/StyledButton";
import {AuthLayout} from "@/components/custom/AuthLayout";

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const { isLoading } = useAuthStore();

    const handleSignUp = async () => {
        setError('');
        setInfo('');

        validateUser(email, password, confirmPassword).then(async (validationResult) => {
            if (!validationResult.isValid) {
                setError(validationResult.message || 'Invalid input.');
                return;
            }

            try {
                await userService.signup(email.trim(), password);
                await sleep(2000);
                router.replace('/login');
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Sign up failed. Try again.');
            }
        });

    };

    return (
        <AuthLayout
            linkText="Already have an account? Sign in"
            linkHref="/login"
            linkTestID="go-to-login"
        >
            <InputField label="Email" value={email} onChangeText={setEmail}
                        placeholder="Value" testID="email-input" />
            <InputField label="Password" value={password} onChangeText={setPassword}
                        secureTextEntry placeholder="Value" testID="password-input" />
            <InputField label="Confirm password" value={confirmPassword}
                        onChangeText={setConfirmPassword} secureTextEntry placeholder="Value"
                        testID="confirm-password-input"
                        error={error !== '' ? error : undefined} />
            {info !== '' && <Text style={styles.info}>{info}</Text>}
            <StyledButton label="Sign Up" onPress={handleSignUp}
                          isLoading={isLoading} testID="signup-button" />
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    info: {fontSize: 14, color: '#2e7d32', marginBottom: 12},
});