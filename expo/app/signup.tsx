import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/providers/AuthProvider';
import { Stack } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const colors = {
    background: theme === 'dark' ? '#121212' : '#FFFFFF',
    card: theme === 'dark' ? '#1E1E1E' : '#F5F5F5',
    text: theme === 'dark' ? '#FFFFFF' : '#000000',
    subtext: theme === 'dark' ? '#B0B0B0' : '#666666',
    primary: '#4CAF50',
    border: theme === 'dark' ? '#333333' : '#E0E0E0',
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sign Up',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
              <Text style={[styles.subtitle, { color: colors.subtext }]}>
                Join us on your spiritual journey
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
                <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                  <User size={20} color={colors.subtext} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.subtext}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                  <Mail size={20} color={colors.subtext} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.subtext}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                  <Lock size={20} color={colors.subtext} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Create a password"
                    placeholderTextColor={colors.subtext}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color={colors.subtext} />
                    ) : (
                      <Eye size={20} color={colors.subtext} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Confirm Password</Text>
                <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                  <Lock size={20} color={colors.subtext} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.subtext}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={colors.subtext} />
                    ) : (
                      <Eye size={20} color={colors.subtext} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={[styles.loginText, { color: colors.subtext }]}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={[styles.loginLink, { color: colors.primary }]}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});