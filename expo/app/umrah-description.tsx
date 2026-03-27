import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle, MapPin, Plane, Smartphone } from "lucide-react-native";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UmrahDescriptionScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "About Umrah",
          headerStyle: { backgroundColor: "#1B5E20" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#1B5E20", "#2E7D32"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Understanding Umrah</Text>
            <Text style={styles.headerSubtitle}>
              Essential knowledge before your spiritual journey
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* What is Umrah Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CheckCircle size={24} color="#1B5E20" />
              <Text style={styles.sectionTitle}>What is Umrah?</Text>
            </View>
            <Text style={styles.sectionText}>
              Umrah is a voluntary pilgrimage to Makkah that includes entering Ihram, performing Tawaf (seven circuits around the Ka'bah), Sa'y (walking between Safa & Marwah) and then cutting/trimming the hair (Halq/Taqsir). The worship starts with the niyyah (intention) for 'umrah at the Mīqāt (the prescribed boundary) and finishes when the hair is cut. It is a spiritual journey of repentance, remembrance, and supplication.
            </Text>
          </View>

          {/* Preparation Checklist Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Plane size={24} color="#1B5E20" />
              <Text style={styles.sectionTitle}>Necessary before you go — checklist</Text>
            </View>
            
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Travel & ID</Text>
              <Text style={styles.bulletText}>• Passport (valid), Umrah visa (if required), flight & hotel bookings</Text>
              <Text style={styles.bulletText}>• Copies (paper + phone photos) of passport, visa, emergency contacts</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Health & safety</Text>
              <Text style={styles.bulletText}>• Required vaccinations — check current Saudi entry rules before travel</Text>
              <Text style={styles.bulletText}>• Personal medicines, small first-aid kit, hand sanitizer, basic masks</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Clothing & items</Text>
              <Text style={styles.bulletText}>• Men: two white unstitched sheets (izār & riḍā) for Ihram</Text>
              <Text style={styles.bulletText}>• Women: modest loose clothing & hijab (wear what you normally use for prayer)</Text>
              <Text style={styles.bulletText}>• Comfortable sandals, socks (for inside Haram), small travel bag</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Religious aids</Text>
              <Text style={styles.bulletText}>• Small printed/phone dua card with Talbiyah, key duas, and Arabic + transliteration</Text>
              <Text style={styles.bulletText}>• Pocket Qur'an or app, prayer mat (foldable), tasbih (optional)</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Money & phone</Text>
              <Text style={styles.bulletText}>• Local currency / cards, SIM or roaming, power bank</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Preparation</Text>
              <Text style={styles.bulletText}>• Physical readiness: walking practice, hydration, rest</Text>
              <Text style={styles.bulletText}>• Learn the Talbiyah, basic duas and the order of rituals</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Group & guidance</Text>
              <Text style={styles.bulletText}>• Contact info of group/guide or a trusted local number. If alone, plan routes and nearest Miqāt</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Essential Apps & Bookings</Text>
              <Text style={styles.bulletText}>• Download Nusuk app (official Saudi government app) for Umrah permits and appointments</Text>
              <Text style={styles.bulletText}>• Book Umrah permit through Nusuk app before arrival (mandatory for all pilgrims)</Text>
              <Text style={styles.bulletText}>• If planning to visit Madinah, book Rawdah Sharif appointment through Nusuk app</Text>
              <Text style={styles.bulletText}>• Keep digital copies of all bookings and permits on your phone</Text>
            </View>
          </View>

          {/* Nusuk App Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Smartphone size={24} color="#1B5E20" />
              <Text style={styles.sectionTitle}>Nusuk App - Essential for Modern Pilgrimage</Text>
            </View>
            <Text style={styles.sectionText}>
              The Nusuk app is the official Saudi government platform for all pilgrimage services. It's mandatory for obtaining Umrah permits and highly recommended for booking various religious site visits.
            </Text>
            
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Key Features:</Text>
              <Text style={styles.bulletText}>• Umrah permit booking (mandatory for all pilgrims)</Text>
              <Text style={styles.bulletText}>• Rawdah Sharif appointment booking in Madinah</Text>
              <Text style={styles.bulletText}>• Prayer times and Qibla direction</Text>
              <Text style={styles.bulletText}>• Transportation services booking</Text>
              <Text style={styles.bulletText}>• Accommodation recommendations</Text>
              <Text style={styles.bulletText}>• Real-time crowd information at holy sites</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Important Notes:</Text>
              <Text style={styles.bulletText}>• Download and register before your trip</Text>
              <Text style={styles.bulletText}>• Umrah permits are free but must be booked in advance</Text>
              <Text style={styles.bulletText}>• Available in multiple languages including English</Text>
              <Text style={styles.bulletText}>• Requires valid passport information for registration</Text>
            </View>
          </View>

          {/* Miqat Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin size={24} color="#1B5E20" />
              <Text style={styles.sectionTitle}>Quick note — what is the Mīqāt?</Text>
            </View>
            <Text style={styles.sectionText}>
              Mīqāt = prescribed boundary where one must assume Ihram and make intention for Hajj/Umrah. Major Mīqāts: Dhul Hulaifah, Al-Juhfah, Qarn al-Manāzil (as-Sayl), Yalamlam, Dhat Irq. Air travelers should put on Ihram before crossing the Miqāt — pilots/crew normally announce it.
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.back()}
          >
            <LinearGradient
              colors={["#1B5E20", "#2E7D32"]}
              style={styles.actionGradient}
            >
              <Text style={styles.actionButtonText}>Continue to Steps</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E8F5E9",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginLeft: 10,
    flex: 1,
  },
  sectionText: {
    fontSize: 14,
    color: "#444444",
    lineHeight: 22,
  },
  subsection: {
    marginBottom: 15,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 14,
    color: "#444444",
    lineHeight: 20,
    marginBottom: 4,
  },
  actionButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 10,
  },
  actionGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});