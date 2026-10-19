import { TextInput, View, StyleSheet } from 'react-native';
import { Text } from './Text';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  testID?: string;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  testID,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text size="sm" weight="medium">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[styles.input, error !== undefined && styles.inputError]}
        testID={testID}
        autoCapitalize="none"
      />
      {error !== undefined && <Text size="sm" color="red">{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    marginTop: 7,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#333333',
    fontSize: 14,
  },
  inputError: {
    borderColor: '#c0392b',
  },
});
