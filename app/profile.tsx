import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit2,
  Save,
  LogOut,
  Camera,
  Lock,
} from "lucide-react-native";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter, Stack } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/providers/ThemeProvider';

export default function ProfileScreen() {
  const { user, updateProfile, signOut } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(user?.profilePicture || null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age?.toString() || "",
    gender: (user?.gender || "male") as "male" | "female",
    country: user?.country || "",
  });

  const themeColors = useTheme();
  const isDarkMode = themeColors.isDark;
  const colors = {
    background: themeColors.colors.background,
    card: themeColors.colors.surface,
    text: themeColors.colors.text,
    subtext: themeColors.colors.textSecondary,
    primary: themeColors.colors.primary,
    border: themeColors.colors.border,
    inputBg: themeColors.colors.inputBg,
    inputDisabled: isDarkMode ? themeColors.colors.surface : '#F5F5F5',
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to upload a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setIsUploadingImage(true);
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      
      // Simulate upload - in production, upload to server
      setTimeout(() => {
        setIsUploadingImage(false);
        Alert.alert('Success', 'Profile picture updated successfully');
      }, 1500);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera permissions to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setIsUploadingImage(true);
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      
      // Simulate upload - in production, upload to server
      setTimeout(() => {
        setIsUploadingImage(false);
        Alert.alert('Success', 'Profile picture updated successfully');
      }, 1500);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    await updateProfile({
      name: formData.name,
      email: formData.email,
      age: formData.age ? parseInt(formData.age) : undefined,
      gender: formData.gender as "male" | "female",
      country: formData.country,
      profilePicture: profileImage,
    });

    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/welcome");
          },
        },
      ]
    );
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const styles = getStyles(colors, isDarkMode, themeColors);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: themeColors.colors.headerBg },
          headerTintColor: themeColors.colors.headerText,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => isEditing ? handleSave() : setIsEditing(true)}
              style={styles.headerButton}
            >
              {isEditing ? (
                <Save size={22} color={themeColors.colors.headerText} />
              ) : (
                <Edit2 size={22} color={themeColors.colors.headerText} />
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={showImageOptions}
              activeOpacity={0.8}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                  <User size={40} color="#FFFFFF" />
                </View>
              )}
              <View style={[styles.cameraButton, { backgroundColor: colors.primary }]}>
                <Camera size={16} color="#FFFFFF" />
              </View>
              {isUploadingImage && (
                <View style={styles.uploadingOverlay}>
                  <ActivityIndicator color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
            <Text style={[styles.userName, { color: colors.text }]}>{user?.name}</Text>
            {user?.isGuest && (
              <View style={styles.guestBadge}>
                <Text style={styles.guestBadgeText}>Guest Account</Text>
              </View>
            )}
          </View>

          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.subtext }]}>Personal Information</Text>
            
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <User size={18} color={colors.primary} />
                <Text style={styles.labelText}>Name</Text>
              </View>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                editable={isEditing}
                placeholder="Enter your name"
                placeholderTextColor={colors.subtext}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Mail size={18} color={colors.primary} />
                <Text style={styles.labelText}>Email</Text>
              </View>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                editable={isEditing && !user?.isGuest}
                placeholder="Enter your email"
                placeholderTextColor={colors.subtext}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Calendar size={18} color={colors.primary} />
                <Text style={styles.labelText}>Age</Text>
              </View>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.age}
                onChangeText={(text) => setFormData({ ...formData, age: text })}
                editable={isEditing}
                placeholder="Enter your age"
                placeholderTextColor={colors.subtext}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <User size={18} color={colors.primary} />
                <Text style={styles.labelText}>Gender</Text>
              </View>
              {isEditing ? (
                <View style={styles.genderContainer}>
                  {genderOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.genderOption,
                        formData.gender === option.value && styles.genderOptionActive,
                      ]}
                      onPress={() => setFormData({ ...formData, gender: option.value as "male" | "female" })}
                    >
                      <Text
                        style={[
                          styles.genderOptionText,
                          formData.gender === option.value && styles.genderOptionTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  value={formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}
                  editable={false}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <MapPin size={18} color={colors.primary} />
                <Text style={styles.labelText}>Country</Text>
              </View>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.country}
                onChangeText={(text) => setFormData({ ...formData, country: text })}
                editable={isEditing}
                placeholder="Enter your country"
                placeholderTextColor={colors.subtext}
              />
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.subtext }]}>Account</Text>
            
            {!user?.isGuest && (
              <TouchableOpacity 
                style={[styles.accountButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push('/change-password')}
              >
                <Lock size={20} color={colors.primary} />
                <Text style={[styles.accountButtonText, { color: colors.text }]}>Change Password</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <LogOut size={20} color={themeColors.colors.error} />
              <Text style={[styles.signOutText, { color: themeColors.colors.error }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Member since {new Date(user?.createdAt || "").toLocaleDateString()}</Text>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const getStyles = (colors: any, isDarkMode: boolean, themeColors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: themeColors.colors.surface,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  guestBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: isDarkMode ? themeColors.colors.warning + "20" : "#FFF3E0",
    borderRadius: 12,
  },
  guestBadgeText: {
    fontSize: 12,
    color: themeColors.colors.warning,
    fontWeight: "600",
  },
  section: {
    marginTop: 20,
    backgroundColor: colors.card,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.subtext,
    marginLeft: 20,
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  inputLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.inputBg,
  },
  inputDisabled: {
    backgroundColor: colors.inputDisabled,
    color: colors.subtext,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 10,
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: colors.inputBg,
  },
  genderOptionActive: {
    backgroundColor: isDarkMode ? colors.primary + "20" : "#E8F5E9",
    borderColor: colors.primary,
  },
  genderOptionText: {
    fontSize: 15,
    color: colors.subtext,
  },
  genderOptionTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  accountButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  accountButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: isDarkMode ? themeColors.colors.error + "30" : "#FFEBEE",
    borderRadius: 8,
    backgroundColor: isDarkMode ? themeColors.colors.error + "20" : "#FFEBEE",
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: colors.subtext,
  },
  headerButton: {
    marginRight: 15,
  },
});