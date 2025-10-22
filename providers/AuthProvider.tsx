import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  age?: number;
  gender?: 'male' | 'female';
  country?: string;
  profilePicture?: string | null;
  isGuest: boolean;
  createdAt: string;
}

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      
      if (storedUser && storedUser.trim() && storedUser !== 'undefined' && storedUser !== 'null') {
        try {
          // Additional validation before parsing
          if (!storedUser.startsWith('{') || !storedUser.endsWith('}')) {
            console.error('Invalid JSON format in user data, clearing');
            await AsyncStorage.removeItem('user');
            setIsLoading(false);
            return;
          }
          
          const parsedUser = JSON.parse(storedUser);
          // Validate user structure
          if (parsedUser && typeof parsedUser === 'object' && parsedUser.id && 
              typeof parsedUser.id === 'string' && parsedUser.id.trim()) {
            // Additional validation of user properties
            const validUser: Partial<UserProfile> = {
              id: parsedUser.id,
              isGuest: typeof parsedUser.isGuest === 'boolean' ? parsedUser.isGuest : false,
              createdAt: typeof parsedUser.createdAt === 'string' ? parsedUser.createdAt : new Date().toISOString()
            };
            
            if (typeof parsedUser.name === 'string' && parsedUser.name.trim()) {
              validUser.name = parsedUser.name;
            } else {
              validUser.name = 'User';
            }
            
            if (typeof parsedUser.email === 'string' && parsedUser.email.trim()) {
              validUser.email = parsedUser.email;
            }
            
            if (typeof parsedUser.age === 'number' && parsedUser.age > 0) {
              validUser.age = parsedUser.age;
            }
            
            if (typeof parsedUser.gender === 'string' && 
                ['male', 'female'].includes(parsedUser.gender)) {
              validUser.gender = parsedUser.gender as 'male' | 'female';
            }
            
            if (typeof parsedUser.country === 'string' && parsedUser.country.trim()) {
              validUser.country = parsedUser.country;
            }
            
            if (typeof parsedUser.profilePicture === 'string' && parsedUser.profilePicture.trim()) {
              validUser.profilePicture = parsedUser.profilePicture;
            }
            
            setUser(validUser as UserProfile);
          } else {
            console.error('Invalid user structure, clearing user data');
            await AsyncStorage.removeItem('user');
          }
        } catch (parseError) {
          console.error('Invalid JSON in user data, clearing:', parseError);
          await AsyncStorage.removeItem('user');
        }
      }
      
      if (hasLaunched && hasLaunched.trim() && hasLaunched !== 'undefined' && hasLaunched !== 'null') {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      // Clear corrupted user data
      try {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('hasLaunched');
      } catch (clearError) {
        console.error('Error clearing corrupted user data:', clearError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    const newUser: UserProfile = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      isGuest: false,
      createdAt: new Date().toISOString(),
    };
    
    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      await AsyncStorage.setItem('hasLaunched', 'true');
      setUser(newUser);
      setIsFirstLaunch(false);
      return newUser;
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    const newUser: UserProfile = {
      id: Date.now().toString(),
      email,
      name,
      isGuest: false,
      createdAt: new Date().toISOString(),
    };
    
    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      await AsyncStorage.setItem('hasLaunched', 'true');
      setUser(newUser);
      setIsFirstLaunch(false);
      return newUser;
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      if (Platform.OS === 'web') {
        // For web, simulate Google login
        const newUser: UserProfile = {
          id: Date.now().toString(),
          email: 'user@gmail.com',
          name: 'Google User',
          isGuest: false,
          createdAt: new Date().toISOString(),
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        await AsyncStorage.setItem('hasLaunched', 'true');
        setUser(newUser);
        setIsFirstLaunch(false);
        return newUser;
      } else {
        // For mobile, use actual Google OAuth (simplified for demo)
        const redirectUri = AuthSession.makeRedirectUri();
        console.log('Google OAuth redirect URI:', redirectUri);
        
        // In a real app, you would configure the AuthRequest properly
        // and handle the OAuth flow
        
        // For demo purposes, we'll simulate a successful Google login
        const newUser: UserProfile = {
          id: Date.now().toString(),
          email: 'user@gmail.com',
          name: 'Google User',
          isGuest: false,
          createdAt: new Date().toISOString(),
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        await AsyncStorage.setItem('hasLaunched', 'true');
        setUser(newUser);
        setIsFirstLaunch(false);
        return newUser;
      }
    } catch (error) {
      console.error('Error with Google sign in:', error);
      throw error;
    }
  }, []);

  const signInAsGuest = useCallback(async () => {
    const newUser: UserProfile = {
      id: Date.now().toString(),
      name: 'Guest',
      isGuest: true,
      createdAt: new Date().toISOString(),
    };
    
    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      await AsyncStorage.setItem('hasLaunched', 'true');
      setUser(newUser);
      setIsFirstLaunch(false);
      return newUser;
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }, [user]);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  }, []);

  return useMemo(() => ({
    user,
    isLoading,
    isFirstLaunch,
    signIn,
    signUp,
    signInWithGoogle,
    signInAsGuest,
    updateProfile,
    signOut,
  }), [user, isLoading, isFirstLaunch, signIn, signUp, signInWithGoogle, signInAsGuest, updateProfile, signOut]);
});