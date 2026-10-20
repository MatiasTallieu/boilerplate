import {Redirect, Stack} from 'expo-router';
import {useAuthStore} from "@/state/useAuthStore";

export default function AppLayout() {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Redirect href="/login" />;

  return <Stack />;
}
