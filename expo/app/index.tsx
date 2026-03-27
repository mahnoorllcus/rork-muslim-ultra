import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import LoadingScreen from './loading';

export default function Index() {
  const router = useRouter();
  const { isLoading, isFirstLaunch, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isFirstLaunch) {
        router.replace('/welcome');
      } else if (user) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/welcome');
      }
    }
  }, [isLoading, isFirstLaunch, user, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <LoadingScreen />;
}