import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUserStore } from '@/context/UserContext';
import { LogoutButton } from '@/components/LogoutButton';
import { Feather } from '@expo/vector-icons';
import { ColorValue } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function TabLayout() {
  const user = useUserStore((state) => state.user);

  const headerRight = user ? () => <LogoutButton /> : undefined;
  const headerTitleAlign = user ? 'left' : 'center';

  const iconSize = 18; // slightly smaller than default (usually 24)

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerRight,
            headerTitleAlign,
            tabBarIcon: ({
              color,
              size,
              focused,
            }: {
              color: ColorValue;
              size: number;
              focused: boolean;
            }) => (
              <Feather
                name="home"
                color={focused ? '#2563eb' : color}
                size={iconSize}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            headerRight,
            headerTitleAlign,
            href: user ? undefined : null,
            tabBarIcon: ({
              color,
              size,
              focused,
            }: {
              color: ColorValue;
              size: number;
              focused: boolean;
            }) => (
              <Feather
                name="bar-chart-2"
                color={focused ? '#2563eb' : color}
                size={iconSize}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            headerTitleAlign,
            href: user ? null : undefined,
            tabBarIcon: ({
              color,
              size,
              focused,
            }: {
              color: ColorValue;
              size: number;
              focused: boolean;
            }) => (
              <Feather
                name="log-in"
                color={focused ? '#2563eb' : color}
                size={iconSize}
              />
            ),
          }}
        />

        <Tabs.Screen name="product" options={{ href: null, headerShown: false }} />
      </Tabs>

      <StatusBar style="inverted" />
    </QueryClientProvider>
  );
}
