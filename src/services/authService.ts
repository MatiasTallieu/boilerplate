import type { User } from '../types/User';
import {supabase} from "@/uitls/supabase/supabase";


export async function login(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user || !data.session) {
    throw error ?? new Error('Unable to sign in');
  }

  return {
    id: data.user.id,
    email: data.user.email ?? email,
    name: data.user.user_metadata?.name ?? email,
    token: data.session.access_token,
  };
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Logout failed:', error.message);

}
