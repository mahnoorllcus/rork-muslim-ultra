export interface Place {
  id: string;
  name: string;
  arabicName?: string;
  city: "makkah" | "madinah";
  category: "core-ritual" | "ziyarat" | "historical";
  description: string;
  fullDescription: string;
  image: string;
  distance: string;
  visitTime: string;
  significance: "essential" | "recommended" | "historical";
  history?: string;
  whatToDo?: string[];
  tips?: string[];
}

// Makkah Places
export const makkahPlaces: Place[] = [
  // Core Ritual Sites
  {
    id: "kaaba",
    name: "The Holy Kaaba",
    arabicName: "الكعبة المشرفة",
    city: "makkah",
    category: "core-ritual",
    description: "The most sacred site in Islam, the House of Allah",
    fullDescription: "The Kaaba is the most sacred site in Islam, located in the center of Masjid al-Haram. Built by Prophet Ibrahim (AS) and his son Ismail (AS), it is the direction (Qibla) Muslims face for prayer worldwide.",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/a8pq81y3u85ibz5465w1k",
    distance: "Center of Haram",
    visitTime: "2-3 hours",
    significance: "essential",
    history: "Built by Prophet Ibrahim (AS) and his son Ismail (AS), the Kaaba has been rebuilt several times throughout history. It houses the Black Stone (Hajar al-Aswad) which was sent from Paradise.",
    whatToDo: [
      "Perform Tawaf (circumambulation)",
      "Try to kiss or touch the Black Stone",
      "Pray facing the Kaaba",
      "Make dua at Multazam (area between Black Stone and door)"
    ],
    tips: [
      "Best time for less crowd is after Fajr and late night",
      "Maintain wudu for Tawaf",
      "Women should avoid perfume and makeup"
    ]
  },
  {
    id: "safa-marwah",
    name: "Safa and Marwah",
    arabicName: "الصفا والمروة",
    city: "makkah",
    category: "core-ritual",
    description: "Two hills where Hajar searched for water, now inside Masjid al-Haram",
    fullDescription: "Two small hills located inside Masjid al-Haram. Pilgrims perform Sa'i (ritual walk) between them, re-enacting the desperate search for water by Hajar (AS) for her son Ismail (AS).",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/t79xsvb0mm365jzc9m8dz",
    distance: "Inside Masjid al-Haram",
    visitTime: "45-60 minutes",
    significance: "essential",
    history: "When Hajar ran between these hills searching for water, Allah sent Angel Jibreel who struck the ground, causing the Zamzam well to spring forth.",
    whatToDo: [
      "Perform Sa'i (7 trips between hills)",
      "Start at Safa, end at Marwah",
      "Make dua at each hill",
      "Men run in green-lit area"
    ],
    tips: [
      "Wheelchairs available for elderly",
      "Upper floor less crowded",
      "Drink Zamzam water after Sa'i"
    ]
  },
  {
    id: "mina",
    name: "Mina",
    arabicName: "منى",
    city: "makkah",
    category: "core-ritual",
    description: "City of Tents where pilgrims stay during Hajj",
    fullDescription: "Known as the 'City of Tents,' this is where pilgrims stay during Hajj from the 8th to the 12th of Dhul Hijjah. It is also the site of the Ramy al-Jamarat (stoning of the pillars).",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/52feakoytqgj9ucefbwfi",
    distance: "5 km from Makkah",
    visitTime: "During Hajj days",
    significance: "essential",
    history: "Prophet Ibrahim (AS) was tempted by Satan three times here, and he stoned him. This is commemorated by stoning the Jamarat.",
    whatToDo: [
      "Stay in tents during Hajj",
      "Stone the Jamarat pillars",
      "Pray in Masjid al-Khayf",
      "Remember Ibrahim's sacrifice"
    ],
    tips: [
      "Only accessible during Hajj for pilgrims",
      "Modern facilities and fire-proof tents",
      "Follow your group leader's instructions"
    ]
  },
  {
    id: "mount-arafat",
    name: "Mount Arafat",
    arabicName: "جبل عرفات",
    city: "makkah",
    category: "core-ritual",
    description: "The most important site of Hajj pilgrimage",
    fullDescription: "The site of the most important ritual of Hajj. Pilgrims gather here on the 9th of Dhul Hijjah to pray, repent, and make supplications. Jabal al-Rahmah (Mountain of Mercy) is where the Prophet (PBUH) delivered his farewell sermon.",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/jn4auu6e7y1o2d9yjezks",
    distance: "20 km from Makkah",
    visitTime: "Full day during Hajj",
    significance: "essential",
    history: "The Prophet (PBUH) said: 'Hajj is Arafat.' Standing here is the essence of Hajj. This is also where Adam and Hawa (AS) reunited after being sent to Earth.",
    whatToDo: [
      "Stand in prayer and supplication",
      "Make extensive dua",
      "Seek forgiveness",
      "Remember the Day of Judgment"
    ],
    tips: [
      "Bring sun protection and water",
      "Stay hydrated throughout the day",
      "Can visit outside Hajj for ziyarat"
    ]
  },
  {
    id: "muzdalifah",
    name: "Muzdalifah",
    arabicName: "مزدلفة",
    city: "makkah",
    category: "core-ritual",
    description: "Open area where pilgrims collect pebbles and spend the night",
    fullDescription: "An open area between Mina and Arafat where pilgrims spend the night under open sky after leaving Arafat and collect pebbles for the Ramy ritual.",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/y24vxn18muxxhilf6kqak",
    distance: "9 km from Makkah",
    visitTime: "Overnight during Hajj",
    significance: "essential",
    history: "Pilgrims combine Maghrib and Isha prayers here and collect 49-70 pebbles for stoning the Jamarat.",
    whatToDo: [
      "Collect pebbles for Jamarat",
      "Spend night under stars",
      "Combine Maghrib and Isha prayers",
      "Make dua and dhikr"
    ],
    tips: [
      "Basic facilities available",
      "Bring mat or sleeping bag",
      "Stay with your group"
    ]
  },
  // Ziyarat Sites in Makkah
  {
    id: "jabal-noor",
    name: "Jabal an-Nour (Cave of Hira)",
    arabicName: "جبل النور - غار حراء",
    city: "makkah",
    category: "ziyarat",
    description: "Mountain of Light where Prophet received first revelation",
    fullDescription: "This mountain houses the famous Cave of Hira where Prophet Muhammad (PBUH) received the first revelation of the Quran from Angel Jibreel (AS). The climb is steep but offers a powerful spiritual connection.",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/et8olrjfkgw5l21qxrjvw",
    distance: "4 km from Haram",
    visitTime: "3-4 hours",
    significance: "historical",
    history: "The Prophet (PBUH) would retreat to this cave for meditation. At age 40, he received the first verses: 'Read in the name of your Lord who created...'",
    whatToDo: [
      "Climb to the cave (600+ steps)",
      "Reflect on the first revelation",
      "Make dua at the cave",
      "Take breaks during climb"
    ],
    tips: [
      "Start early morning or late afternoon",
      "Carry water and wear comfortable shoes",
      "Not mandatory for Hajj or Umrah",
      "Challenging climb - assess fitness level"
    ]
  },
  {
    id: "jabal-thawr",
    name: "Jabal Thawr (Cave Thawr)",
    arabicName: "جبل ثور",
    city: "makkah",
    category: "ziyarat",
    description: "Cave where Prophet and Abu Bakr hid during Hijra",
    fullDescription: "The mountain containing the cave where Prophet Muhammad (PBUH) and Abu Bakr (RA) took refuge from the Quraysh for three days during their migration to Madinah.",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80",
    distance: "8 km from Haram",
    visitTime: "3-4 hours",
    significance: "historical",
    history: "A spider spun its web and a dove made its nest at the entrance, making it appear undisturbed when the Quraysh searched for them.",
    whatToDo: [
      "Climb to the cave (very steep)",
      "Reflect on the Hijra journey",
      "Learn about Tawakkul (trust in Allah)",
      "Make dua"
    ],
    tips: [
      "Very challenging climb",
      "Consider hiring a guide",
      "Not suitable for elderly or unfit",
      "Carry sufficient water"
    ]
  },
  {
    id: "jannat-mualla",
    name: "Jannat al-Mu'alla",
    arabicName: "جنة المعلى",
    city: "makkah",
    category: "ziyarat",
    description: "Ancient cemetery with graves of Prophet's family",
    fullDescription: "One of the oldest cemeteries in Islam where many of the Prophet's ancestors are buried, including his grandfather Abd al-Muttalib, uncle Abu Talib, and first wife Khadijah (RA).",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80",
    distance: "2 km from Haram",
    visitTime: "30-45 minutes",
    significance: "historical",
    history: "This cemetery has been in use since pre-Islamic times and contains graves of many important figures from early Islamic history.",
    whatToDo: [
      "Make dua for the deceased",
      "Recite Surah Fatiha",
      "Remember death and afterlife",
      "Maintain respectful silence"
    ],
    tips: [
      "Check current opening hours",
      "No photography allowed",
      "Dress modestly",
      "Walking distance from Haram"
    ]
  },
  {
    id: "masjid-jinn",
    name: "Masjid al-Jinn",
    arabicName: "مسجد الجن",
    city: "makkah",
    category: "ziyarat",
    description: "Where Jinn gathered to listen to the Prophet recite Quran",
    fullDescription: "A small mosque marking the spot where a group of Jinn gathered to listen to Prophet Muhammad (PBUH) recite the Quran and subsequently accepted Islam.",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/n8ba5c6fxwmmodhegart0",
    distance: "1 km from Haram",
    visitTime: "30 minutes",
    significance: "historical",
    history: "Mentioned in Surah Al-Jinn, this event demonstrates that the Prophet's message was for all of creation, not just humans.",
    whatToDo: [
      "Pray 2 rakah",
      "Recite Surah Al-Jinn",
      "Reflect on the unseen world",
      "Make dua"
    ],
    tips: [
      "Small mosque, quick visit",
      "Walking distance from Haram",
      "Usually quiet and peaceful"
    ]
  },
  {
    id: "birthplace-prophet",
    name: "Birthplace of the Prophet",
    arabicName: "مولد النبي",
    city: "makkah",
    category: "ziyarat",
    description: "Location where Prophet Muhammad (PBUH) was born",
    fullDescription: "The approximate location where Prophet Muhammad (PBUH) was born is now a public library called Maktaba Makkah al-Mukarramah. A place of immense historical importance.",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/lp4uakvj0ayxwe5r5msa0",
    distance: "500m from Haram",
    visitTime: "30 minutes",
    significance: "historical",
    history: "The Prophet was born here on 12th Rabi' al-Awwal in the Year of the Elephant (570 CE) when Abraha's army was destroyed.",
    whatToDo: [
      "Visit the library",
      "Learn about early Islamic history",
      "Reflect on Prophet's life",
      "Make dua"
    ],
    tips: [
      "Now houses Makkah Library",
      "Check opening hours",
      "Walking distance from Haram",
      "Respect the historical significance"
    ]
  },
  {
    id: "masjid-taneem",
    name: "Masjid at-Tan'eem (Masjid Aisha)",
    arabicName: "مسجد التنعيم",
    city: "makkah",
    category: "ziyarat",
    description: "Nearest Miqat to Makkah for entering Ihram",
    fullDescription: "Also known as Masjid Aisha, this is where residents of Makkah and those who want to perform another Umrah go to enter into Ihram.",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=1200&q=80",
    distance: "7.5 km from Haram",
    visitTime: "1 hour",
    significance: "recommended",
    history: "Aisha (RA) entered Ihram here for Umrah after completing Hajj, on the Prophet's instruction.",
    whatToDo: [
      "Enter Ihram for Umrah",
      "Perform ghusl",
      "Pray 2 rakah for Ihram",
      "Make intention for Umrah"
    ],
    tips: [
      "Taxis readily available",
      "Has facilities for Ihram",
      "Open 24 hours",
      "Busiest after Hajj season"
    ]
  }
];

// Madinah Places
export const madinahPlaces: Place[] = [
  // Core Visitation Sites
  {
    id: "masjid-nabawi",
    name: "Al-Masjid an-Nabawi",
    arabicName: "المسجد النبوي",
    city: "madinah",
    category: "core-ritual",
    description: "The Prophet's Mosque, second holiest site in Islam",
    fullDescription: "The second holiest mosque in Islam, built by Prophet Muhammad (PBUH) himself. It contains his tomb alongside Abu Bakr (RA) and Umar (RA), and the blessed Rawdah.",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/eo0ueeltfua22yvrfmfym",
    distance: "City Center",
    visitTime: "2-3 hours",
    significance: "essential",
    history: "Originally built in 622 CE after the Hijra. The Rawdah ash-Sharifah (Noble Garden) is described as 'a garden from the gardens of Paradise' located between the Prophet's tomb and minbar.",
    whatToDo: [
      "Pray in Rawdah (green carpet area)",
      "Visit the Prophet's tomb",
      "Pray 2 rakah Tahiyyat al-Masjid",
      "Visit Jannat al-Baqi cemetery"
    ],
    tips: [
      "Rawdah has specific visiting hours for women",
      "Download Nusuk app for Rawdah permit",
      "Maintain utmost respect and lower voices"
    ]
  },
  {
    id: "jannat-baqi",
    name: "Jannat al-Baqi'",
    arabicName: "جنة البقيع",
    city: "madinah",
    category: "core-ritual",
    description: "Cemetery of the Prophet's family and companions",
    fullDescription: "A large cemetery next to Al-Masjid an-Nabawi, the resting place for thousands of the Prophet's family members and companions.",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80",
    distance: "Adjacent to Masjid Nabawi",
    visitTime: "30-45 minutes",
    significance: "recommended",
    history: "Over 10,000 companions are buried here including Uthman ibn Affan (RA), wives of the Prophet, his daughters including Fatimah (RA), and many prominent Sahaba.",
    whatToDo: [
      "Make dua for the deceased",
      "Recite Surah Fatiha",
      "Remember death and afterlife",
      "Follow cemetery etiquettes"
    ],
    tips: [
      "Check current opening hours",
      "No photography allowed",
      "Maintain silence and respect",
      "Separate timings for women"
    ]
  },
  {
    id: "masjid-quba",
    name: "Masjid Quba",
    arabicName: "مسجد قباء",
    city: "madinah",
    category: "core-ritual",
    description: "First mosque built in Islam",
    fullDescription: "The first mosque ever built in Islam. The Prophet (PBUH) himself laid its first stones. Praying 2 rak'ahs here equals the reward of Umrah.",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/xd0v2nj505g8exhud7sxo",
    distance: "3.5 km from Masjid Nabawi",
    visitTime: "1 hour",
    significance: "recommended",
    history: "Built in 622 CE upon the Prophet's arrival in Madinah. He would visit every Saturday and pray 2 rakah.",
    whatToDo: [
      "Pray 2 rakah nafl prayer",
      "Make wudu from the well",
      "Visit on Saturday following Sunnah",
      "Make dua"
    ],
    tips: [
      "Less crowded in afternoon",
      "Combine with visit to Masjid Qiblatain",
      "Taxi or bus available from Masjid Nabawi",
      "Has parking facilities"
    ]
  },
  {
    id: "masjid-qiblatain",
    name: "Masjid al-Qiblatayn",
    arabicName: "مسجد القبلتين",
    city: "madinah",
    category: "core-ritual",
    description: "Mosque of Two Qiblas where prayer direction changed",
    fullDescription: "The historic site where the congregation was commanded by Allah to change the direction of prayer (Qibla) from Jerusalem to the Kaaba during a prayer.",
    image: "https://images.unsplash.com/photo-1565009520337-2b4afc5e1330?w=1200&q=80",
    distance: "4.5 km from Masjid Nabawi",
    visitTime: "30-45 minutes",
    significance: "historical",
    history: "In 624 CE, during Dhuhr prayer, the Prophet received revelation to turn from Jerusalem to the Kaaba. The congregation turned mid-prayer.",
    whatToDo: [
      "Pray 2 rakah",
      "Reflect on obedience to Allah",
      "Learn about the Qibla change",
      "Visit the renovated mosque"
    ],
    tips: [
      "Recently renovated with modern facilities",
      "Less crowded than other sites",
      "Combine with Masjid Quba visit",
      "Has parking available"
    ]
  },
  // Other Significant Ziyarat Sites
  {
    id: "mount-uhud",
    name: "Mount Uhud",
    arabicName: "جبل أحد",
    city: "madinah",
    category: "ziyarat",
    description: "Site of the Battle of Uhud and martyrs' cemetery",
    fullDescription: "This mountain was the site of the second major battle in Islam. The Prophet (PBUH) said: 'Uhud is a mountain that loves us and we love it.'",
    image: "https://images.unsplash.com/photo-1565009520337-2b4afc5e1330?w=1200&q=80",
    distance: "5 km from Masjid Nabawi",
    visitTime: "2 hours",
    significance: "historical",
    history: "The Battle of Uhud (625 CE) where 70 companions including Hamza ibn Abd al-Muttalib (RA), the Prophet's beloved uncle, were martyred.",
    whatToDo: [
      "Visit the Martyrs' Cemetery",
      "See the archers' hill",
      "Learn battle lessons",
      "Make dua for the martyrs"
    ],
    tips: [
      "Visit morning or evening",
      "Local guides available",
      "Respect the cemetery area",
      "Wear comfortable shoes"
    ]
  },
  {
    id: "seven-mosques",
    name: "The Seven Mosques",
    arabicName: "المساجد السبعة",
    city: "madinah",
    category: "ziyarat",
    description: "Complex of mosques at Battle of Trench site",
    fullDescription: "A complex of six small historical mosques (despite the name) located at the site of the Battle of the Trench (Al-Khandaq).",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80",
    distance: "2 km from Masjid Nabawi",
    visitTime: "1 hour",
    significance: "historical",
    history: "In 627 CE, Muslims dug a trench on Salman al-Farsi's (RA) advice to defend against 10,000 attacking forces. Key mosques include Masjid Al-Fath and Masjid Salman Al-Farsi.",
    whatToDo: [
      "Visit the six mosques",
      "See remnants of the trench",
      "Learn about battle strategy",
      "Pray in the mosques"
    ],
    tips: [
      "Climb provides good city view",
      "Visit in cooler hours",
      "Wear comfortable shoes",
      "Some climbing involved"
    ]
  },
  {
    id: "dar-madinah-museum",
    name: "Dar Al Madinah Museum",
    arabicName: "متحف دار المدينة",
    city: "madinah",
    category: "historical",
    description: "Museum showcasing Madinah's Islamic heritage",
    fullDescription: "A private museum showcasing the history and heritage of Madinah through detailed models and artifacts, providing a visual journey through the city's Islamic past.",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1200&q=80",
    distance: "3 km from Masjid Nabawi",
    visitTime: "1-2 hours",
    significance: "historical",
    history: "Features detailed models of Madinah through different periods, artifacts from Islamic history, and educational exhibits about the Prophet's life.",
    whatToDo: [
      "View historical models",
      "Learn about Madinah's development",
      "See rare artifacts",
      "Take guided tour"
    ],
    tips: [
      "Check opening hours",
      "Entry fee required",
      "Photography may be restricted",
      "Educational for all ages"
    ]
  }
];

// Nearby Historical Sites (accessible from both cities)
export const nearbyPlaces: Place[] = [
  {
    id: "badr",
    name: "Badr",
    arabicName: "بدر",
    city: "madinah",
    category: "historical",
    description: "Site of the first major Muslim victory",
    fullDescription: "Located about 130 km from Madinah, this is the site of the famous Battle of Badr, the first major victory for the Muslims against the Quraysh.",
    image: "https://images.unsplash.com/photo-1540866225557-9e4c58100c67?w=1200&q=80",
    distance: "130 km from Madinah",
    visitTime: "Half day trip",
    significance: "historical",
    history: "The Battle of Badr (624 CE) where 313 Muslims defeated 1000 Quraysh. 14 Muslims were martyred and are buried here.",
    whatToDo: [
      "Visit the battlefield",
      "See martyrs' cemetery",
      "Learn about the battle",
      "Make dua for victory"
    ],
    tips: [
      "Arrange transportation in advance",
      "Combine with other nearby sites",
      "Carry water and snacks",
      "Best as organized tour"
    ]
  },
  {
    id: "hudaibiyah",
    name: "Site of Treaty of Hudaibiyah",
    arabicName: "الحديبية",
    city: "makkah",
    category: "historical",
    description: "Where the pivotal treaty was signed",
    fullDescription: "Located on the old road from Jeddah to Makkah, where the Treaty of Hudaibiyah was signed between the Prophet (PBUH) and the Quraysh.",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80",
    distance: "22 km from Makkah",
    visitTime: "1 hour",
    significance: "historical",
    history: "In 628 CE, this treaty was signed which seemed unfavorable but led to the eventual conquest of Makkah. A mosque, Masjid al-Ridwan, marks the area.",
    whatToDo: [
      "Visit Masjid al-Ridwan",
      "Learn about the treaty",
      "Reflect on divine wisdom",
      "Pray 2 rakah"
    ],
    tips: [
      "On the way to Jeddah",
      "Quick stop possible",
      "Historical marker present",
      "Less visited site"
    ]
  }
];

// Combine all places for backward compatibility
export const places: Place[] = [
  ...makkahPlaces,
  ...madinahPlaces,
  ...nearbyPlaces
];

// Helper function to get places by city
export const getPlacesByCity = (city: "makkah" | "madinah"): Place[] => {
  if (city === "makkah") {
    return makkahPlaces;
  }
  return [...madinahPlaces, ...nearbyPlaces.filter(p => p.city === "madinah")];
};

// Helper function to get places by category
export const getPlacesByCategory = (category: "core-ritual" | "ziyarat" | "historical"): Place[] => {
  return places.filter(p => p.category === category);
};
