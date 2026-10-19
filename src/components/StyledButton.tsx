import { Pressable, StyleSheet } from 'react-native';
import { Spinner } from './primitives/Spinner';
import { Text } from './primitives/Text';

interface StyledButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  testID?: string;
}

export function StyledButton({
  label,
  onPress,
  variant = 'primary',
  isLoading = false,
  testID,
}: StyledButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={[styles.base, styles[variant], isLoading && styles.disabled]}
      testID={testID}
    >
      {isLoading ? <Spinner size="small" /> : <Text size="sm" weight="medium" color="#ffffff">{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  primary: { backgroundColor: '#2f2f2f' },
  secondary: {},
  disabled: {},
});
