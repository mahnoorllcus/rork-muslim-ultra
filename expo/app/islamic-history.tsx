import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Book,
  Star,
  Users,
  Crown,
  Heart,
  ChevronRight,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";



interface HistorySection {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  content: HistoryItem[];
}

interface HistoryItem {
  id: string;
  title: string;
  period?: string;
  description: string;
  keyPoints: string[];
  lessons: string[];
}

const historySections: HistorySection[] = [
  {
    id: "prophets",
    title: "Stories of Prophets",
    subtitle: "From Adam (AS) to Muhammad (SAW)",
    icon: Star,
    color: "#4CAF50",
    content: [
      {
        id: "adam",
        title: "Prophet Adam (AS)",
        period: "First Human & Prophet",
        description: "Allah created Adam (AS) as the first human and prophet. He was created from clay and given knowledge of all names. When Allah commanded the angels to prostrate to Adam, all obeyed except Iblis (Satan) who refused out of arrogance.",
        keyPoints: [
          "First human created by Allah",
          "Given knowledge of all names",
          "Father of all humanity",
          "First to seek Allah's forgiveness"
        ],
        lessons: [
          "Importance of seeking forgiveness (Tawbah)",
          "Humility before Allah",
          "Knowledge is a blessing from Allah",
          "Beware of Satan's whispers"
        ]
      },
      {
        id: "ibrahim",
        title: "Prophet Ibrahim (AS)",
        period: "Friend of Allah (Khalilullah)",
        description: "Ibrahim (AS) was chosen as Allah's friend. He broke the idols of his people, was thrown into fire but saved by Allah, and was tested with sacrificing his son Ismail (AS). He built the Kaaba with Ismail.",
        keyPoints: [
          "Called Khalilullah (Friend of Allah)",
          "Destroyed idols and called to Tawheed",
          "Saved from Nimrod's fire",
          "Built the Kaaba with Ismail (AS)",
          "Willing to sacrifice his son for Allah"
        ],
        lessons: [
          "Complete submission to Allah",
          "Courage in calling to truth",
          "Trust in Allah's protection",
          "Importance of Tawheed (Monotheism)"
        ]
      },
      {
        id: "musa",
        title: "Prophet Musa (AS)",
        period: "Kalimullah (One who spoke to Allah)",
        description: "Musa (AS) was sent to Pharaoh and the Children of Israel. He performed miracles, led the Israelites out of Egypt, received the Torah, and spoke directly to Allah on Mount Sinai.",
        keyPoints: [
          "Spoke directly to Allah (Kalimullah)",
          "Confronted Pharaoh with miracles",
          "Led Israelites out of Egypt",
          "Received the Torah",
          "Split the Red Sea"
        ],
        lessons: [
          "Stand against oppression",
          "Trust in Allah's help",
          "Patience in adversity",
          "Follow divine guidance"
        ]
      },
      {
        id: "isa",
        title: "Prophet Isa (AS)",
        period: "Ruhullah (Spirit of Allah)",
        description: "Isa (AS) was born miraculously to Maryam (AS). He spoke in the cradle, performed miracles by Allah's permission, and called the Children of Israel to worship Allah alone. He was raised to heaven and will return before the Day of Judgment.",
        keyPoints: [
          "Born miraculously to Maryam (AS)",
          "Spoke in the cradle as a baby",
          "Performed miracles by Allah's permission",
          "Called to worship Allah alone",
          "Raised to heaven alive",
          "Will return before Day of Judgment"
        ],
        lessons: [
          "Allah's power over all creation",
          "Importance of pure monotheism",
          "Miracles are signs from Allah",
          "Truth will always prevail"
        ]
      },
      {
        id: "muhammad",
        title: "Prophet Muhammad (SAW)",
        period: "Seal of Prophets (Khatam an-Nabiyyin)",
        description: "Muhammad (SAW) is the final messenger sent to all humanity. He received the Quran, established the Muslim community, and completed the message of Islam. He is the best example for all mankind.",
        keyPoints: [
          "Final messenger to all humanity",
          "Received the Quran over 23 years",
          "Known as As-Sadiq Al-Amin (Truthful & Trustworthy)",
          "Established the first Muslim state in Madinah",
          "Completed the religion of Islam"
        ],
        lessons: [
          "Follow the Sunnah (his example)",
          "Importance of good character",
          "Patience in calling to Islam",
          "Justice and mercy in leadership"
        ]
      }
    ]
  },
  {
    id: "companions",
    title: "Noble Companions",
    subtitle: "The Sahaba (RA) - Best Generation",
    icon: Users,
    color: "#FF9800",
    content: [
      {
        id: "abu-bakr",
        title: "Abu Bakr As-Siddiq (RA)",
        period: "First Caliph (632-634 CE)",
        description: "The closest companion of Prophet Muhammad (SAW) and the first Caliph. Known for his unwavering faith and immediate belief in the Prophet's night journey (Isra and Mi'raj).",
        keyPoints: [
          "First man to accept Islam",
          "Closest friend of the Prophet (SAW)",
          "Called As-Siddiq (The Truthful)",
          "First Caliph after Prophet's death",
          "Compiled the Quran into one book"
        ],
        lessons: [
          "Importance of sincere friendship",
          "Immediate acceptance of truth",
          "Leadership through service",
          "Preserving Islamic knowledge"
        ]
      },
      {
        id: "umar",
        title: "Umar ibn Al-Khattab (RA)",
        period: "Second Caliph (634-644 CE)",
        description: "Known as Al-Faruq (The Criterion between right and wrong). His conversion strengthened Islam, and his just rule expanded the Islamic state significantly.",
        keyPoints: [
          "Called Al-Faruq (The Criterion)",
          "His conversion strengthened Islam",
          "Established many Islamic institutions",
          "Conquered Jerusalem peacefully",
          "Known for justice and simplicity"
        ],
        lessons: [
          "Justice is the foundation of leadership",
          "Humility despite power",
          "Accountability to Allah and people",
          "Strength in faith transforms character"
        ]
      },
      {
        id: "uthman",
        title: "Uthman ibn Affan (RA)",
        period: "Third Caliph (644-656 CE)",
        description: "Known as Dhun-Nurayn (Possessor of Two Lights) for marrying two daughters of the Prophet. He standardized the Quran and was known for his generosity.",
        keyPoints: [
          "Called Dhun-Nurayn (Two Lights)",
          "Married two daughters of Prophet (SAW)",
          "Standardized the Quranic text",
          "Extremely generous and charitable",
          "Expanded the Islamic state further"
        ],
        lessons: [
          "Generosity and charity",
          "Preserving religious texts",
          "Patience in face of trials",
          "Honor comes through righteousness"
        ]
      },
      {
        id: "ali",
        title: "Ali ibn Abi Talib (RA)",
        period: "Fourth Caliph (656-661 CE)",
        description: "Cousin and son-in-law of Prophet Muhammad (SAW). Known for his knowledge, bravery, and eloquence. The first young person to accept Islam.",
        keyPoints: [
          "Cousin and son-in-law of Prophet (SAW)",
          "First young person to accept Islam",
          "Known for knowledge and wisdom",
          "Brave warrior and just ruler",
          "Father of Hasan and Husayn (RA)"
        ],
        lessons: [
          "Seek knowledge throughout life",
          "Courage in defending truth",
          "Justice even with enemies",
          "Early acceptance of guidance"
        ]
      }
    ]
  },
  {
    id: "caliphates",
    title: "Islamic Caliphates",
    subtitle: "Expansion and Golden Age",
    icon: Crown,
    color: "#9C27B0",
    content: [
      {
        id: "rashidun",
        title: "Rashidun Caliphate",
        period: "632-661 CE",
        description: "The first four Caliphs (Abu Bakr, Umar, Uthman, Ali) who were directly guided by the Prophet's teachings. This period is considered the golden standard of Islamic governance.",
        keyPoints: [
          "Rule of the four Rightly-Guided Caliphs",
          "Expansion into Syria, Egypt, Persia",
          "Establishment of Islamic institutions",
          "Compilation and preservation of Quran",
          "Justice and consultation in governance"
        ],
        lessons: [
          "Leadership through consultation (Shura)",
          "Justice for all regardless of status",
          "Expansion through good character",
          "Preserving religious knowledge"
        ]
      },
      {
        id: "umayyad",
        title: "Umayyad Caliphate",
        period: "661-750 CE",
        description: "Established by Muawiya (RA), it was the largest empire in history at its peak, stretching from Spain to Central Asia. Damascus was the capital.",
        keyPoints: [
          "Capital in Damascus, Syria",
          "Largest empire in history at its peak",
          "Expansion into Spain and Central Asia",
          "Development of Islamic architecture",
          "Arabic became administrative language"
        ],
        lessons: [
          "Importance of unity in diversity",
          "Spreading knowledge and culture",
          "Building lasting institutions",
          "Balancing expansion with governance"
        ]
      },
      {
        id: "abbasid",
        title: "Abbasid Caliphate",
        period: "750-1258 CE",
        description: "Known as the Golden Age of Islam. Baghdad became the center of learning, translation, and scientific advancement. Scholars from all backgrounds contributed to knowledge.",
        keyPoints: [
          "Capital in Baghdad, Iraq",
          "Golden Age of Islamic civilization",
          "House of Wisdom (Bayt al-Hikma)",
          "Translation movement of Greek texts",
          "Advances in science, medicine, mathematics"
        ],
        lessons: [
          "Value of seeking knowledge",
          "Learning from all sources",
          "Supporting scholars and education",
          "Building centers of learning"
        ]
      }
    ]
  },
  {
    id: "scholars",
    title: "Great Islamic Scholars",
    subtitle: "Preservers of Knowledge",
    icon: Book,
    color: "#2196F3",
    content: [
      {
        id: "bukhari",
        title: "Imam Al-Bukhari",
        period: "810-870 CE",
        description: "Compiled Sahih Al-Bukhari, considered the most authentic collection of Hadith after the Quran. He traveled extensively to collect and verify Hadith.",
        keyPoints: [
          "Compiled Sahih Al-Bukhari",
          "Traveled to collect authentic Hadith",
          "Strict criteria for Hadith authentication",
          "Memorized over 600,000 Hadith",
          "Dedicated his life to preserving Sunnah"
        ],
        lessons: [
          "Dedication to preserving truth",
          "Importance of authentic sources",
          "Traveling for knowledge",
          "Rigorous verification methods"
        ]
      },
      {
        id: "ghazali",
        title: "Imam Al-Ghazali",
        period: "1058-1111 CE",
        description: "Known as Hujjat al-Islam (Proof of Islam). He revived Islamic sciences and wrote 'Ihya Ulum al-Din' (Revival of Religious Sciences), bridging Islamic law and spirituality.",
        keyPoints: [
          "Called Hujjat al-Islam (Proof of Islam)",
          "Wrote Ihya Ulum al-Din",
          "Bridged Islamic law and spirituality",
          "Refuted philosophical errors",
          "Emphasized purification of the soul"
        ],
        lessons: [
          "Balance between knowledge and spirituality",
          "Importance of inner purification",
          "Defending Islamic beliefs",
          "Comprehensive understanding of Islam"
        ]
      },
      {
        id: "ibn-taymiyyah",
        title: "Ibn Taymiyyah",
        period: "1263-1328 CE",
        description: "A scholar who emphasized returning to the Quran and Sunnah. He fought against innovations in religion and wrote extensively on Islamic theology and jurisprudence.",
        keyPoints: [
          "Emphasized Quran and Sunnah",
          "Fought against religious innovations",
          "Wrote on theology and jurisprudence",
          "Defended Islamic monotheism",
          "Influenced Islamic reform movements"
        ],
        lessons: [
          "Return to authentic sources",
          "Reject innovations in religion",
          "Courage in defending truth",
          "Comprehensive Islamic knowledge"
        ]
      }
    ]
  }
];

export default function IslamicHistoryScreen() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const handleSectionPress = (sectionId: string) => {
    setSelectedSection(selectedSection === sectionId ? null : sectionId);
    setSelectedItem(null);
  };

  const handleItemPress = (item: HistoryItem) => {
    if (!item?.id?.trim()) return;
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  const renderSection = (section: HistorySection) => {
    const Icon = section.icon;
    const isExpanded = selectedSection === section.id;

    return (
      <View key={section.id} style={styles.sectionContainer}>
        <TouchableOpacity
          style={[styles.sectionHeader, { borderLeftColor: section.color }]}
          onPress={() => handleSectionPress(section.id)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionHeaderLeft}>
            <View style={[styles.sectionIcon, { backgroundColor: section.color + '20' }]}>
              <Icon size={24} color={section.color} />
            </View>
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
          </View>
          <ChevronRight
            size={20}
            color="#666"
            style={[styles.chevron, isExpanded && styles.chevronRotated]}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.sectionContent}>
            {section.content.map((item) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.itemHeader}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.period && (
                      <Text style={styles.itemPeriod}>{item.period}</Text>
                    )}
                  </View>
                  <ChevronRight
                    size={16}
                    color="#999"
                    style={[
                      styles.itemChevron,
                      selectedItem?.id === item.id && styles.chevronRotated
                    ]}
                  />
                </TouchableOpacity>

                {selectedItem?.id === item.id && (
                  <View style={styles.itemContent}>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    
                    <View style={styles.pointsSection}>
                      <Text style={styles.pointsTitle}>Key Points:</Text>
                      {item.keyPoints.map((point, pointIndex) => (
                        <Text key={`key-${item.id}-${pointIndex}`} style={styles.pointText}>• {point}</Text>
                      ))}
                    </View>

                    <View style={styles.pointsSection}>
                      <Text style={styles.pointsTitle}>Lessons:</Text>
                      {item.lessons.map((lesson, lessonIndex) => (
                        <Text key={`lesson-${item.id}-${lessonIndex}`} style={styles.pointText}>• {lesson}</Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Islamic History",
          headerStyle: { backgroundColor: "#1B5E20" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Islamic History</Text>
            <Text style={styles.headerSubtitle}>
              Learn from the stories of Prophets, Companions, and great scholars
            </Text>
          </View>

          <View style={styles.content}>
            {historySections.map(renderSection)}
          </View>

          <View style={styles.footer}>
            <View style={styles.footerCard}>
              <Heart size={20} color="#1B5E20" />
              <Text style={styles.footerText}>
                &ldquo;The best of people are those who benefit others&rdquo;
              </Text>
              <Text style={styles.footerSource}>- Prophet Muhammad (SAW)</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  content: {
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderLeftWidth: 4,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  chevron: {
    transform: [{ rotate: "0deg" }],
  },
  chevronRotated: {
    transform: [{ rotate: "90deg" }],
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8F8",
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  itemPeriod: {
    fontSize: 12,
    color: "#1B5E20",
    marginTop: 2,
  },
  itemChevron: {
    transform: [{ rotate: "0deg" }],
  },
  itemContent: {
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  itemDescription: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 16,
  },
  pointsSection: {
    marginBottom: 16,
  },
  pointsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 8,
  },
  pointText: {
    fontSize: 13,
    color: "#555555",
    lineHeight: 18,
    marginBottom: 4,
  },
  footer: {
    padding: 16,
  },
  footerCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footerText: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 8,
  },
  footerSource: {
    fontSize: 12,
    color: "#1B5E20",
    marginTop: 4,
    fontWeight: "500",
  },
});