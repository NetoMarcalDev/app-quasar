/* eslint-disable padded-blocks */
/* eslint-disable semi */
import { ref } from 'vue';
import useSupabase from 'src/boot/supabase';

const user = ref(null);

export default function useAuthUser () {
  const { supabase } = useSupabase();

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error
    return user;
  }

  const loginWithSocialProivider = async (provider) => {
    const { user, error } = await supabase.auth.signInWithPassword({ provider });
    if (error) throw error
    return user;
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

  }

  const isLoggedIn = () => {
    return !!user.value;
  }

  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
      }
    )
    if (error) throw error
    return user;
  }

  const update = async (data) => {
    const { user, error } = await supabase.auth.updateUser(data);
    if (error) throw error;
    return user;
  }

  const sendPasswordResetEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return user;
  }

  const resetPassword = async (newPasswor) => {
    const { user, error } = await supabase.auth.updateUser(
      { password: newPasswor }
    )
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProivider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword
  }

}
