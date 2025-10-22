export interface Dua {
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
}

export interface DuaCategory {
  id: string;
  title: string;
  description: string;
  duas: Dua[];
}

export interface DuaCategoryInfo {
  id: string;
  title: string;
  description: string;
  chapters: number;
  color: string;
  icon: string;
}

export const duaCategoriesInfo: DuaCategoryInfo[] = [
  {
    id: "morning-evening",
    title: "Morning & Evening",
    description: "Daily morning and evening remembrance",
    chapters: 31,
    color: "#FFE4B5",
    icon: "🌅"
  },
  {
    id: "prayer",
    title: "Prayer",
    description: "Duas related to Salah and worship",
    chapters: 25,
    color: "#E8F5E9",
    icon: "🕌"
  },
  {
    id: "quran",
    title: "Quran",
    description: "Duas from the Holy Quran",
    chapters: 18,
    color: "#F0E68C",
    icon: "📖"
  },
  {
    id: "praising-allah",
    title: "Praising Allah",
    description: "Dhikr and praise of Allah",
    chapters: 12,
    color: "#DDA0DD",
    icon: "🤲"
  },
  {
    id: "hajj-umrah",
    title: "Hajj & Umrah",
    description: "Pilgrimage supplications",
    chapters: 8,
    color: "#FFE4E1",
    icon: "🕋"
  },
  {
    id: "travel",
    title: "Travel",
    description: "Journey and travel duas",
    chapters: 11,
    color: "#B0E0E6",
    icon: "✈️"
  },
  {
    id: "joy-distress",
    title: "Joy & Distress",
    description: "Duas for happiness and difficulty",
    chapters: 15,
    color: "#F0FFFF",
    icon: "💝"
  },
  {
    id: "nature",
    title: "Nature",
    description: "Duas for rain, wind and natural events",
    chapters: 10,
    color: "#98FB98",
    icon: "🌿"
  },
  {
    id: "good-etiquette",
    title: "Good Etiquette",
    description: "Islamic manners and etiquette",
    chapters: 20,
    color: "#FFDAB9",
    icon: "🌟"
  },
  {
    id: "home-family",
    title: "Home & Family",
    description: "Family and household duas",
    chapters: 14,
    color: "#E6E6FA",
    icon: "🏠"
  },
  {
    id: "food-drink",
    title: "Food & Drink",
    description: "Eating and drinking supplications",
    chapters: 12,
    color: "#FFB6C1",
    icon: "🍽️"
  },
  {
    id: "sickness-death",
    title: "Sickness & Death",
    description: "Health and end of life duas",
    chapters: 8,
    color: "#D3D3D3",
    icon: "🏥"
  },
  {
    id: "protection",
    title: "Protection",
    description: "Seeking refuge and protection",
    chapters: 16,
    color: "#F5DEB3",
    icon: "🛡️"
  },
  {
    id: "forgiveness",
    title: "Forgiveness",
    description: "Seeking Allah's forgiveness",
    chapters: 9,
    color: "#E0FFFF",
    icon: "🙏"
  },
  {
    id: "marriage",
    title: "Marriage",
    description: "Marriage and relationship duas",
    chapters: 7,
    color: "#FFF0F5",
    icon: "💍"
  },
  {
    id: "children",
    title: "Children",
    description: "Duas for children and parenting",
    chapters: 10,
    color: "#F0FFF0",
    icon: "👶"
  },
  {
    id: "knowledge",
    title: "Knowledge",
    description: "Seeking knowledge and wisdom",
    chapters: 6,
    color: "#F5F5DC",
    icon: "📚"
  },
  {
    id: "wealth",
    title: "Wealth & Rizq",
    description: "Sustenance and provision",
    chapters: 8,
    color: "#FFFACD",
    icon: "💰"
  },
  {
    id: "gratitude",
    title: "Gratitude",
    description: "Expressing thankfulness",
    chapters: 5,
    color: "#FFE4B5",
    icon: "🌺"
  },
  {
    id: "guidance",
    title: "Guidance",
    description: "Seeking divine guidance",
    chapters: 7,
    color: "#E6E6FA",
    icon: "🧭"
  }
];

export const duaCategories: DuaCategory[] = [
  {
    id: "morning-evening",
    title: "Morning & Evening",
    description: "Daily morning and evening remembrance",
    duas: [
      {
        title: "Morning Remembrance",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "Asbahna wa asbahal-mulku lillahi wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah",
        translation: "We have entered the morning and at this time all sovereignty belongs to Allah. All praise is for Allah. There is no deity except Allah alone, without partner.",
        reference: "Abu Dawud"
      },
      {
        title: "Evening Remembrance",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "Amsayna wa amsal-mulku lillahi wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah",
        translation: "We have entered the evening and at this time all sovereignty belongs to Allah. All praise is for Allah. There is no deity except Allah alone, without partner.",
        reference: "Abu Dawud"
      },
      {
        title: "Sayyidul Istighfar",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
        transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu",
        translation: "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I am upon Your covenant and promise as much as I am able.",
        reference: "Bukhari"
      },
      {
        title: "Protection for Morning and Evening",
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Alim",
        translation: "In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is The All-Seeing, The All-Knowing.",
        reference: "Abu Dawud, Tirmidhi"
      },
      {
        title: "Ayatul Kursi",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
        transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum, la ta'khudhuhu sinatun wa la nawm",
        translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
        reference: "Quran 2:255"
      }
    ]
  },
  {
    id: "prayer",
    title: "Prayer",
    description: "Duas related to Salah and worship",
    duas: [
      {
        title: "Opening Dua for Prayer",
        arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
        transliteration: "Subhanakallahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk",
        translation: "Glory be to You, O Allah, and praise. Blessed is Your name and exalted is Your majesty. There is no deity except You.",
        reference: "Abu Dawud, Tirmidhi"
      },
      {
        title: "Dua in Ruku",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "Subhana Rabbiyal-'Adhim",
        translation: "Glory be to my Lord, the Most Great.",
        reference: "Muslim"
      },
      {
        title: "Dua in Sujud",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subhana Rabbiyal-A'la",
        translation: "Glory be to my Lord, the Most High.",
        reference: "Muslim"
      },
      {
        title: "Dua Between Two Sujud",
        arabic: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
        transliteration: "Rabbighfir li, Rabbighfir li",
        translation: "My Lord, forgive me. My Lord, forgive me.",
        reference: "Abu Dawud"
      },
      {
        title: "Dua Qunoot",
        arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ",
        transliteration: "Allahumma ihdini fiman hadayt, wa 'afini fiman 'afayt",
        translation: "O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being.",
        reference: "Abu Dawud, Tirmidhi"
      }
    ]
  },
  {
    id: "quran",
    title: "Quran",
    description: "Duas from the Holy Quran",
    duas: [
      {
        title: "For Guidance",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً",
        transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmah",
        translation: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy.",
        reference: "Quran 3:8"
      },
      {
        title: "For Good in Both Worlds",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
        translation: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
        reference: "Quran 2:201"
      },
      {
        title: "For Parents",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbir-hamhuma kama rabbayanee sagheera",
        translation: "My Lord, have mercy upon them as they brought me up when I was small.",
        reference: "Quran 17:24"
      },
      {
        title: "Prophet Yunus's Dua",
        arabic: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
        transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
        translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        reference: "Quran 21:87"
      },
      {
        title: "For Increase in Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidni 'ilma",
        translation: "My Lord, increase me in knowledge.",
        reference: "Quran 20:114"
      }
    ]
  },
  {
    id: "praising-allah",
    title: "Praising Allah",
    description: "Dhikr and praise of Allah",
    duas: [
      {
        title: "Tasbih",
        arabic: "سُبْحَانَ اللَّهِ",
        transliteration: "SubhanAllah",
        translation: "Glory be to Allah.",
        reference: "Muslim"
      },
      {
        title: "Tahmid",
        arabic: "الْحَمْدُ لِلَّهِ",
        transliteration: "Alhamdulillah",
        translation: "All praise is for Allah.",
        reference: "Muslim"
      },
      {
        title: "Takbir",
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah is the Greatest.",
        reference: "Muslim"
      },
      {
        title: "Tahlil",
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
        transliteration: "La ilaha illallah",
        translation: "There is no deity except Allah.",
        reference: "Muslim"
      },
      {
        title: "Complete Dhikr",
        arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
        transliteration: "SubhanAllahi wa bihamdihi, SubhanAllahil-'Adhim",
        translation: "Glory be to Allah and praise Him. Glory be to Allah, the Most Great.",
        reference: "Bukhari & Muslim"
      }
    ]
  },
  {
    id: "hajj-umrah",
    title: "Hajj & Umrah",
    description: "Pilgrimage supplications",
    duas: [
      {
        title: "Talbiyah",
        arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ",
        transliteration: "Labbayk Allahumma labbayk, labbayka la sharika laka labbayk, innal hamda wan-ni'mata laka wal-mulk, la sharika lak",
        translation: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace and sovereignty belong to You. You have no partner."
      },
      {
        title: "Upon Seeing the Kaaba",
        arabic: "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً",
        transliteration: "Allahumma zid hadhal-bayta tashrifan wa ta'dhiman wa takriman wa mahabah",
        translation: "O Allah, increase this House in honor, esteem, respect, and reverence."
      },
      {
        title: "At Safa and Marwah",
        arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
        transliteration: "Innas-Safa wal-Marwata min sha'a'irillah",
        translation: "Indeed, Safa and Marwah are among the symbols of Allah.",
        reference: "Quran 2:158"
      },
      {
        title: "Day of Arafah",
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
        translation: "There is no deity except Allah alone, He has no partner. His is the dominion and His is the praise, and He is capable of all things.",
        reference: "Tirmidhi"
      }
    ]
  },
  {
    id: "travel",
    title: "Travel",
    description: "Journey and travel duas",
    duas: [
      {
        title: "When Starting Journey",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun",
        translation: "Glory be to Him who has subjected this to us, and we could not have subdued it ourselves, and indeed to our Lord we will return.",
        reference: "Quran 43:13-14"
      },
      {
        title: "Travel Dua",
        arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى",
        transliteration: "Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa, wa minal-'amali ma tarda",
        translation: "O Allah, we ask You in our journey for righteousness and piety, and for deeds that are pleasing to You.",
        reference: "Muslim"
      },
      {
        title: "Boarding Vehicle/Plane",
        arabic: "بِسْمِ اللَّهِ، وَالْحَمْدُ لِلَّهِ",
        transliteration: "Bismillah, walhamdulillah",
        translation: "In the name of Allah, and all praise is for Allah.",
        reference: "Abu Dawud"
      },
      {
        title: "Returning from Journey",
        arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
        transliteration: "Ayibuna ta'ibuna 'abiduna lirabbina hamidun",
        translation: "We return, repentant, worshipping, praising our Lord.",
        reference: "Muslim"
      }
    ]
  },
  {
    id: "joy-distress",
    title: "Joy & Distress",
    description: "Duas for happiness and difficulty",
    duas: [
      {
        title: "In Times of Distress",
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
        transliteration: "Inna lillahi wa inna ilayhi raji'un",
        translation: "Indeed, to Allah we belong and to Him we shall return.",
        reference: "Quran 2:156"
      },
      {
        title: "When Anxious",
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
        translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        reference: "Quran 21:87"
      },
      {
        title: "For Relief from Hardship",
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
        transliteration: "Allahumma la sahla illa ma ja'altahu sahlan, wa anta taj'alul-hazna idha shi'ta sahlan",
        translation: "O Allah, there is no ease except what You make easy, and You make the difficult easy if You wish.",
        reference: "Ibn Hibban"
      },
      {
        title: "When Happy",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
        transliteration: "Alhamdulillahil-ladhi bini'matihi tatimmus-salihat",
        translation: "All praise is for Allah by whose favor good deeds are completed.",
        reference: "Ibn Majah"
      }
    ]
  },
  {
    id: "nature",
    title: "Nature",
    description: "Duas for rain, wind and natural events",
    duas: [
      {
        title: "When It Rains",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        transliteration: "Allahumma sayyiban nafi'an",
        translation: "O Allah, make it a beneficial rain.",
        reference: "Bukhari"
      },
      {
        title: "During Thunder",
        arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ",
        transliteration: "Subhanal-ladhi yusabbihur-ra'du bihamdihi wal-mala'ikatu min khifatih",
        translation: "Glory be to Him whom thunder glorifies with His praise, and the angels out of fear of Him.",
        reference: "Muwatta Malik"
      },
      {
        title: "Seeing the Moon",
        arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ",
        transliteration: "Allahumma ahillahu 'alayna bil-yumni wal-iman, was-salamati wal-Islam",
        translation: "O Allah, bring it over us with blessing and faith, and security and Islam.",
        reference: "Tirmidhi"
      },
      {
        title: "During Strong Wind",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ",
        transliteration: "Allahumma inni as'aluka khayraha wa khayra ma fiha wa khayra ma ursilat bih",
        translation: "O Allah, I ask You for its good, the good of what is in it, and the good of what it was sent with.",
        reference: "Muslim"
      }
    ]
  },
  {
    id: "good-etiquette",
    title: "Good Etiquette",
    description: "Islamic manners and etiquette",
    duas: [
      {
        title: "When Sneezing",
        arabic: "الْحَمْدُ لِلَّهِ",
        transliteration: "Alhamdulillah",
        translation: "All praise is for Allah.",
        reference: "Bukhari"
      },
      {
        title: "Reply to Sneezing",
        arabic: "يَرْحَمُكَ اللَّهُ",
        transliteration: "Yarhamukallah",
        translation: "May Allah have mercy on you.",
        reference: "Bukhari"
      },
      {
        title: "When Praising Someone",
        arabic: "مَا شَاءَ اللَّهُ تَبَارَكَ اللَّهُ",
        transliteration: "Ma sha'Allah tabarakallah",
        translation: "What Allah wills. Blessed is Allah.",
        reference: "Quran 18:39"
      },
      {
        title: "Congratulating",
        arabic: "بَارَكَ اللَّهُ لَكَ",
        transliteration: "Barakallahu lak",
        translation: "May Allah bless you.",
        reference: "Bukhari"
      },
      {
        title: "When Angry",
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "A'udhu billahi minash-shaytanir-rajim",
        translation: "I seek refuge with Allah from the accursed Satan.",
        reference: "Bukhari & Muslim"
      }
    ]
  },
  {
    id: "home-family",
    title: "Home & Family",
    description: "Family and household duas",
    duas: [
      {
        title: "Entering Home",
        arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
        transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi Rabbina tawakkalna",
        translation: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we depend.",
        reference: "Abu Dawud"
      },
      {
        title: "Leaving Home",
        arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "Bismillahi, tawakkaltu 'alallahi, wa la hawla wa la quwwata illa billah",
        translation: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
        reference: "Abu Dawud"
      },
      {
        title: "For Family",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
        translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        reference: "Quran 25:74"
      },
      {
        title: "For Parents",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbir-hamhuma kama rabbayanee sagheera",
        translation: "My Lord, have mercy upon them as they brought me up when I was small.",
        reference: "Quran 17:24"
      }
    ]
  },
  {
    id: "food-drink",
    title: "Food & Drink",
    description: "Eating and drinking supplications",
    duas: [
      {
        title: "Before Eating",
        arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
        transliteration: "Bismillahi wa 'ala barakatillah",
        translation: "In the name of Allah and with the blessings of Allah.",
        reference: "Ibn Majah"
      },
      {
        title: "After Eating",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
        translation: "All praise is for Allah who gave us food and drink and made us Muslims.",
        reference: "Abu Dawud"
      },
      {
        title: "When Breaking Fast",
        arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
        transliteration: "Dhahaba adh-dhama'u wabtallatil-'uruqu wa thabatal-ajru in sha'Allah",
        translation: "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
        reference: "Abu Dawud"
      },
      {
        title: "When Drinking Water",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي سَقَانَا عَذْبًا فُرَاتًا بِرَحْمَتِهِ وَلَمْ يَجْعَلْهُ مِلْحًا أُجَاجًا بِذُنُوبِنَا",
        transliteration: "Alhamdulillahil-ladhi saqana 'adhban furatan birahmatihi wa lam yaj'alhu milhan ujajan bidhunubina",
        translation: "All praise is for Allah who gave us sweet, fresh water by His mercy and did not make it salty and bitter due to our sins.",
        reference: "Tabarani"
      }
    ]
  },
  {
    id: "sickness-death",
    title: "Sickness & Death",
    description: "Health and end of life duas",
    duas: [
      {
        title: "When Visiting the Sick",
        arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
        transliteration: "La ba'sa tahurun in sha'Allah",
        translation: "No harm, it is purification if Allah wills.",
        reference: "Bukhari"
      },
      {
        title: "For Healing",
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ",
        transliteration: "Allahumma Rabban-nasi, adhhibil-ba'sa, ishfihi wa Antash-Shafi, la shifa'a illa shifa'uk",
        translation: "O Allah, Lord of mankind, remove the harm, heal him for You are the Healer. There is no healing except Your healing.",
        reference: "Bukhari & Muslim"
      },
      {
        title: "When in Pain",
        arabic: "بِسْمِ اللَّهِ ثَلَاثًا، أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
        transliteration: "Bismillahi thalathan, a'udhu billahi wa qudratihi min sharri ma ajidu wa uhadhir",
        translation: "In the name of Allah (three times). I seek refuge in Allah and His power from the evil of what I find and fear.",
        reference: "Muslim"
      },
      {
        title: "At Time of Death",
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
        transliteration: "La ilaha illallah",
        translation: "There is no deity except Allah.",
        reference: "Muslim"
      }
    ]
  },
  {
    id: "protection",
    title: "Protection",
    description: "Seeking refuge and protection",
    duas: [
      {
        title: "For Protection from Evil",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
        translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
        reference: "Muslim"
      },
      {
        title: "Protection from Shaytan",
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "A'udhu billahi minash-shaytanir-rajim",
        translation: "I seek refuge with Allah from the accursed Satan.",
        reference: "Quran 16:98"
      },
      {
        title: "Surah Al-Falaq",
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        transliteration: "Qul a'udhu birabbil-falaq",
        translation: "Say: I seek refuge with the Lord of the daybreak.",
        reference: "Quran 113:1"
      },
      {
        title: "Surah An-Nas",
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliteration: "Qul a'udhu birabbin-nas",
        translation: "Say: I seek refuge with the Lord of mankind.",
        reference: "Quran 114:1"
      }
    ]
  },
  {
    id: "forgiveness",
    title: "Forgiveness",
    description: "Seeking Allah's forgiveness",
    duas: [
      {
        title: "Seeking Forgiveness",
        arabic: "أَسْتَغْفِرُ اللَّهَ",
        transliteration: "Astaghfirullah",
        translation: "I seek forgiveness from Allah.",
        reference: "Muslim"
      },
      {
        title: "Complete Istighfar",
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullaha al-'Adhimal-ladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atubu ilayh",
        translation: "I seek forgiveness from Allah, the Magnificent, whom there is no deity except Him, the Living, the Sustainer, and I repent to Him.",
        reference: "Tirmidhi"
      },
      {
        title: "For Repentance",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        transliteration: "Rabbighfir li wa tub 'alayya innaka Antat-Tawwabur-Rahim",
        translation: "My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of repentance, the Merciful.",
        reference: "Abu Dawud"
      },
      {
        title: "Sayyidul Istighfar",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
        transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduk",
        translation: "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant.",
        reference: "Bukhari"
      }
    ]
  },
  {
    id: "marriage",
    title: "Marriage",
    description: "Marriage and relationship duas",
    duas: [
      {
        title: "For Finding Spouse",
        arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir",
        translation: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
        reference: "Quran 28:24"
      },
      {
        title: "For Marriage Blessing",
        arabic: "بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
        transliteration: "Barakallahu laka, wa baraka 'alayka, wa jama'a baynakuma fi khayr",
        translation: "May Allah bless you, and shower His blessings upon you, and join you together in goodness.",
        reference: "Abu Dawud"
      },
      {
        title: "For Spouse",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun",
        translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes.",
        reference: "Quran 25:74"
      },
      {
        title: "Before Intimacy",
        arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا",
        transliteration: "Bismillah, Allahumma jannibnash-shaytan, wa jannibish-shaytana ma razaqtana",
        translation: "In the name of Allah. O Allah, keep Satan away from us and keep Satan away from what You provide us.",
        reference: "Bukhari & Muslim"
      }
    ]
  },
  {
    id: "children",
    title: "Children",
    description: "Duas for children and parenting",
    duas: [
      {
        title: "For Righteous Children",
        arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
        transliteration: "Rabbi hab li min ladunka dhurriyyatan tayyibatan innaka sami'ud-du'a",
        translation: "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.",
        reference: "Quran 3:38"
      },
      {
        title: "For Children's Guidance",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
        transliteration: "Rabbij'alni muqimas-salati wa min dhurriyyati Rabbana wa taqabbal du'a",
        translation: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication.",
        reference: "Quran 14:40"
      },
      {
        title: "Protection for Children",
        arabic: "أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
        transliteration: "U'idhukuma bikalimatillahit-tammati min kulli shaytanin wa hammah, wa min kulli 'aynin lammah",
        translation: "I seek protection for you in the perfect words of Allah from every devil and poisonous creature, and from every evil eye.",
        reference: "Bukhari"
      },
      {
        title: "For Children's Success",
        arabic: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ",
        transliteration: "Rabbana waj'alna muslimayni laka wa min dhurriyyatina ummatan muslimatan lak",
        translation: "Our Lord, make us Muslims [in submission] to You and from our descendants a Muslim nation [in submission] to You.",
        reference: "Quran 2:128"
      }
    ]
  },
  {
    id: "knowledge",
    title: "Knowledge",
    description: "Seeking knowledge and wisdom",
    duas: [
      {
        title: "For Increase in Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidni 'ilma",
        translation: "My Lord, increase me in knowledge.",
        reference: "Quran 20:114"
      },
      {
        title: "Before Studying",
        arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي وَزِدْنِي عِلْمًا",
        transliteration: "Allahumma infa'ni bima 'allamtani wa 'allimni ma yanfa'uni wa zidni 'ilma",
        translation: "O Allah, benefit me with what You have taught me, teach me what benefits me, and increase me in knowledge.",
        reference: "Ibn Majah"
      },
      {
        title: "For Understanding",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
        transliteration: "Rabbish-rah li sadri wa yassir li amri wahlul 'uqdatan min lisani yafqahu qawli",
        translation: "My Lord, expand for me my chest, ease for me my task, and untie the knot from my tongue that they may understand my speech.",
        reference: "Quran 20:25-28"
      },
      {
        title: "For Beneficial Knowledge",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'an wa rizqan tayyiban wa 'amalan mutaqabbalan",
        translation: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        reference: "Ibn Majah"
      }
    ]
  },
  {
    id: "wealth",
    title: "Wealth & Rizq",
    description: "Sustenance and provision",
    duas: [
      {
        title: "For Sustenance",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        transliteration: "Allahumma ikfini bihalalika 'an haramika wa aghnini bifadlika 'amman siwak",
        translation: "O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.",
        reference: "Tirmidhi"
      },
      {
        title: "For Debt Relief",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wa a'udhu bika minal-'ajzi wal-kasal",
        translation: "O Allah, I seek refuge in You from worry and grief, and I seek refuge in You from inability and laziness.",
        reference: "Bukhari"
      },
      {
        title: "For Barakah in Wealth",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Allahumma barik lana fima razaqtana wa qina 'adhaban-nar",
        translation: "O Allah, bless us in what You have provided for us and protect us from the punishment of the Fire.",
        reference: "Ibn Majah"
      },
      {
        title: "For Business Success",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        transliteration: "Ya Hayyu ya Qayyumu birahmatika astaghith",
        translation: "O Ever-Living, O Sustainer, by Your mercy I seek help.",
        reference: "Tirmidhi"
      }
    ]
  },
  {
    id: "gratitude",
    title: "Gratitude",
    description: "Expressing thankfulness",
    duas: [
      {
        title: "Expressing Gratitude",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
        transliteration: "Alhamdulillahil-ladhi bini'matihi tatimmus-salihat",
        translation: "All praise is for Allah by whose favor good deeds are completed.",
        reference: "Ibn Majah"
      },
      {
        title: "For Allah's Blessings",
        arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ",
        transliteration: "Allahumma ma asbaha bi min ni'matin aw bi-ahadin min khalqika faminka wahdaka la sharika lak",
        translation: "O Allah, whatever blessing I or any of Your creation have risen upon, is from You alone, without partner.",
        reference: "Abu Dawud"
      },
      {
        title: "Thanking Allah",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ",
        transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya",
        translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents.",
        reference: "Quran 46:15"
      },
      {
        title: "For Contentment",
        arabic: "الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ",
        transliteration: "Alhamdulillahi 'ala kulli hal",
        translation: "All praise is for Allah in every condition.",
        reference: "Ibn Majah"
      }
    ]
  },
  {
    id: "guidance",
    title: "Guidance",
    description: "Seeking divine guidance",
    duas: [
      {
        title: "For Guidance",
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        transliteration: "Ihdinas-siratal-mustaqim",
        translation: "Guide us to the straight path.",
        reference: "Quran 1:6"
      },
      {
        title: "Istikhara Prayer",
        arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ",
        transliteration: "Allahumma inni astakhiruka bi'ilmika wa astaqdiruka biqudratika",
        translation: "O Allah, I seek Your guidance through Your knowledge, and I seek ability through Your power.",
        reference: "Bukhari"
      },
      {
        title: "For Steadfastness",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
        transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana",
        translation: "Our Lord, let not our hearts deviate after You have guided us.",
        reference: "Quran 3:8"
      },
      {
        title: "For Right Path",
        arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        transliteration: "Ya muqallibal-qulubi thabbit qalbi 'ala dinik",
        translation: "O Turner of hearts, make my heart firm upon Your religion.",
        reference: "Tirmidhi"
      }
    ]
  }
];