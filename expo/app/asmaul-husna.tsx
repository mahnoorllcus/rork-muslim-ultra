import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Search, Heart } from 'lucide-react-native';

interface Name {
  id: number;
  arabic: string;
  transliteration: string;
  meaning: string;
}

const asmaulHusna: Name[] = [
  { id: 1, arabic: 'الرَّحْمَنُ', transliteration: 'Ar-Rahman', meaning: 'The Most Gracious' },
  { id: 2, arabic: 'الرَّحِيمُ', transliteration: 'Ar-Raheem', meaning: 'The Most Merciful' },
  { id: 3, arabic: 'الْمَلِكُ', transliteration: 'Al-Malik', meaning: 'The King' },
  { id: 4, arabic: 'الْقُدُّوسُ', transliteration: 'Al-Quddus', meaning: 'The Most Holy' },
  { id: 5, arabic: 'السَّلاَمُ', transliteration: 'As-Salaam', meaning: 'The Source of Peace' },
  { id: 6, arabic: 'الْمُؤْمِنُ', transliteration: 'Al-Mu\'min', meaning: 'The Guardian of Faith' },
  { id: 7, arabic: 'الْمُهَيْمِنُ', transliteration: 'Al-Muhaymin', meaning: 'The Protector' },
  { id: 8, arabic: 'الْعَزِيزُ', transliteration: 'Al-Aziz', meaning: 'The Mighty' },
  { id: 9, arabic: 'الْجَبَّارُ', transliteration: 'Al-Jabbar', meaning: 'The Compeller' },
  { id: 10, arabic: 'الْمُتَكَبِّرُ', transliteration: 'Al-Mutakabbir', meaning: 'The Supreme' },
  { id: 11, arabic: 'الْخَالِقُ', transliteration: 'Al-Khaliq', meaning: 'The Creator' },
  { id: 12, arabic: 'الْبَارِئُ', transliteration: 'Al-Bari', meaning: 'The Maker' },
  { id: 13, arabic: 'الْمُصَوِّرُ', transliteration: 'Al-Musawwir', meaning: 'The Fashioner' },
  { id: 14, arabic: 'الْغَفَّارُ', transliteration: 'Al-Ghaffar', meaning: 'The Great Forgiver' },
  { id: 15, arabic: 'الْقَهَّارُ', transliteration: 'Al-Qahhar', meaning: 'The Subduer' },
  { id: 16, arabic: 'الْوَهَّابُ', transliteration: 'Al-Wahhab', meaning: 'The Bestower' },
  { id: 17, arabic: 'الرَّزَّاقُ', transliteration: 'Ar-Razzaq', meaning: 'The Provider' },
  { id: 18, arabic: 'الْفَتَّاحُ', transliteration: 'Al-Fattah', meaning: 'The Opener' },
  { id: 19, arabic: 'اَلْعَلِيْمُ', transliteration: 'Al-Aleem', meaning: 'The All-Knowing' },
  { id: 20, arabic: 'الْقَابِضُ', transliteration: 'Al-Qabid', meaning: 'The Constrictor' },
  { id: 21, arabic: 'الْبَاسِطُ', transliteration: 'Al-Basit', meaning: 'The Expander' },
  { id: 22, arabic: 'الْخَافِضُ', transliteration: 'Al-Khafid', meaning: 'The Abaser' },
  { id: 23, arabic: 'الرَّافِعُ', transliteration: 'Ar-Rafi', meaning: 'The Exalter' },
  { id: 24, arabic: 'الْمُعِزُّ', transliteration: 'Al-Mu\'izz', meaning: 'The Honorer' },
  { id: 25, arabic: 'الْمُذِلُّ', transliteration: 'Al-Mudhill', meaning: 'The Humiliator' },
  { id: 26, arabic: 'السَّمِيعُ', transliteration: 'As-Samee', meaning: 'The All-Hearing' },
  { id: 27, arabic: 'الْبَصِيرُ', transliteration: 'Al-Baseer', meaning: 'The All-Seeing' },
  { id: 28, arabic: 'الْحَكَمُ', transliteration: 'Al-Hakam', meaning: 'The Judge' },
  { id: 29, arabic: 'الْعَدْلُ', transliteration: 'Al-Adl', meaning: 'The Just' },
  { id: 30, arabic: 'اللَّطِيفُ', transliteration: 'Al-Lateef', meaning: 'The Subtle One' },
  { id: 31, arabic: 'الْخَبِيرُ', transliteration: 'Al-Khabeer', meaning: 'The Aware' },
  { id: 32, arabic: 'الْحَلِيمُ', transliteration: 'Al-Haleem', meaning: 'The Forbearing' },
  { id: 33, arabic: 'الْعَظِيمُ', transliteration: 'Al-Azeem', meaning: 'The Magnificent' },
  { id: 34, arabic: 'الْغَفُورُ', transliteration: 'Al-Ghafoor', meaning: 'The Forgiving' },
  { id: 35, arabic: 'الشَّكُورُ', transliteration: 'Ash-Shakoor', meaning: 'The Appreciative' },
  { id: 36, arabic: 'الْعَلِيُّ', transliteration: 'Al-Ali', meaning: 'The Most High' },
  { id: 37, arabic: 'الْكَبِيرُ', transliteration: 'Al-Kabeer', meaning: 'The Most Great' },
  { id: 38, arabic: 'الْحَفِيظُ', transliteration: 'Al-Hafiz', meaning: 'The Preserver' },
  { id: 39, arabic: 'المقيت', transliteration: 'Al-Muqeet', meaning: 'The Nourisher' },
  { id: 40, arabic: 'الْحسِيبُ', transliteration: 'Al-Haseeb', meaning: 'The Reckoner' },
  { id: 41, arabic: 'الْجَلِيلُ', transliteration: 'Al-Jaleel', meaning: 'The Majestic' },
  { id: 42, arabic: 'الْكَرِيمُ', transliteration: 'Al-Kareem', meaning: 'The Generous' },
  { id: 43, arabic: 'الرَّقِيبُ', transliteration: 'Ar-Raqeeb', meaning: 'The Watchful' },
  { id: 44, arabic: 'الْمُجِيبُ', transliteration: 'Al-Mujeeb', meaning: 'The Responsive' },
  { id: 45, arabic: 'الْوَاسِعُ', transliteration: 'Al-Wasi', meaning: 'The All-Encompassing' },
  { id: 46, arabic: 'الْحَكِيمُ', transliteration: 'Al-Hakeem', meaning: 'The Wise' },
  { id: 47, arabic: 'الْوَدُودُ', transliteration: 'Al-Wadood', meaning: 'The Loving' },
  { id: 48, arabic: 'الْمَجِيدُ', transliteration: 'Al-Majeed', meaning: 'The Glorious' },
  { id: 49, arabic: 'الْبَاعِثُ', transliteration: 'Al-Ba\'ith', meaning: 'The Resurrector' },
  { id: 50, arabic: 'الشَّهِيدُ', transliteration: 'Ash-Shaheed', meaning: 'The Witness' },
  { id: 51, arabic: 'الْحَقُّ', transliteration: 'Al-Haqq', meaning: 'The Truth' },
  { id: 52, arabic: 'الْوَكِيلُ', transliteration: 'Al-Wakeel', meaning: 'The Trustee' },
  { id: 53, arabic: 'الْقَوِيُّ', transliteration: 'Al-Qawiyy', meaning: 'The Strong' },
  { id: 54, arabic: 'الْمَتِينُ', transliteration: 'Al-Mateen', meaning: 'The Firm' },
  { id: 55, arabic: 'الْوَلِيُّ', transliteration: 'Al-Waliyy', meaning: 'The Friend' },
  { id: 56, arabic: 'الْحَمِيدُ', transliteration: 'Al-Hameed', meaning: 'The Praiseworthy' },
  { id: 57, arabic: 'الْمُحْصِي', transliteration: 'Al-Muhsi', meaning: 'The Counter' },
  { id: 58, arabic: 'الْمُبْدِئُ', transliteration: 'Al-Mubdi', meaning: 'The Originator' },
  { id: 59, arabic: 'الْمُعِيدُ', transliteration: 'Al-Mu\'eed', meaning: 'The Restorer' },
  { id: 60, arabic: 'الْمُحْيِي', transliteration: 'Al-Muhyi', meaning: 'The Giver of Life' },
  { id: 61, arabic: 'اَلْمُمِيتُ', transliteration: 'Al-Mumeet', meaning: 'The Taker of Life' },
  { id: 62, arabic: 'الْحَيُّ', transliteration: 'Al-Hayy', meaning: 'The Living' },
  { id: 63, arabic: 'الْقَيُّومُ', transliteration: 'Al-Qayyoom', meaning: 'The Self-Existing' },
  { id: 64, arabic: 'الْوَاجِدُ', transliteration: 'Al-Wajid', meaning: 'The Finder' },
  { id: 65, arabic: 'الْمَاجِدُ', transliteration: 'Al-Majid', meaning: 'The Noble' },
  { id: 66, arabic: 'الْواحِدُ', transliteration: 'Al-Wahid', meaning: 'The Unique' },
  { id: 67, arabic: 'اَلاَحَدُ', transliteration: 'Al-Ahad', meaning: 'The One' },
  { id: 68, arabic: 'الصَّمَدُ', transliteration: 'As-Samad', meaning: 'The Eternal' },
  { id: 69, arabic: 'الْقَادِرُ', transliteration: 'Al-Qadir', meaning: 'The Capable' },
  { id: 70, arabic: 'الْمُقْتَدِرُ', transliteration: 'Al-Muqtadir', meaning: 'The Powerful' },
  { id: 71, arabic: 'الْمُقَدِّمُ', transliteration: 'Al-Muqaddim', meaning: 'The Expediter' },
  { id: 72, arabic: 'الْمُؤَخِّرُ', transliteration: 'Al-Mu\'akhkhir', meaning: 'The Delayer' },
  { id: 73, arabic: 'الأوَّلُ', transliteration: 'Al-Awwal', meaning: 'The First' },
  { id: 74, arabic: 'الآخِرُ', transliteration: 'Al-Akhir', meaning: 'The Last' },
  { id: 75, arabic: 'الظَّاهِرُ', transliteration: 'Az-Zahir', meaning: 'The Manifest' },
  { id: 76, arabic: 'الْبَاطِنُ', transliteration: 'Al-Batin', meaning: 'The Hidden' },
  { id: 77, arabic: 'الْوَالِي', transliteration: 'Al-Wali', meaning: 'The Governor' },
  { id: 78, arabic: 'الْمُتَعَالِي', transliteration: 'Al-Muta\'ali', meaning: 'The Most Exalted' },
  { id: 79, arabic: 'الْبَرُّ', transliteration: 'Al-Barr', meaning: 'The Source of Goodness' },
  { id: 80, arabic: 'التَّوَابُ', transliteration: 'At-Tawwab', meaning: 'The Acceptor of Repentance' },
  { id: 81, arabic: 'الْمُنْتَقِمُ', transliteration: 'Al-Muntaqim', meaning: 'The Avenger' },
  { id: 82, arabic: 'العَفُوُّ', transliteration: 'Al-Afuww', meaning: 'The Pardoner' },
  { id: 83, arabic: 'الرَّؤُوفُ', transliteration: 'Ar-Ra\'oof', meaning: 'The Compassionate' },
  { id: 84, arabic: 'مَالِكُ الْمُلْكِ', transliteration: 'Malik-ul-Mulk', meaning: 'Master of the Kingdom' },
  { id: 85, arabic: 'ذُوالْجَلاَلِ وَالإكْرَامِ', transliteration: 'Dhul-Jalali wal-Ikram', meaning: 'Lord of Majesty and Bounty' },
  { id: 86, arabic: 'الْمُقْسِطُ', transliteration: 'Al-Muqsit', meaning: 'The Equitable' },
  { id: 87, arabic: 'الْجَامِعُ', transliteration: 'Al-Jami', meaning: 'The Gatherer' },
  { id: 88, arabic: 'الْغَنِيُّ', transliteration: 'Al-Ghani', meaning: 'The Self-Sufficient' },
  { id: 89, arabic: 'الْمُغْنِي', transliteration: 'Al-Mughni', meaning: 'The Enricher' },
  { id: 90, arabic: 'اَلْمَانِعُ', transliteration: 'Al-Mani', meaning: 'The Preventer' },
  { id: 91, arabic: 'الضَّارَّ', transliteration: 'Ad-Darr', meaning: 'The Distresser' },
  { id: 92, arabic: 'النَّافِعُ', transliteration: 'An-Nafi', meaning: 'The Benefiter' },
  { id: 93, arabic: 'النُّورُ', transliteration: 'An-Nur', meaning: 'The Light' },
  { id: 94, arabic: 'الْهَادِي', transliteration: 'Al-Hadi', meaning: 'The Guide' },
  { id: 95, arabic: 'الْبَدِيعُ', transliteration: 'Al-Badi', meaning: 'The Incomparable' },
  { id: 96, arabic: 'اَلْبَاقِي', transliteration: 'Al-Baqi', meaning: 'The Everlasting' },
  { id: 97, arabic: 'الْوَارِثُ', transliteration: 'Al-Warith', meaning: 'The Inheritor' },
  { id: 98, arabic: 'الرَّشِيدُ', transliteration: 'Ar-Rasheed', meaning: 'The Guide to Right Path' },
  { id: 99, arabic: 'الصَّبُورُ', transliteration: 'As-Saboor', meaning: 'The Patient' }
];

export default function AsmaulHusnaScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const filteredNames = asmaulHusna.filter(name => 
    name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.arabic.includes(searchQuery)
  );

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const renderNameCard = (name: Name) => (
    <View key={name.id} style={styles.nameCard}>
      <View style={styles.nameHeader}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{name.id}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => toggleFavorite(name.id)}
          style={styles.favoriteButton}
        >
          <Heart 
            size={20} 
            color={favorites.has(name.id) ? '#e74c3c' : '#bdc3c7'}
            fill={favorites.has(name.id) ? '#e74c3c' : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.arabicText}>{name.arabic}</Text>
      <Text style={styles.transliteration}>{name.transliteration}</Text>
      <Text style={styles.meaning}>{name.meaning}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Asmaul Husna',
          headerStyle: { backgroundColor: '#2c3e50' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' as const }
        }} 
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>أَسْمَاءُ ٱللَّٰهِ ٱلْحُسْنَىٰ</Text>
        <Text style={styles.subtitle}>The 99 Beautiful Names of Allah</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#7f8c8d" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search names..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#95a5a6"
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.namesGrid}>
          {filteredNames.map(renderNameCard)}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            &ldquo;And to Allah belong the best names, so invoke Him by them.&rdquo;
          </Text>
          <Text style={styles.footerReference}>- Quran 7:180</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    backgroundColor: '#2c3e50',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  searchIcon: {
    marginRight: 12
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 20
  },
  namesGrid: {
    paddingHorizontal: 16
  },
  nameCard: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  nameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  numberContainer: {
    backgroundColor: '#3498db',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold' as const
  },
  favoriteButton: {
    padding: 4
  },
  arabicText: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 40
  },
  transliteration: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#3498db',
    textAlign: 'center',
    marginBottom: 6
  },
  meaning: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic' as const
  },
  footer: {
    marginTop: 30,
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    fontStyle: 'italic' as const,
    marginBottom: 8
  },
  footerReference: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '600' as const
  }
});