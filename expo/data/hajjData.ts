export interface HajjDay {
  id: string;
  dayNumber: string;
  title: string;
  date: string;
  location: string;
  activities: string[];
  detailedActivities: {
    time: string;
    title: string;
    description: string;
    dua?: {
      arabic: string;
      translation: string;
      transliteration?: string;
    };
    practicalTips?: string[];
    commonMistakes?: string[];
  }[];
  importantNotes?: string[];
  preparationTips?: string[];
  whatToBring?: string[];
  timelineOverview?: string;
}

export const hajjDays: HajjDay[] = [
  {
    id: "day1",
    dayNumber: "1",
    title: "Day of Tarwiyah (Day of Quenching Thirst)",
    date: "8th Dhul Hijjah",
    location: "Makkah to Mina",
    timelineOverview: "A day of preparation and spiritual readiness. Pilgrims enter Ihram, travel to Mina, and spend the day in worship preparing for the most important day of Hajj.",
    activities: [
      "Enter Ihram for Hajj (if not already in Ihram)",
      "Recite Talbiyah continuously",
      "Proceed to Mina before or after Dhuhr",
      "Pray 5 prayers in Mina (shortened but not combined)",
      "Engage in dhikr, Quran recitation, and dua",
      "Rest and prepare for Day of Arafah"
    ],
    detailedActivities: [
      {
        time: "Early Morning (After Fajr)",
        title: "Preparation and Ihram",
        description: "If not already in Ihram, perform ghusl (ritual bath), apply perfume (before wearing Ihram), and put on the two white unstitched cloths for men. Women can wear any modest clothing. Make the intention (niyyah) for Hajj and begin reciting Talbiyah.",
        dua: {
          arabic: "لَبَّيْكَ اللَّهُمَّ حَجًّا",
          translation: "Here I am O Allah, (intending) Hajj",
          transliteration: "Labbayka Allahumma Hajjan"
        },
        practicalTips: [
          "Take a shower and trim nails before entering Ihram",
          "Apply perfume to body (not clothes) before wearing Ihram",
          "Ensure Ihram is properly worn - upper cloth covers left shoulder",
          "Keep reciting Talbiyah loudly (men) or quietly (women)"
        ],
        commonMistakes: [
          "Applying perfume after wearing Ihram",
          "Covering the head (men) or face/hands (women)",
          "Not making proper intention for Hajj",
          "Stopping Talbiyah recitation"
        ]
      },
      {
        time: "Mid-Morning (9:00 AM - 11:00 AM)",
        title: "Journey to Mina",
        description: "Travel to Mina, approximately 8km northeast of Makkah. The journey can take 1-3 hours depending on transportation method and crowds. Mina is known as the 'City of Tents' where millions of pilgrims stay.",
        practicalTips: [
          "Travel light - bring only essentials for 3 days",
          "Keep your group together and know your tent number",
          "Bring plenty of water and some snacks",
          "Use Makkah Metro if available - it's faster than buses",
          "Continue reciting Talbiyah during the journey"
        ],
        commonMistakes: [
          "Bringing too much luggage",
          "Not knowing tent location or group details",
          "Stopping dhikr and Talbiyah during travel",
          "Getting separated from the group"
        ]
      },
      {
        time: "Dhuhr (12:30 PM)",
        title: "First Prayer in Mina",
        description: "Pray Dhuhr prayer shortened (2 rakats instead of 4) but not combined with Asr. This is the Sunnah of the Prophet (PBUH) in Mina. Prayers are led by the imam in your area.",
        practicalTips: [
          "Prayers are shortened but prayed at their proper times",
          "Find the nearest mosque or prayer area in your section",
          "If you miss congregation, pray individually",
          "Face Qiblah direction (towards Kaaba)"
        ]
      },
      {
        time: "Afternoon (2:00 PM - 6:00 PM)",
        title: "Spiritual Preparation and Rest",
        description: "Spend time in worship, reading Quran, making dua, and resting. This is a day of spiritual preparation for the Day of Arafah. Engage in dhikr and seek forgiveness from Allah.",
        dua: {
          arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          translation: "There is no deity except Allah alone, He has no partner. His is the dominion and His is the praise, and He is capable of all things.",
          transliteration: "La ilaha illa Allah wahdahu la sharika lah, lahu al-mulku wa lahu al-hamdu wa huwa 'ala kulli shay'in qadir"
        },
        practicalTips: [
          "Rest well - tomorrow will be physically demanding",
          "Drink plenty of water to stay hydrated",
          "Organize your belongings for easy access",
          "Prepare mentally for the Day of Arafah",
          "Make dua for yourself, family, and the Ummah"
        ]
      },
      {
        time: "Asr (3:30 PM)",
        title: "Asr Prayer",
        description: "Pray Asr prayer shortened (2 rakats) at its proper time. Continue with dhikr and Quran recitation."
      },
      {
        time: "Evening (6:00 PM - 8:00 PM)",
        title: "Maghrib Prayer and Iftar",
        description: "Pray Maghrib prayer (3 rakats - not shortened) and break your fast if you're fasting. Many pilgrims fast on this blessed day.",
        practicalTips: [
          "Maghrib prayer is not shortened",
          "If fasting, break fast with dates and water",
          "Eat light, nutritious meals",
          "Prepare for early morning departure to Arafah"
        ]
      },
      {
        time: "Night (8:00 PM - 11:00 PM)",
        title: "Isha Prayer and Night Worship",
        description: "Pray Isha prayer shortened (2 rakats). Spend the night in worship, but ensure you get adequate rest for tomorrow's journey to Arafah.",
        practicalTips: [
          "Sleep early to wake up fresh for Fajr",
          "Keep your belongings organized for quick departure",
          "Set multiple alarms for Fajr prayer",
          "Make final preparations for Arafah journey"
        ]
      }
    ],
    importantNotes: [
      "All prayers in Mina are shortened but NOT combined",
      "This day is called Tarwiyah because pilgrims used to carry water for the journey",
      "No specific rituals required - focus on worship and preparation",
      "Prepare mentally and spiritually for the Day of Arafah",
      "Stay hydrated and rest well for tomorrow's long day"
    ],
    preparationTips: [
      "Pack light for 3 days in Mina",
      "Bring comfortable walking shoes",
      "Carry a small prayer mat",
      "Keep important documents and money secure",
      "Learn your tent number and group leader contact"
    ],
    whatToBring: [
      "Ihram clothing (if not already wearing)",
      "Prayer mat and Quran",
      "Water bottle and light snacks",
      "Medications and first aid items",
      "Comfortable sandals",
      "Small bag for personal items",
      "Phone charger and power bank"
    ]
  },
  {
    id: "day2",
    dayNumber: "2",
    title: "Day of Arafah (The Most Sacred Day)",
    date: "9th Dhul Hijjah",
    location: "Mina to Arafah to Muzdalifah",
    timelineOverview: "The most important day of Hajj. Pilgrims travel to Arafah for the essential ritual of Wuquf (standing), then proceed to Muzdalifah for the night. This day determines the validity of the entire Hajj.",
    activities: [
      "Pray Fajr in Mina and prepare for departure",
      "Travel to Arafah after sunrise (preferably after sunrise)",
      "Perform Wuquf (Standing) at Arafah from noon to sunset",
      "Combine and shorten Dhuhr and Asr prayers",
      "Engage in intensive dua and dhikr",
      "Depart to Muzdalifah immediately after sunset",
      "Pray Maghrib and Isha combined in Muzdalifah",
      "Collect pebbles for tomorrow's stoning",
      "Rest under the open sky"
    ],
    detailedActivities: [
      {
        time: "Fajr (5:00 AM - 6:00 AM)",
        title: "Final Preparations in Mina",
        description: "Pray Fajr prayer in Mina. Pack your belongings and prepare for the journey to Arafah. This will be the most spiritually significant day of your life.",
        practicalTips: [
          "Pack light - bring only essentials for the day",
          "Bring plenty of water and some food",
          "Wear comfortable shoes for walking",
          "Keep your group together and know meeting points",
          "Charge your phone and bring power bank"
        ],
        commonMistakes: [
          "Bringing too much luggage to Arafah",
          "Not bringing enough water",
          "Leaving without group coordination",
          "Forgetting essential medications"
        ]
      },
      {
        time: "After Sunrise (6:30 AM - 10:00 AM)",
        title: "Journey to Arafah",
        description: "Travel from Mina to Arafah (approximately 14km). The journey can take 2-4 hours due to crowds. Continue reciting Talbiyah throughout the journey. The Prophet (PBUH) departed after sunrise.",
        dua: {
          arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
          translation: "Here I am O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace and dominion belong to You. You have no partner.",
          transliteration: "Labbayka Allahumma labbayk, labbayka la sharika laka labbayk, inna al-hamda wa'n-ni'mata laka wa'l-mulk, la sharika lak"
        },
        practicalTips: [
          "Start journey early to avoid extreme heat",
          "Use Makkah Metro if available - it's faster",
          "Stay with your group and follow your guide",
          "Keep reciting Talbiyah loudly (men) or quietly (women)",
          "Make dua during the journey"
        ],
        commonMistakes: [
          "Stopping Talbiyah recitation during travel",
          "Getting separated from the group",
          "Not staying hydrated during the journey",
          "Rushing or pushing in crowds"
        ]
      },
      {
        time: "Morning in Arafah (10:00 AM - 12:00 PM)",
        title: "Arrival and Settling in Arafah",
        description: "Upon arrival in Arafah, find your designated area. The entire plain of Arafah is sacred - you can stand anywhere within its boundaries. Prepare for the most important ritual of Hajj.",
        practicalTips: [
          "Any location within Arafah boundaries is valid",
          "Find shade if possible, but standing in sun is also fine",
          "Set up your spot and organize your belongings",
          "Locate the nearest facilities (toilets, water)",
          "Begin preparing mentally for intensive worship"
        ]
      },
      {
        time: "Dhuhr Time (12:30 PM)",
        title: "Combined Dhuhr and Asr Prayers",
        description: "Pray Dhuhr and Asr prayers combined and shortened (2+2 rakats) at Dhuhr time. This is the Sunnah in Arafah. After prayers, begin the most intensive period of dua and worship.",
        practicalTips: [
          "Prayers are both shortened and combined",
          "Pray with the congregation if possible",
          "If you miss congregation, pray individually",
          "After prayers, focus entirely on dua and dhikr"
        ]
      },
      {
        time: "Afternoon - The Heart of Hajj (12:30 PM - 6:00 PM)",
        title: "Wuquf (Standing) at Arafah - The Essence of Hajj",
        description: "This is the most crucial time of Hajj. Stand in Arafah, raise your hands, and make sincere dua. Ask for forgiveness, pray for yourself, your family, and the entire Ummah. The Prophet (PBUH) said: 'Hajj is Arafah.'",
        dua: {
          arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          translation: "There is no deity except Allah alone, He has no partner. His is the dominion and His is the praise. He gives life and causes death, and He is capable of all things.",
          transliteration: "La ilaha illa Allah wahdahu la sharika lah, lahu al-mulku wa lahu al-hamd, yuhyi wa yumit, wa huwa 'ala kulli shay'in qadir"
        },
        practicalTips: [
          "Face the Qiblah (direction of Kaaba) when making dua",
          "Raise your hands in supplication",
          "Make dua in any language - Allah understands all",
          "Alternate between dua, dhikr, and reading Quran",
          "Cry if you feel moved - tears of repentance are blessed",
          "Stay hydrated and take breaks when needed",
          "Include prayers for the entire Muslim Ummah"
        ],
        commonMistakes: [
          "Spending time in activities other than worship",
          "Not making enough personal dua",
          "Leaving Arafah before sunset",
          "Not staying hydrated in the heat",
          "Focusing on photography instead of worship"
        ]
      },
      {
        time: "Just Before Sunset (5:30 PM - 6:00 PM)",
        title: "Final Moments in Arafah",
        description: "These are the most blessed moments. Intensify your dua as the sun begins to set. The Prophet (PBUH) made his most fervent supplications at this time. Do not leave until the sun has completely set.",
        dua: {
          arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          translation: "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.",
          transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar"
        },
        practicalTips: [
          "Do not leave Arafah until sunset - this invalidates Hajj",
          "Make your most sincere and heartfelt duas",
          "Ask Allah for forgiveness for all your sins",
          "Prepare for departure immediately after sunset"
        ]
      },
      {
        time: "After Sunset (6:00 PM - 8:00 PM)",
        title: "Departure to Muzdalifah",
        description: "Immediately after sunset, begin the journey to Muzdalifah. Move calmly and with dignity - do not rush. The journey is about 9km and can take 2-4 hours due to crowds.",
        practicalTips: [
          "Leave immediately after sunset - do not delay",
          "Move calmly and avoid rushing or pushing",
          "Continue dhikr and Talbiyah during the journey",
          "Stay with your group",
          "Be patient with the crowds and traffic"
        ],
        commonMistakes: [
          "Leaving before sunset (invalidates Hajj)",
          "Rushing and pushing in crowds",
          "Getting separated from the group",
          "Stopping dhikr during the journey"
        ]
      },
      {
        time: "Arrival in Muzdalifah (8:00 PM - 10:00 PM)",
        title: "Maghrib and Isha Prayers Combined",
        description: "Upon arrival in Muzdalifah, pray Maghrib (3 rakats) and Isha (2 rakats shortened) combined. Then collect 49-70 small pebbles for tomorrow's stoning ritual.",
        practicalTips: [
          "Pray Maghrib and Isha together upon arrival",
          "Collect pebbles the size of chickpeas or dates",
          "Collect extra pebbles in case some are lost",
          "Any stones from Muzdalifah area are acceptable",
          "No need to wash the pebbles"
        ],
        commonMistakes: [
          "Collecting pebbles that are too large or too small",
          "Not collecting enough pebbles",
          "Praying Maghrib and Isha separately",
          "Collecting pebbles from outside Muzdalifah"
        ]
      },
      {
        time: "Night in Muzdalifah (10:00 PM - 5:00 AM)",
        title: "Rest Under the Open Sky",
        description: "Spend the night in Muzdalifah under the open sky. This is a Sunnah. Rest, but also engage in dhikr and prepare for tomorrow's activities. The night can be cold, so dress warmly.",
        practicalTips: [
          "Sleep under the open sky if possible (Sunnah)",
          "Bring warm clothing - nights can be cold",
          "Use a sleeping bag or blanket",
          "Continue dhikr and dua when awake",
          "Prepare for early departure to Mina"
        ]
      }
    ],
    importantNotes: [
      "Standing in Arafah from noon to sunset is the ESSENCE of Hajj",
      "Missing any part of this time period invalidates the entire Hajj",
      "The Prophet (PBUH) said: 'Hajj is Arafah'",
      "This is the best day for dua and seeking Allah's forgiveness",
      "Allah descends to the lowest heaven and boasts about the pilgrims to the angels",
      "More people are freed from Hell on this day than any other",
      "Do not leave Arafah before sunset - this nullifies your Hajj"
    ],
    preparationTips: [
      "Prepare a list of duas and people to pray for",
      "Bring a small Quran or dua book",
      "Wear comfortable, loose clothing",
      "Bring sun protection (hat, umbrella)",
      "Prepare mentally for intensive worship"
    ],
    whatToBring: [
      "Plenty of water (at least 3-4 liters)",
      "Light snacks and dates",
      "Prayer mat and Quran",
      "Umbrella or hat for sun protection",
      "Warm clothing for Muzdalifah night",
      "Small bag for collecting pebbles",
      "Tissues and wet wipes",
      "Any necessary medications"
    ]
  },
  {
    id: "day3",
    dayNumber: "3",
    title: "Day of Eid al-Adha (Yawm an-Nahr - Day of Sacrifice)",
    date: "10th Dhul Hijjah",
    location: "Muzdalifah to Mina to Makkah",
    timelineOverview: "The busiest day of Hajj with four major rituals. Pilgrims stone the largest Jamarat, sacrifice an animal, cut their hair, and perform Tawaf al-Ifadah. This marks the beginning of Eid celebrations.",
    activities: [
      "Pray Fajr in Muzdalifah and depart early",
      "Stone Jamarat al-Aqabah (the largest pillar)",
      "Perform animal sacrifice (Qurbani)",
      "Shave or trim hair (Halq or Taqsir)",
      "Partially exit Ihram state",
      "Travel to Makkah for Tawaf al-Ifadah",
      "Perform Sa'i (if not done during Umrah)",
      "Return to Mina for the night"
    ],
    detailedActivities: [
      {
        time: "Fajr in Muzdalifah (5:00 AM - 6:00 AM)",
        title: "Final Moments in Muzdalifah",
        description: "Pray Fajr prayer in Muzdalifah. Make dua facing the Qiblah as the Prophet (PBUH) did. Collect any remaining pebbles if needed, then prepare for departure to Mina.",
        dua: {
          arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
          translation: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
          transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik"
        },
        practicalTips: [
          "Depart early to avoid crowds at Jamarat",
          "Keep your pebbles secure and easily accessible",
          "Stay with your group during the journey",
          "Weak individuals can leave after midnight (allowed)"
        ]
      },
      {
        time: "Early Morning (6:00 AM - 10:00 AM)",
        title: "Journey to Mina and Stoning Preparation",
        description: "Travel from Muzdalifah back to Mina (about 4km). Head directly to the Jamarat area for the stoning ritual. The area will be very crowded, so patience and caution are essential.",
        practicalTips: [
          "Go directly to Jamarat area upon arrival",
          "Follow crowd control measures and designated routes",
          "Be patient - crowds will be at their peak",
          "Keep your pebbles ready (7 for today)",
          "Stay hydrated and take breaks if needed"
        ],
        commonMistakes: [
          "Going to tent first instead of Jamarat",
          "Not following designated routes",
          "Rushing or pushing in crowds",
          "Forgetting to bring pebbles"
        ]
      },
      {
        time: "Morning (7:00 AM - 12:00 PM)",
        title: "Stoning Jamarat al-Aqabah (Ramy al-Jamarat)",
        description: "Throw 7 pebbles at Jamarat al-Aqabah (the largest pillar representing Satan). Say 'Allahu Akbar' with each throw. This symbolizes Ibrahim's rejection of Satan's temptation. After this, stop reciting Talbiyah.",
        dua: {
          arabic: "اللَّهُ أَكْبَرُ",
          translation: "Allah is the Greatest",
          transliteration: "Allahu Akbar"
        },
        practicalTips: [
          "Throw pebbles one by one, not all at once",
          "Aim for the pillar, not necessarily the basin",
          "Say 'Allahu Akbar' with each throw",
          "Don't push or fight for position",
          "After stoning, STOP reciting Talbiyah",
          "No dua after stoning this pillar (unlike other days)"
        ],
        commonMistakes: [
          "Throwing all pebbles at once",
          "Continuing Talbiyah after stoning",
          "Fighting or pushing for better position",
          "Using large stones or shoes",
          "Making dua after stoning this pillar"
        ]
      },
      {
        time: "After Stoning (10:00 AM - 2:00 PM)",
        title: "Animal Sacrifice (Qurbani/Hady)",
        description: "Arrange for the sacrifice of an animal (sheep, goat, cow, or camel). This can be done through vouchers purchased beforehand. The sacrifice commemorates Ibrahim's willingness to sacrifice his son Ismail.",
        practicalTips: [
          "Use pre-purchased vouchers for convenience",
          "Sacrifice can be done on your behalf",
          "Ensure the animal meets Islamic requirements",
          "This can be done anytime during the 3 days of Eid",
          "The meat is distributed to the poor"
        ],
        commonMistakes: [
          "Not arranging sacrifice beforehand",
          "Trying to do it personally in crowded conditions",
          "Using animals that don't meet requirements",
          "Delaying beyond the allowed time"
        ]
      },
      {
        time: "After Sacrifice (11:00 AM - 3:00 PM)",
        title: "Hair Cutting (Halq or Taqsir)",
        description: "Men should shave their heads completely (Halq - preferred) or trim hair from all over the head (Taqsir). Women should trim about an inch from the ends of their hair. This marks partial exit from Ihram.",
        practicalTips: [
          "Men: Complete shaving (Halq) is preferred over trimming",
          "Women: Trim about 2-3 cm from hair ends",
          "Use clean, sharp tools",
          "Can be done at designated areas or barber shops",
          "After this, most Ihram restrictions are lifted"
        ],
        commonMistakes: [
          "Men trimming instead of shaving (though permissible)",
          "Women cutting too much hair",
          "Not cutting from all parts of the head",
          "Using unclean tools"
        ]
      },
      {
        time: "After Hair Cutting (12:00 PM onwards)",
        title: "Partial Exit from Ihram (Tahallul al-Asghar)",
        description: "After cutting hair, you have partially exited Ihram. You can now wear normal clothes, use perfume, trim nails, and engage in all normal activities except marital relations. Change into regular clothes and celebrate Eid!",
        practicalTips: [
          "Change into your regular clothes",
          "You can now use perfume and trim nails",
          "All restrictions lifted except marital relations",
          "Take a shower and freshen up",
          "Congratulate fellow pilgrims - it's Eid!"
        ]
      },
      {
        time: "Afternoon/Evening (2:00 PM - 8:00 PM)",
        title: "Tawaf al-Ifadah (Tawaf of Hajj)",
        description: "Travel to Makkah to perform Tawaf al-Ifadah, the most important Tawaf of Hajj. Perform 7 circuits around the Kaaba. If you haven't done Sa'i yet, perform it after this Tawaf. This completes your exit from Ihram.",
        dua: {
          arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          translation: "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.",
          transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar"
        },
        practicalTips: [
          "This Tawaf is obligatory and cannot be missed",
          "Can be performed anytime, but best done today",
          "Perform Sa'i if you haven't done it during Umrah",
          "After this Tawaf, all Ihram restrictions are lifted",
          "Try to kiss or touch the Black Stone if possible",
          "Drink Zamzam water after Tawaf"
        ],
        commonMistakes: [
          "Delaying this Tawaf unnecessarily",
          "Not performing Sa'i when required",
          "Rushing through the Tawaf",
          "Not making dua during Tawaf"
        ]
      },
      {
        time: "Evening (6:00 PM - 10:00 PM)",
        title: "Return to Mina and Eid Celebrations",
        description: "Return to Mina to spend the night. Celebrate Eid al-Adha with fellow pilgrims. Engage in dhikr, make dua, and prepare for the remaining days in Mina.",
        practicalTips: [
          "Must return to Mina for the night",
          "Celebrate Eid with gratitude and joy",
          "Share food and greetings with other pilgrims",
          "Rest well for tomorrow's stoning",
          "Reflect on the day's accomplishments"
        ]
      }
    ],
    importantNotes: [
      "These 4 rituals can be performed in any order, but the sequence above is preferred",
      "After hair cutting: all Ihram restrictions lifted except marital relations",
      "After Tawaf al-Ifadah: ALL Ihram restrictions are completely lifted",
      "This is the first day of Eid al-Adha - celebrate with gratitude",
      "The stoning, sacrifice, and hair cutting must be done on this day or the following days",
      "Tawaf al-Ifadah can be delayed but should not be postponed unnecessarily"
    ],
    preparationTips: [
      "Arrange sacrifice vouchers beforehand",
      "Know the location of barber shops in Mina",
      "Plan your route to avoid crowds",
      "Bring regular clothes for after hair cutting",
      "Prepare for a long, busy day"
    ],
    whatToBring: [
      "7 pebbles for stoning",
      "Sacrifice voucher or arrangement",
      "Regular clothes to change into",
      "Money for barber and transportation",
      "Water and light snacks",
      "Prayer mat for Tawaf area",
      "Patience and positive attitude!"
    ]
  },
  {
    id: "day4",
    dayNumber: "4-5",
    title: "Days of Tashreeq (Days of Drying Meat)",
    date: "11th-12th Dhul Hijjah",
    location: "Mina",
    timelineOverview: "The final ritual days of Hajj. Pilgrims stone all three Jamarat daily, stay in Mina, and engage in worship. These are days of celebration, eating, drinking, and remembering Allah. Pilgrims can choose to leave on the 12th or stay for the 13th.",
    activities: [
      "Stone all three Jamarat after midday (21 pebbles total)",
      "Make dua after stoning the first two pillars",
      "Stay in Mina for the nights",
      "Engage in dhikr and worship",
      "Celebrate and socialize with fellow pilgrims",
      "Complete any missed rituals",
      "Decide whether to leave on 12th or stay for 13th"
    ],
    detailedActivities: [
      {
        time: "Morning (8:00 AM - 12:00 PM)",
        title: "Rest and Preparation",
        description: "Rest from yesterday's activities. Organize your belongings, perform regular prayers, and prepare for the afternoon stoning. These are blessed days, so engage in worship and reflection.",
        practicalTips: [
          "Rest and recover from the busy previous day",
          "Organize pebbles for stoning (21 needed each day)",
          "Plan your route to Jamarat to avoid crowds",
          "Eat well and stay hydrated",
          "Engage in dhikr and Quran recitation"
        ]
      },
      {
        time: "After Zawwal/Midday (12:30 PM onwards)",
        title: "Stoning All Three Jamarat",
        description: "After the sun passes its zenith (Zawwal), stone all three Jamarat in sequence: Jamarat as-Sughra (smallest), Jamarat al-Wusta (middle), and Jamarat al-Aqabah (largest). Throw 7 pebbles at each pillar.",
        dua: {
          arabic: "اللَّهُ أَكْبَرُ",
          translation: "Allah is the Greatest",
          transliteration: "Allahu Akbar"
        },
        practicalTips: [
          "Start only after Zawwal (sun passes zenith) - around 12:30 PM",
          "Stone in sequence: Small → Medium → Large",
          "Throw 7 pebbles at each pillar (21 total)",
          "Say 'Allahu Akbar' with each throw",
          "Take your time - no need to rush",
          "Use the multi-level Jamarat bridge to avoid crowds"
        ],
        commonMistakes: [
          "Stoning before Zawwal (midday)",
          "Not following the correct sequence",
          "Rushing through the ritual",
          "Not saying Takbir with each throw",
          "Fighting for position in crowds"
        ]
      },
      {
        time: "After Stoning Small Pillar (1:00 PM)",
        title: "Dua After First Jamarat",
        description: "After stoning Jamarat as-Sughra (smallest pillar), move away from the crowd, face the Qiblah, raise your hands, and make lengthy dua. This is a blessed time for supplication.",
        dua: {
          arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          translation: "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.",
          transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar"
        },
        practicalTips: [
          "Move away from the pillar to avoid crowds",
          "Face the Qiblah direction",
          "Raise your hands in supplication",
          "Make lengthy, heartfelt dua",
          "This is a highly recommended Sunnah"
        ]
      },
      {
        time: "After Stoning Medium Pillar (1:30 PM)",
        title: "Dua After Second Jamarat",
        description: "After stoning Jamarat al-Wusta (middle pillar), again move away, face Qiblah, and make dua. Take your time with this supplication as it's a blessed moment.",
        practicalTips: [
          "Similar to after the first pillar",
          "Don't rush - take time for sincere dua",
          "Make personal supplications",
          "Include prayers for family and Ummah"
        ]
      },
      {
        time: "After Stoning Large Pillar (2:00 PM)",
        title: "Final Jamarat - No Dua",
        description: "After stoning Jamarat al-Aqabah (largest pillar), do NOT stop for dua. This follows the Sunnah of the Prophet (PBUH). Simply leave and return to your tent or accommodation.",
        practicalTips: [
          "Do NOT make dua after this pillar",
          "Leave immediately after stoning",
          "Return to your tent or accommodation",
          "This completes the stoning ritual for the day"
        ],
        commonMistakes: [
          "Making dua after the large pillar (not Sunnah)",
          "Staying in the area unnecessarily",
          "Confusing the sequence of pillars"
        ]
      },
      {
        time: "Afternoon/Evening (3:00 PM - 8:00 PM)",
        title: "Rest and Worship in Mina",
        description: "Return to your tent or accommodation in Mina. Rest, eat, socialize with fellow pilgrims, and engage in worship. These are days of celebration and remembrance of Allah.",
        practicalTips: [
          "Rest and recover from the stoning",
          "Share meals with other pilgrims",
          "Engage in dhikr and Quran recitation",
          "Reflect on your Hajj experience",
          "Prepare for tomorrow if staying another day"
        ]
      },
      {
        time: "Night (8:00 PM - 6:00 AM)",
        title: "Overnight Stay in Mina",
        description: "Spend the night in Mina. This is obligatory for those who are not in a hurry. Engage in night prayers, dhikr, and rest. The atmosphere is peaceful and spiritual.",
        practicalTips: [
          "Must spend most of the night in Mina",
          "Engage in optional night prayers (Tahajjud)",
          "Make dua during the blessed night hours",
          "Rest well for the next day",
          "Socialize and bond with fellow pilgrims"
        ]
      },
      {
        time: "12th Dhul Hijjah - Decision Day",
        title: "Choose to Leave or Stay",
        description: "On the 12th, after completing the stoning ritual, you can choose to leave Mina (if in a hurry) or stay for the 13th day. Both options are permissible in Islam.",
        practicalTips: [
          "Complete the stoning ritual first",
          "If leaving: depart before sunset on the 12th",
          "If staying: remain for the night and stone again on 13th",
          "Leaving early is for those 'in a hurry' with valid reasons",
          "Staying the extra day brings more reward"
        ]
      }
    ],
    importantNotes: [
      "Stoning must be done after Zawwal (midday) - approximately 12:30 PM onwards",
      "Stone all three pillars in sequence: Small → Medium → Large",
      "Make dua after the first two pillars, but NOT after the large pillar",
      "Must spend the nights in Mina (most of the night)",
      "Can leave on 12th after stoning if 'in a hurry', or stay for 13th",
      "These are days of eating, drinking, and remembering Allah",
      "The Prophet (PBUH) said: 'The days of Tashreeq are days of eating, drinking, and remembering Allah'"
    ],
    preparationTips: [
      "Collect enough pebbles (42 total for both days, or 63 if staying for 13th)",
      "Plan your timing to avoid peak crowds",
      "Wear comfortable shoes for walking",
      "Bring water and snacks",
      "Know the layout of the Jamarat area"
    ],
    whatToBring: [
      "42-63 pebbles (depending on how many days)",
      "Water bottle and snacks",
      "Comfortable walking shoes",
      "Small bag for pebbles",
      "Prayer mat",
      "Patience and positive attitude",
      "Camera for memories (after completing rituals)"
    ]
  },
  {
    id: "day5",
    dayNumber: "6",
    title: "Optional Third Day in Mina (13th Dhul Hijjah)",
    date: "13th Dhul Hijjah",
    location: "Mina",
    timelineOverview: "The optional final day for those who chose to stay the extra day in Mina. Complete the final stoning ritual and prepare for departure. This day brings additional spiritual reward and allows for more reflection on the Hajj experience.",
    activities: [
      "Final stoning of all three Jamarat after midday",
      "Make dua after first two pillars",
      "Pack belongings and prepare to leave Mina",
      "Engage in final worship and reflection",
      "Bid farewell to fellow pilgrims",
      "Depart Mina for Makkah",
      "Prepare for Farewell Tawaf"
    ],
    detailedActivities: [
      {
        time: "Morning (6:00 AM - 12:00 PM)",
        title: "Final Morning in Mina - Reflection and Preparation",
        description: "Wake up for Fajr prayer in Mina for the last time. This is a blessed morning to reflect on your entire Hajj journey. Engage in dhikr, read Quran, and prepare for the final stoning ritual.",
        dua: {
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي هَدَانَا لِهَذَا وَمَا كُنَّا لِنَهْتَدِيَ لَوْلَا أَنْ هَدَانَا اللَّهُ",
          translation: "Praise be to Allah who guided us to this, and we would not have been guided if Allah had not guided us.",
          transliteration: "Al-hamdu lillahi alladhi hadana li-hadha wa ma kunna li-nahtadiya lawla an hadana Allah"
        },
        practicalTips: [
          "Wake up early for peaceful Fajr prayer",
          "Reflect on your entire Hajj experience",
          "Pack all belongings - you won't return to Mina",
          "Organize your final 21 pebbles for stoning",
          "Exchange contacts with fellow pilgrims",
          "Take final photos of Mina (after completing rituals)"
        ],
        commonMistakes: [
          "Rushing through the final morning",
          "Not reflecting on the Hajj experience",
          "Forgetting to pack all belongings",
          "Not saying proper goodbyes to fellow pilgrims"
        ]
      },
      {
        time: "After Zawwal (12:30 PM - 3:00 PM)",
        title: "Final Stoning Ritual - Completion of Hajj Rites",
        description: "Perform your final stoning of all three Jamarat. This completes all the required stoning rituals of Hajj. Approach this with gratitude and humility, knowing you are completing one of Islam's greatest acts of worship.",
        dua: {
          arabic: "اللَّهُ أَكْبَرُ، اللَّهُمَّ تَقَبَّلْ مِنِّي",
          translation: "Allah is the Greatest. O Allah, accept from me.",
          transliteration: "Allahu Akbar, Allahumma taqabbal minni"
        },
        practicalTips: [
          "Stone all three pillars in sequence as before",
          "Say 'Allahu Akbar' with each of the 21 throws",
          "Make lengthy dua after first two pillars",
          "Do not make dua after the large pillar",
          "Thank Allah for enabling you to complete Hajj",
          "Move calmly and avoid rushing"
        ],
        commonMistakes: [
          "Rushing through this final ritual",
          "Not making sincere dua after first two pillars",
          "Forgetting the proper sequence",
          "Not expressing gratitude for completing Hajj"
        ]
      },
      {
        time: "Afternoon (3:00 PM - 6:00 PM)",
        title: "Farewell to Mina and Journey to Makkah",
        description: "After completing the final stoning, bid farewell to Mina - the place where you spent these blessed days. Travel back to Makkah with a heart full of gratitude and spiritual fulfillment.",
        practicalTips: [
          "Take a moment to look back at Mina with gratitude",
          "Make dua during the journey to Makkah",
          "Reflect on the transformation you've experienced",
          "Stay connected with the spiritual high of Hajj",
          "Prepare mentally for the Farewell Tawaf"
        ]
      }
    ],
    importantNotes: [
      "This day is optional - only for those who stayed the extra day",
      "Brings additional spiritual reward and blessing",
      "Allows more time for reflection and worship",
      "Completes all stoning requirements of Hajj",
      "After this, only Farewell Tawaf remains",
      "Many scholars recommend staying for the full experience"
    ],
    preparationTips: [
      "Pack all belongings before stoning",
      "Prepare for emotional farewell to Mina",
      "Plan your departure timing to Makkah",
      "Organize final pebbles carefully",
      "Prepare heart for completion of Hajj"
    ],
    whatToBring: [
      "Final 21 pebbles for stoning",
      "All packed luggage",
      "Water and light snacks",
      "Camera for farewell photos",
      "Grateful heart and humble spirit",
      "Contact information of new friends"
    ]
  },
  {
    id: "day6",
    dayNumber: "7",
    title: "Farewell to Makkah (Tawaf al-Wada)",
    date: "Before Departure",
    location: "Makkah - Masjid al-Haram",
    timelineOverview: "The final obligatory ritual of Hajj. Perform the Farewell Tawaf around the Kaaba as your last act before leaving Makkah. This emotional farewell marks the completion of your Hajj pilgrimage and your transformation into a Hajji.",
    activities: [
      "Perform Tawaf al-Wada (Farewell Tawaf)",
      "Make final duas at the Kaaba",
      "Drink Zamzam water",
      "Purchase souvenirs and gifts",
      "Visit other holy sites if time permits",
      "Prepare for departure from Makkah",
      "Reflect on the completed Hajj journey",
      "Make commitment to maintain spiritual gains"
    ],
    detailedActivities: [
      {
        time: "Morning Preparation (8:00 AM - 11:00 AM)",
        title: "Final Preparations in Makkah",
        description: "Wake up in Makkah and prepare for your final day. Perform Fajr prayer, engage in morning dhikr, and organize your belongings. This is your last day in the holy city, so make it meaningful.",
        dua: {
          arabic: "اللَّهُمَّ بَلِّغْنِي فِي دِينِي وَدُنْيَايَ وَآخِرَتِي",
          translation: "O Allah, grant me success in my religion, my worldly life, and my hereafter.",
          transliteration: "Allahumma ballighni fi dini wa dunyaya wa akhirati"
        },
        practicalTips: [
          "Pray Fajr with contemplation and gratitude",
          "Organize luggage and check out procedures",
          "Plan your final day activities",
          "Prepare emotionally for leaving Makkah",
          "Make a list of final duas to recite",
          "Confirm departure transportation"
        ],
        commonMistakes: [
          "Rushing through the final morning",
          "Not planning the Farewell Tawaf timing properly",
          "Forgetting to organize travel documents",
          "Not taking time for reflection"
        ]
      },
      {
        time: "Late Morning (11:00 AM - 2:00 PM)",
        title: "Final Visits and Shopping",
        description: "If time permits, visit other holy sites in Makkah, purchase souvenirs and gifts for family, and complete any remaining tasks. However, prioritize spiritual activities over shopping.",
        practicalTips: [
          "Visit Jabal al-Nour (Cave of Hira) if time allows",
          "Purchase authentic Zamzam water",
          "Buy modest souvenirs and gifts",
          "Visit Islamic bookstores for religious materials",
          "Take final photos of Makkah (respectfully)",
          "Don't let shopping distract from worship"
        ],
        commonMistakes: [
          "Spending too much time shopping",
          "Buying inappropriate or overpriced items",
          "Neglecting spiritual activities for material pursuits",
          "Not leaving enough time for Farewell Tawaf"
        ]
      },
      {
        time: "Afternoon Rest (2:00 PM - 4:00 PM)",
        title: "Rest and Spiritual Preparation",
        description: "Take time to rest, perform Dhuhr and Asr prayers, and prepare spiritually for the Farewell Tawaf. Reflect on your entire Hajj journey and the transformation you've experienced.",
        dua: {
          arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
          translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me.",
          transliteration: "Rabbi awzi'ni an ashkura ni'mataka allati an'amta 'alayya"
        },
        practicalTips: [
          "Rest to prepare for the emotional Farewell Tawaf",
          "Reflect on your Hajj experience and lessons learned",
          "Make a commitment to maintain your spiritual gains",
          "Prepare mentally for leaving the holy city",
          "Review your post-Hajj spiritual goals"
        ]
      },
      {
        time: "Before Departure (Anytime before leaving Makkah)",
        title: "Tawaf al-Wada (Farewell Tawaf)",
        description: "Perform the obligatory Farewell Tawaf around the Kaaba. This should be the last ritual act you perform in Makkah before departing. Make heartfelt duas as you bid farewell to the House of Allah.",
        dua: {
          arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
          translation: "Our Lord, accept from us. Indeed, You are the Hearing, the Knowing.",
          transliteration: "Rabbana taqabbal minna innaka anta as-Sami'u al-'Alim"
        },
        practicalTips: [
          "Perform this as close to departure time as possible",
          "Make sincere duas during each circuit",
          "Try to touch or kiss the Black Stone if possible",
          "Do NOT perform Sa'i after this Tawaf",
          "Drink Zamzam water after completing the Tawaf",
          "Make final supplications facing the Kaaba",
          "Leave the Haram with your back to the Kaaba (if possible)"
        ],
        commonMistakes: [
          "Performing Farewell Tawaf too early",
          "Doing other activities after Farewell Tawaf",
          "Performing Sa'i after Farewell Tawaf (not required)",
          "Not making enough dua during the Tawaf",
          "Rushing through this emotional farewell"
        ]
      },
      {
        time: "Final Moments",
        title: "Final Duas and Departure",
        description: "After completing the Farewell Tawaf, make your final duas at the Kaaba, drink Zamzam water, and prepare for departure. This marks the completion of your Hajj pilgrimage.",
        dua: {
          arabic: "اللَّهُمَّ لَا تَجْعَلْهُ آخِرَ الْعَهْدِ مِنْ بَيْتِكَ الْحَرَامِ",
          translation: "O Allah, do not make this the last covenant with Your Sacred House.",
          transliteration: "Allahumma la taj'alhu akhir al-'ahdi min baytika al-haram"
        },
        practicalTips: [
          "Make dua to return to Makkah again",
          "Ask Allah to accept your Hajj",
          "Pray for forgiveness and guidance",
          "Thank Allah for this blessed opportunity",
          "Leave with humility and gratitude",
          "Maintain the spiritual state you've gained"
        ]
      }
    ],
    importantNotes: [
      "Farewell Tawaf is OBLIGATORY for all pilgrims leaving Makkah",
      "Women in menses are excused from Farewell Tawaf",
      "No Sa'i is performed after Farewell Tawaf",
      "Try to perform Farewell Tawaf as close to departure as possible",
      "This should be your last act in the Haram before leaving",
      "After completing this, your Hajj is officially complete",
      "You are now a Hajji - congratulations on this blessed achievement!",
      "Maintain the spiritual transformation you've gained throughout Hajj"
    ],
    preparationTips: [
      "Plan your departure timing carefully",
      "Book transportation in advance",
      "Keep some time for final shopping if needed",
      "Prepare emotionally for leaving the holy city",
      "Make a list of final duas to recite"
    ],
    whatToBring: [
      "21 pebbles for final stoning (if staying for 13th)",
      "All your luggage (no return to Mina)",
      "Travel documents and tickets",
      "Zamzam water containers to fill",
      "Camera for final photos (after rituals)",
      "Grateful heart and humble spirit",
      "Commitment to maintain the spiritual gains"
    ]
  }
];