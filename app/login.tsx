import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/state/useAuthStore';
import { InputField } from '@/components/primitives/InputField';
import { StyledButton } from '@/components/StyledButton';

export default function LoginScreen() {
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
    <View style={styles.container}>
      <View style={styles.panel}>
        <Image
            source={require('../public/PillzLogo.png')}
            style={styles.logoPlaceholder}
            resizeMode="contain"
            accessibilityLabel="Pillz logo"
        />
        <View style={styles.form}>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Value"
            testID="email-input"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Value"
            testID="password-input"
            error={error !== '' ? error : undefined}
          />
          <StyledButton
            label="Sign In"
            onPress={handleLogin}
            isLoading={isLoading}
            testID="login-button"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  panel: {
    width: '100%',
    maxWidth: 420,
    minHeight: 560,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 32,
    alignItems: 'center',
    paddingTop: 58,
    paddingBottom: 42,
  },
  logoPlaceholder: {
    width: 105,
    height: 105,
    marginBottom: 12,
  },
  form: {
    width: '86%',
    maxWidth: 360,
    marginTop: 48,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 18,
  },
});
