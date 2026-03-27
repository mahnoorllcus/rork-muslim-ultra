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
import { Lock, Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return;
    }

    if (newPassword === currentPassword) {
      Alert.alert('Error', 'New password must be different from current password');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        'Your password has been changed successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 2000);
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
          title: 'Change Password',
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
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Shield size={40} color={colors.primary} />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>Change Password</Text>
              <Text style={[styles.subtitle, { color: colors.subtext }]}>
                Keep your account secure by updating your password regularly.
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Current Password</Text>
                <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                  <Lock size={20} color={colors.subtext} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter current password"
                    placeholderTextColor={colors.subtext}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry={!showCurrentPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                    {showCurrentPassword ? (
                      <EyeOff size={20} color={colors.subtext} />
                    ) : (
                      <Eye size={20} color={colors.subtext} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>New Password</Text>
                <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                  <Lock size={20} color={colors.subtext} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter new password"
                    placeholderTextColor={colors.subtext}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? (
                      <EyeOff size={20} color={colors.subtext} />
                    ) : (
                      <Eye size={20} color={colors.subtext} />
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={[styles.hint, { color: colors.subtext }]}>
                  Must be at least 6 characters
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Confirm New Password</Text>
                <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                  <Lock size={20} color={colors.subtext} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Confirm new password"
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
                onPress={handleChangePassword}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Update Password</Text>
                )}
              </TouchableOpacity>

              <View style={styles.securityTips}>
                <Text style={[styles.tipsTitle, { color: colors.text }]}>Security Tips:</Text>
                <Text style={[styles.tipText, { color: colors.subtext }]}>
                  • Use a combination of letters, numbers, and symbols
                </Text>
                <Text style={[styles.tipText, { color: colors.subtext }]}>
                  • Avoid using personal information
                </Text>
                <Text style={[styles.tipText, { color: colors.subtext }]}>
                  • Don't reuse passwords from other accounts
                </Text>
                <Text style={[styles.tipText, { color: colors.subtext }]}>
                  • Change your password regularly
                </Text>
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
    marginTop: 20,
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
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
  hint: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  securityTips: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
  },
});