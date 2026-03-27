import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Calendar, Globe, ChevronRight, ArrowLeft, Camera, ChevronDown, X, Check } from 'lucide-react-native';

const countries = [
  'Select Country',
  'Saudi Arabia',
  'United Arab Emirates',
  'Pakistan',
  'India',
  'Bangladesh',
  'Indonesia',
  'Malaysia',
  'Egypt',
  'Turkey',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Other',
];

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [country, setCountry] = useState('Select Country');
  const [loading, setLoading] = useState(false);
  const [profileImage] = useState<string | null>(null);
  const [showCountryModal, setShowCountryModal] = useState(false);

  const handleComplete = async () => {
    if (!name || !age || country === 'Select Country') {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await updateProfile({
        name,
        age: parseInt(age),
        gender: gender.toLowerCase() as 'male' | 'female',
        country,
      });
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)/home');
  };

  const handleImagePicker = () => {
    Alert.alert(
      'Profile Photo',
      'Profile photo upload will be available in the next update. For now, you can continue without it.',
      [{ text: 'OK' }]
    );
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <LinearGradient
      colors={['#1B5E20', '#2E7D32', '#388E3C']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Back Button */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Setup</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            {/* Profile Image Picker */}
            <TouchableOpacity style={styles.imagePickerContainer} onPress={handleImagePicker}>
              <View style={styles.imagePlaceholder}>
                {profileImage ? (
                  <Text style={styles.imageText}>Image Selected</Text>
                ) : (
                  <>
                    <Camera size={32} color="#666" />
                    <Text style={styles.imageText}>Add Photo</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subtitle}>Help us personalize your experience</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <View style={styles.inputContainer}>
                <User size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age *</Text>
              <View style={styles.inputContainer}>
                <Calendar size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your age"
                  placeholderTextColor="#999"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender *</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[styles.genderButton, gender === 'Male' && styles.genderButtonActive]}
                  onPress={() => setGender('Male')}
                >
                  <Text style={[styles.genderText, gender === 'Male' && styles.genderTextActive]}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderButton, gender === 'Female' && styles.genderButtonActive]}
                  onPress={() => setGender('Female')}
                >
                  <Text style={[styles.genderText, gender === 'Female' && styles.genderTextActive]}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Country *</Text>
              <TouchableOpacity 
                style={styles.countrySelector}
                onPress={() => setShowCountryModal(true)}
              >
                <Globe size={20} color="#666" style={styles.inputIcon} />
                <Text style={[styles.countrySelectorText, country === 'Select Country' && styles.placeholderText]}>
                  {country}
                </Text>
                <ChevronDown size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.completeButton, loading && styles.disabledButton]}
              onPress={handleComplete}
              disabled={loading}
            >
              <Text style={styles.completeButtonText}>Complete Setup</Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {user?.isGuest && (
              <TouchableOpacity 
                style={styles.skipButton}
                onPress={handleSkip}
              >
                <Text style={styles.skipButtonText}>Skip for now</Text>
              </TouchableOpacity>
            )}

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Why we need this information?</Text>
              <Text style={styles.infoText}>
                • Personalized prayer times based on your location{'\n'}
                • Age-appropriate guidance for Hajj and Umrah{'\n'}
                • Gender-specific ritual instructions{'\n'}
                • Country-specific travel tips and regulations
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Country Selection Modal */}
        <Modal
          visible={showCountryModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity 
                onPress={() => setShowCountryModal(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={countries.filter(c => c !== 'Select Country')}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setCountry(item);
                    setShowCountryModal(false);
                  }}
                >
                  <Text style={styles.countryItemText}>{item}</Text>
                  {country === item && (
                    <Check size={20} color="#1B5E20" />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imagePickerContainer: {
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  imageText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F5E9',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  genderButtonActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#1B5E20',
  },
  genderText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  genderTextActive: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  countrySelectorText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  countryItemText: {
    fontSize: 16,
    color: '#333',
  },
  completeButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  skipButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  disabledButton: {
    opacity: 0.6,
  },
  infoBox: {
    backgroundColor: '#F0F7F0',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});