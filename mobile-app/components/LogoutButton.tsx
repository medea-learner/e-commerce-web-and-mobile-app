import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useUserStore } from '@/context/UserContext';
import { useRouter } from 'expo-router';

export const LogoutButton = () => {
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(tabs)/login');
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
      <Feather name="log-out" size={18} color="#2563eb" />
    </TouchableOpacity>
  );
};
