export interface UmrahStep {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  duration?: string;
  steps?: string[];
  duas?: {
    arabic: string;
    transliteration: string;
    translation: string;
  }[];
  tips?: string[];
}

export const umrahSteps: UmrahStep[] = [
  {
    id: 1,
    title: "Ihram - Sacred State of Purity",
    description: "Enter the state of consecration before crossing Miqat",
    fullDescription: "Ihram is the sacred state of spiritual and physical purity that every Muslim must enter before performing Umrah. It represents your intention to leave behind worldly concerns and dedicate yourself to worship. The state of Ihram begins at or before the Miqat (designated boundary points around Makkah). From the moment you enter Ihram until completion of Umrah, you must observe specific restrictions that teach patience, humility, and equality before Allah. The white garments symbolize purity, unity, and the equality of all pilgrims regardless of their worldly status.",
    duration: "45-60 minutes",
    steps: [
      "PREPARATION (Before Miqat):\n• Trim your nails on hands and feet\n• Remove unwanted body hair (underarms and private areas)\n• Take a complete bath (ghusl) with unscented soap - this is for cleanliness, not ritual purity\n• If ghusl is not possible, perform wudu (ablution)\n• Comb your hair and beard (men)\n• Apply perfume/attar to your body and head (men only) - NOT on the Ihram garments",
      "IHRAM GARMENTS:\nMEN:\n• Remove all stitched clothing\n• Wear the Izar (lower garment) - wrap around waist covering from navel to below knees\n• Wear the Rida (upper garment) - drape over shoulders, leaving right shoulder exposed during Tawaf only\n• No underwear, socks, or head covering\n• Wear simple sandals that don't cover the ankle bone or top of feet\n\nWOMEN:\n• Wear loose, modest clothing of any color (preferably simple)\n• Cover entire body except face and hands\n• No niqab or gloves, but can lower head covering if needed around non-mahram\n• Regular shoes/socks are permitted",
      "PRAYER BEFORE IHRAM (Sunnah):\n• Pray 2 rak'ah nafl prayer if not makruh time\n• In first rak'ah after Fatihah: recite Surah Al-Kafirun\n• In second rak'ah after Fatihah: recite Surah Al-Ikhlas\n• This prayer is not obligatory but highly recommended",
      "MAKING INTENTION (NIYYAH):\n• Stand facing Qibla if possible\n• Make intention in your heart and optionally say:\n  'اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي'\n  'Allahumma inni uridul-'Umrata fa-yassirha li wa taqabbalha minni'\n  'O Allah, I intend to perform Umrah, so make it easy for me and accept it from me'\n• Then say: 'لَبَّيْكَ عُمْرَةً' (Labbayka 'Umratan) - 'Here I am for Umrah'",
      "BEGIN RECITING TALBIYAH:\n• Start reciting immediately after intention\n• Men recite loudly, women quietly\n• Continue throughout journey until starting Tawaf\n• Recite with devotion and presence of heart\n• Increase recitation when: ascending/descending, meeting other pilgrims, after prayers, changing positions",
      "IHRAM RESTRICTIONS NOW APPLY:\n• No cutting/plucking hair or nails\n• No perfume, scented soap, or cosmetics\n• No intimate relations with spouse\n• No hunting or killing animals (even insects)\n• No cutting trees or plants in Haram\n• No covering head for men\n• No wearing stitched clothes for men\n• No arguments, disputes, or foul language\n• No marriage contracts"
    ],
    duas: [
      {
        arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ",
        transliteration: "Labbayk Allahumma labbayk, labbayka la sharika laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, la sharika lak",
        translation: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, blessings, and sovereignty belong to You. You have no partner."
      },
      {
        arabic: "لَبَّيْكَ إِلَهَ الْحَقِّ لَبَّيْكَ",
        transliteration: "Labbayka ilah al-haqqi labbayk",
        translation: "Here I am, O God of Truth, here I am"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي",
        transliteration: "Allahumma inni uridul-'Umrata fa-yassirha li wa taqabbalha minni",
        translation: "O Allah, I intend to perform Umrah, so make it easy for me and accept it from me"
      }
    ],
    tips: [
      "Choose Ihram garments made of thick material to avoid transparency",
      "Carry a small bag for shoes when entering carpeted areas",
      "Keep a small unscented soap for wudu during Ihram",
      "Safety pins can be used to secure Ihram (though technically stitched, widely accepted)",
      "Carry extra Ihram in case of emergency",
      "For women: choose comfortable, breathable fabric for the journey",
      "Memorize the Talbiyah before travel",
      "If you forget restrictions and violate them unintentionally, seek guidance for kaffarah (penalty)",
      "Keep reciting Talbiyah even during daily activities",
      "Maintain patience if Ihram becomes uncomfortable - it's part of the spiritual journey"
    ]
  },
  {
    id: 2,
    title: "Tawaf - Circling the House of Allah",
    description: "Circumambulate the Kaaba seven times in worship",
    fullDescription: "Tawaf is the act of circumambulating the Kaaba seven times counter-clockwise, symbolizing the unity of believers in worship of the One God. It represents the angels' continuous worship around Allah's throne and demonstrates the centrality of Allah in a Muslim's life. The Kaaba serves as the qibla (direction of prayer) for Muslims worldwide, and Tawaf is a unique act of worship performed only at this sacred place. Each circuit begins and ends at the Black Stone (Hajar al-Aswad), and the entire Tawaf is a time of intense devotion, remembrance, and supplication.",
    duration: "45-90 minutes (depending on crowd)",
    steps: [
      "ENTERING MASJID AL-HARAM:\n• Stop reciting Talbiyah when you see the Kaaba\n• Enter with right foot first through any gate\n• Recite the dua for entering a mosque:\n  'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ'\n  'Bismillah, was-salatu was-salamu 'ala Rasulillah, Allahumma iftah li abwaba rahmatik'\n  'In the name of Allah, peace and blessings upon the Messenger of Allah. O Allah, open for me the doors of Your mercy'\n• Lower your gaze initially and walk with humility",
      "FIRST SIGHT OF KAABA (Special Moment):\n• When you first see the Kaaba, raise your hands and make dua\n• This is a special time when duas are accepted\n• Prophet ﷺ said: 'The first sight of Kaaba is a time of accepted dua'\n• Make dua for yourself, family, Ummah\n• Common dua: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً'\n  'Allahumma zid hadhal-bayta tashrifan wa ta'dhiman wa takriman wa mahabah'\n  'O Allah, increase this House in honor, esteem, respect, and reverence'",
      "STARTING POSITION - HAJAR AL-ASWAD (Black Stone):\n• Move to the Black Stone corner (marked by green lights on the mosque walls)\n• This line is called 'Khat al-Ibtida' (starting line)\n• Stand facing the Black Stone with Kaaba on your left\n• Make intention: 'O Allah, I intend to perform Tawaf of Your Sacred House, seven circuits for Your sake alone'\n• If possible (not crowded):\n  - Kiss the Black Stone directly, or\n  - Touch it with right hand and kiss your hand, or\n  - Touch it with something (stick/cane) and kiss that\n• If too crowded (most common):\n  - Face the Black Stone from distance\n  - Raise both hands to ears (like starting prayer)\n  - Say 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ' (Bismillah, Allahu Akbar)\n  - Make a gesture with right hand towards it (called Istilam)\n  - Begin walking",
      "PERFORMING THE 7 CIRCUITS:\n• Walk counter-clockwise keeping Kaaba on your left\n• Men only - IDTIBA: Keep right shoulder uncovered throughout Tawaf (wrap upper garment under right armpit)\n• Men only - RAML: Walk briskly with short steps in first 3 circuits (from Black Stone to Black Stone)\n• Normal walk for circuits 4-7 (men) and all 7 circuits (women)\n• No specific dua is mandated - make any dua in any language\n• Recommended dhikr and duas during circuits:\n  - SubhanAllah, Alhamdulillah, La ilaha illallah, Allahu Akbar\n  - Astaghfirullah wa atubu ilayh\n  - Send salawat upon Prophet ﷺ\n  - Ask for forgiveness, guidance, paradise, protection from hellfire\n  - Pray for parents, family, friends, and entire Ummah\n• Stay focused on worship, avoid worldly talk\n• If prayer time comes, join congregation, then continue from where you stopped\n• If wudu breaks, go make wudu and continue from same circuit",
      "RUKN YAMANI (Yemeni Corner - 4th corner before Black Stone):\n• This is the corner just before returning to Black Stone\n• If possible, touch it with right hand (no kissing)\n• If you touch it, say: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ' (Bismillah, Allahu Akbar)\n• If too crowded, just continue walking (no hand gesture needed)\n• Special area between Rukn Yamani and Black Stone:\n  - Recite: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ'\n  'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar'\n  'Our Lord, grant us good in this world and good in the Hereafter, and save us from the punishment of the Fire'\n  - This was frequently recited by Prophet ﷺ in this section",
      "COMPLETING EACH CIRCUIT:\n• Each circuit ends when you return to Black Stone line\n• Perform Istilam (gesture) towards Black Stone each time you pass:\n  - Raise right hand towards it\n  - Say 'Allahu Akbar'\n  - Continue to next circuit\n• Keep count on fingers or use a counter\n• After 7th circuit, you've completed Tawaf\n• Men should cover right shoulder again",
      "PRAYER AT MAQAM IBRAHIM:\n• After completing Tawaf, proceed to Maqam Ibrahim (Station of Abraham)\n• It's a glass structure containing the stone where Prophet Ibrahim stood while building Kaaba\n• Pray 2 rak'ah behind it (any distance, even far back if crowded)\n• If too crowded there, pray anywhere in the mosque\n• Recite before prayer: 'وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى'\n  'Wattakhidhu min maqami Ibrahima musalla'\n  'And take the Station of Abraham as a place of prayer' (Quran 2:125)\n• In these 2 rak'ah:\n  - 1st rak'ah after Fatihah: Surah Al-Kafirun (Chapter 109)\n  - 2nd rak'ah after Fatihah: Surah Al-Ikhlas (Chapter 112)\n  - Or recite any other surahs you know\n• Make dua after this prayer",
      "DRINKING ZAMZAM:\n• After the 2 rak'ah prayer, go to Zamzam water stations\n• Drink Zamzam water to your fill\n• Face the Kaaba while drinking if possible\n• Make dua - Prophet ﷺ said: 'Water of Zamzam is for whatever it is drunk for'\n• You may also pour some over your head\n• Then proceed to Safa to begin Sa'i"
    ],
    duas: [
      {
        arabic: "اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ، وَالْحَرَمَ حَرَمُكَ، وَالْأَمْنَ أَمْنُكَ، وَهَذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ",
        transliteration: "Allahumma inna hadhal-bayta baytuk, wal-harama haramuk, wal-amna amnuk, wa hadha maqamul-'a'idhi bika minan-nar",
        translation: "O Allah, this House is Your House, the Sanctuary is Your Sanctuary, security is from You, and this is the place of one who seeks refuge in You from the Fire"
      },
      {
        arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "SubhanAllahi wal-hamdulillahi wa la ilaha illallahu wallahu akbar wa la hawla wa la quwwata illa billah",
        translation: "Glory be to Allah, praise be to Allah, there is no god but Allah, Allah is Greatest, there is no power or might except with Allah"
      },
      {
        arabic: "اللَّهُمَّ اغْفِرْ وَارْحَمْ وَاعْفُ عَمَّا تَعْلَمُ، وَأَنْتَ الْأَعَزُّ الْأَكْرَمُ",
        transliteration: "Allahumma-ghfir warham wa'fu 'amma ta'lam, wa antal-a'azzul-akram",
        translation: "O Allah, forgive, have mercy, and pardon what You know, and You are the Most Mighty, Most Generous"
      },
      {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
        translation: "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire"
      }
    ],
    tips: [
      "Start Tawaf only when you have wudu (highly recommended by majority of scholars)",
      "If unsure of circuit count, assume the lesser number",
      "Upper floors are less crowded but take longer",
      "Wheelchair accessible paths and wheelchairs are available",
      "Avoid peak times: immediately after prayers and Fridays",
      "Best times: late night, early morning, between Dhuhr and Asr",
      "Stay hydrated but use restroom before starting",
      "Don't push or shove - maintain Islamic etiquette",
      "If with family, hold hands or stay close to avoid separation",
      "Download a Tawaf counter app if you lose count easily",
      "Focus on worship, not photography",
      "Be patient with crowds - it's a test and part of the worship"
    ]
  },
  {
    id: 3,
    title: "Sa'i - The Struggle Between Safa and Marwah",
    description: "Walk between the hills of Safa and Marwah seven times",
    fullDescription: "Sa'i commemorates the desperate search of Hajar (Hagar), wife of Prophet Ibrahim, for water for her infant son Ismail. Left alone in the barren valley of Makkah, she ran seven times between the two hills of Safa and Marwah, looking for water or help. Her trust in Allah was rewarded when the angel Jibreel struck the ground, causing the blessed Zamzam spring to gush forth. This act teaches us about trust in Allah (tawakkul), patience in hardship, and that sincere effort combined with faith brings Allah's help. The Sa'i is now performed in an air-conditioned gallery with marble floors, but the spiritual significance remains profound.",
    duration: "45-60 minutes",
    steps: [
      "PROCEEDING TO SAFA:\n• After Tawaf and 2 rak'ah prayer, head to Safa (signs clearly mark the way)\n• As you approach Safa, recite once:\n  'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ'\n  'Innas-Safa wal-Marwata min sha'a'irillah'\n  'Indeed, Safa and Marwah are among the symbols of Allah' (Quran 2:158)\n• Then say: 'أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ' (Abda'u bima bada'Allahu bih)\n  'I begin with what Allah began with' (since Allah mentioned Safa first)\n• You only recite these when first approaching Safa, not on subsequent returns",
      "AT SAFA HILL (Starting Point):\n• Climb up Safa hill as much as you comfortably can\n• Face the Kaaba (you can see it through the opening)\n• Raise your hands in dua position\n• Recite 3 times:\n  'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ'\n  'Allahu Akbar, Allahu Akbar, Allahu Akbar'\n• Then recite:\n  'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'\n  'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir'\n  'There is no god but Allah alone, no partner has He. His is the dominion and His is the praise, and He has power over all things'\n• Continue:\n  'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ'\n  'La ilaha illallahu wahdah, anjaza wa'dah, wa nasara 'abdah, wa hazamal-ahzaba wahdah'\n  'There is no god but Allah alone. He fulfilled His promise, helped His servant, and defeated the confederates alone'\n• Make personal duas for yourself, family, and Ummah\n• Repeat the above dhikr and dua 3 times total (this is Sunnah)",
      "WALKING FROM SAFA TO MARWAH (First Trip):\n• Descend from Safa and start walking towards Marwah\n• The distance is approximately 450 meters\n• Make any dhikr and dua you wish while walking\n• No specific dua is prescribed for the walking\n• Suggestions for dhikr/dua while walking:\n  - Recite Quran\n  - Make istighfar (seek forgiveness)\n  - Send salawat on Prophet ﷺ\n  - Make personal duas in any language\n  - Recite: 'رَبِّ اغْفِرْ وَارْحَمْ، إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ'\n    'Rabbighfir warham, innaka antal-a'azzul-akram'\n    'My Lord, forgive and have mercy. You are the Most Mighty, Most Noble'",
      "GREEN LIGHTS SECTION (Men Only - Ramal):\n• Between Safa and Marwah, you'll notice green lights/markers on the walls\n• This marks where the valley was lowest in Hajar's time\n• MEN ONLY: Run/jog lightly between these green markers\n  - This is called 'Ramal' or 'Harwalah'\n  - It commemorates Hajar's urgent running in the valley\n  - Don't push or hurt others while running\n  - If too crowded, just walk faster\n• WOMEN: Continue walking normally (no running)\n• This applies in both directions (Safa to Marwah and back)",
      "AT MARWAH HILL:\n• When you reach Marwah, climb up as you did at Safa\n• Face the Kaaba direction (though you can't see it from here)\n• Raise your hands and repeat the same dhikr and duas as at Safa:\n  - Takbir 3 times\n  - La ilaha illallah... (as mentioned above)\n  - Personal duas\n• This completes your FIRST trip of Sa'i\n• You have 6 more trips to complete",
      "RETURNING FROM MARWAH TO SAFA (Second Trip):\n• Descend from Marwah and walk back towards Safa\n• This return journey is your SECOND trip\n• Again, men should run/jog between the green markers\n• Continue dhikr and duas while walking\n• When you reach Safa, repeat the same actions (climb, face Kaaba, dhikr, dua)",
      "COMPLETING ALL 7 TRIPS:\n• Continue back and forth:\n  - Trip 1: Safa → Marwah\n  - Trip 2: Marwah → Safa\n  - Trip 3: Safa → Marwah\n  - Trip 4: Marwah → Safa\n  - Trip 5: Safa → Marwah\n  - Trip 6: Marwah → Safa\n  - Trip 7: Safa → Marwah (ENDING AT MARWAH)\n• Total: 4 times at Safa, 4 times at Marwah\n• Make dhikr and dua at each hill\n• The 7th trip ends at Marwah - you're now done with Sa'i",
      "AFTER COMPLETING SA'I:\n• At Marwah after 7th trip, make final dua\n• No specific prayer is required after Sa'i\n• Men should now proceed to have their hair cut (next step)\n• Women should also proceed to trim their hair\n• Until hair is cut, Ihram restrictions still apply"
    ],
    duas: [
      {
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu yuhyi wa yumitu wa huwa 'ala kulli shay'in qadir",
        translation: "There is no god but Allah alone, no partner has He. His is the dominion and His is the praise. He gives life and causes death, and He has power over all things"
      },
      {
        arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَاعْفُ عَمَّا تَعْلَمُ، إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ",
        transliteration: "Rabbighfir warham wa'fu 'amma ta'lam, innaka antal-a'azzul-akram",
        translation: "My Lord, forgive, have mercy, and pardon what You know. Indeed, You are the Most Mighty, Most Noble"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        transliteration: "Allahumma inni as'aluka min fadlik",
        translation: "O Allah, I ask You from Your bounty"
      }
    ],
    tips: [
      "Wudu is NOT required for Sa'i (unlike Tawaf)",
      "If prayer time comes, pray then continue from where you stopped",
      "Use the middle floor if ground floor is too crowded",
      "Wheelchair paths and wheelchairs are available",
      "Electric carts are available for elderly/disabled",
      "Stay hydrated - water stations are available throughout",
      "Count trips on your fingers or use a counter",
      "If confused about count, consider the lesser number",
      "The path is air-conditioned and has a marble floor",
      "Avoid rush hours right after congregational prayers",
      "You can take breaks if tired - sit on the sides",
      "Keep making dua throughout - this is a blessed time",
      "Remember Hajar's struggle and trust in Allah",
      "If separated from group, meet at Marwah end"
    ]
  },
  {
    id: 4,
    title: "Halq/Taqsir - Completing the Umrah",
    description: "Shave or trim hair to exit the state of Ihram",
    fullDescription: "Halq (complete shaving) or Taqsir (trimming) of the hair marks the completion of Umrah and the end of Ihram restrictions. This act symbolizes humility, renewal, and the shedding of sins. The Prophet ﷺ said that for every hair that falls, a sin is forgiven and a good deed is recorded. Men have the choice between completely shaving their heads (Halq) which carries greater reward, or trimming their hair evenly (Taqsir). Women are required to trim only a small portion. This final act represents spiritual rebirth and the completion of this blessed journey.",
    duration: "15-30 minutes",
    steps: [
      "LOCATION FOR HAIR CUTTING:\n• After completing Sa'i at Marwah, you can cut hair anywhere\n• Many prefer to exit the mosque first for convenience\n• Barber shops are available around the Haram (for men)\n• Women can cut their own hair or have a mahram/female help them\n• Some hotels provide barber services\n• You can also do it yourself if you have scissors/razor",
      "FOR MEN - CHOOSING BETWEEN HALQ AND TAQSIR:\n• HALQ (Complete Shaving) - PREFERRED:\n  - Shave entire head with razor\n  - Start from right side (Sunnah)\n  - Must be complete shaving, not just very short trim\n  - Prophet ﷺ made dua three times for those who shave\n  - Greater reward and complete humility\n  - Sunnah of Prophet ﷺ during his Umrah\n\n• TAQSIR (Trimming):\n  - Cut hair evenly from all around the head\n  - Must be from entire head, not just one side\n  - Should be visible cutting (at least fingernail length)\n  - Sufficient but less reward than shaving\n  - Prophet ﷺ made dua once for those who trim",
      "FOR WOMEN - TRIMMING ONLY:\n• Women only trim, never shave\n• Gather hair and cut approximately one inch (fingertip length)\n• Can cut from the end of a ponytail or braid\n• Should be done in privacy\n• If hair is in multiple braids, cut from each braid\n• The amount should be visible (about 2-3 cm)\n• Can be done by herself or with help from mahram/woman",
      "THE ACTUAL CUTTING PROCESS:\n• Make intention: 'O Allah, I'm completing my Umrah for Your sake'\n• Start with Bismillah\n• For men shaving: Start from right side of head\n• Can recite: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ'\n  'Allahumma-ghfir li dhanbi kullah'\n  'O Allah, forgive all my sins'\n• Complete the cutting/shaving\n• Make dua for acceptance",
      "EXITING IHRAM - RESTRICTIONS NOW LIFTED:\n• Congratulations! Your Umrah is now complete\n• All Ihram restrictions are now lifted:\n  - Can wear regular clothes\n  - Can use perfume and scented products\n  - Can cut nails and hair normally\n  - Marital relations are permissible\n  - Can cover head (men)\n  - Can wear stitched clothes (men)\n• Take a shower and change into regular clothes\n• Apply perfume if desired\n• Thank Allah for this blessing",
      "AFTER COMPLETING UMRAH:\n• Make dua of gratitude: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ'\n  'Alhamdulillahil-ladhi bi ni'matihi tatimmus-salihat'\n  'Praise be to Allah by Whose grace good deeds are completed'\n• Your Umrah is complete, but stay for more worship if possible\n• Perform many voluntary prayers in the Haram\n• Do additional Tawaf (nafl tawaf) for extra rewards\n• Continue making dua and dhikr\n• Visit historical sites if time permits"
    ],
    duas: [
      {
        arabic: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَتَقَبَّلْ عُمْرَتِي",
        transliteration: "Allahumma-ghfir li warhamni wa taqabbal 'umrati",
        translation: "O Allah, forgive me, have mercy on me, and accept my Umrah"
      },
      {
        arabic: "اللَّهُمَّ اجْعَلْهَا عُمْرَةً مَبْرُورَةً وَذَنْبًا مَغْفُورًا وَسَعْيًا مَشْكُورًا",
        transliteration: "Allahumma-j'alha 'umratan mabrurah wa dhanban maghfuran wa sa'yan mashkuran",
        translation: "O Allah, make it an accepted Umrah, with forgiven sins and appreciated effort"
      }
    ],
    tips: [
      "Barber services are available 24/7 near the Haram",
      "Prices for haircuts vary - agree on price beforehand",
      "Free shaving services are sometimes available",
      "If doing it yourself, ensure you have proper tools",
      "Women should maintain privacy while cutting hair",
      "Save some hair as a blessed reminder if you wish",
      "Take before/after photos to remember this moment",
      "Shaving completely (men) is Sunnah and has more reward",
      "If you accidentally cut yourself, no penalty is required",
      "You can now perform another Umrah if you wish (after going to Tan'eem)"
    ]
  },
  {
    id: 5,
    title: "Zamzam Water - The Blessed Spring",
    description: "Drink and benefit from the miraculous water of Zamzam",
    fullDescription: "Zamzam water emerged miraculously for Hajar and her infant son Ismail in the barren desert of Makkah. This blessed water has been flowing continuously for over 4000 years, defying geological explanations. The Prophet ﷺ said: 'The water of Zamzam is for whatever purpose it is drunk for.' He also said: 'It is blessed water, it is food that satisfies and healing for illness.' Scientific studies have shown Zamzam water has unique properties - it's naturally pure, has higher levels of calcium and magnesium, and has never been chemically treated or chlorinated. Drinking Zamzam is not obligatory for Umrah but is a highly recommended Sunnah act.",
    duration: "10-15 minutes",
    steps: [
      "LOCATING ZAMZAM WATER:\n• Zamzam taps and coolers are located throughout Masjid al-Haram\n• Look for marked Zamzam stations (clearly labeled)\n• Available on all floors of the mosque\n• Containers and cups are usually provided\n• The old Zamzam well is now covered and visible through glass near Tawaf area\n• Water is pumped and distributed throughout the mosque",
      "ETIQUETTE OF DRINKING ZAMZAM:\n• Make wudu first if possible (not required but good)\n• Face the Qibla (Kaaba) while drinking\n• Stand while drinking (Sunnah for Zamzam, though sitting is permissible)\n• Say 'Bismillah' before drinking\n• Drink in three sips/breaths (Sunnah)\n• Breathe outside the container between sips\n• Drink to your fill - Prophet ﷺ said: 'The sign of distinction between us and hypocrites is drinking Zamzam to one's fill'\n• Say 'Alhamdulillah' after drinking",
      "MAKING DUA WHILE DRINKING:\n• Make intention for what you're drinking it for\n• The Prophet ﷺ said Zamzam is for whatever it's drunk for:\n  - Healing from illness\n  - Seeking knowledge\n  - Strengthening faith\n  - Forgiveness of sins\n  - Success in this world and hereafter\n  - Any permissible need or wish\n• Ibn Abbas used to say when drinking:\n  'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ'\n  'O Allah, I ask You for beneficial knowledge, abundant provision, and healing from every disease'",
      "OTHER USES OF ZAMZAM:\n• Pour some over your head and body\n• Prophet ﷺ poured Zamzam over his head\n• Can be used for wudu (ablution)\n• Sprinkle on sick person for healing\n• Give to others as a blessed gift\n• Can be mixed with regular water to bless it\n• Safe for babies and can be given to newborns",
      "TAKING ZAMZAM HOME:\n• Allowed to take Zamzam water home\n• 5-liter containers available for purchase near Haram\n• Check airline regulations for liquid allowances\n• Can be purchased at airports in Saudi Arabia\n• Share with family and friends as blessed gifts\n• No expiry date - remains fresh indefinitely\n• Store in clean containers",
      "SCIENTIFIC FACTS ABOUT ZAMZAM:\n• Never runs dry despite millions drinking daily\n• No algae or biological growth despite age\n• Higher levels of calcium and magnesium than regular water\n• Naturally alkaline (pH ~8)\n• Free from bacteria and impurities\n• Taste remains consistent over centuries\n• Fluoride levels that benefit teeth\n• Helps in digestion and increases energy"
    ],
    duas: [
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'an wa rizqan wasi'an wa shifa'an min kulli da'in",
        translation: "O Allah, I ask You for beneficial knowledge, abundant provision, and healing from every disease"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَطَشِ يَوْمَ الْقِيَامَةِ",
        transliteration: "Allahumma inni a'udhu bika minal-'atashi yawmal-qiyamah",
        translation: "O Allah, I seek refuge in You from thirst on the Day of Resurrection"
      },
      {
        arabic: "بِسْمِ اللَّهِ اللَّهُمَّ اجْعَلْهُ عِلْمًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
        transliteration: "Bismillah, Allahumma-j'alhu 'ilman wa rizqan tayyiban wa 'amalan mutaqabbalan",
        translation: "In the name of Allah, O Allah make it knowledge, pure provision, and accepted deeds"
      }
    ],
    tips: [
      "Zamzam is freely available - never pay for it inside the mosque",
      "Drink as much as you can - it's Sunnah to drink to your fill",
      "Best times to drink: after Tawaf, after Sa'i, before leaving Makkah",
      "Can be drunk at any time, not just during Umrah",
      "Share with fellow pilgrims - it's a blessed act",
      "If taking home, wrap bottles carefully to prevent leakage",
      "Zamzam can be given to non-Muslims as a gift",
      "No special prayer required, any dua is acceptable",
      "The Prophet ﷺ used to carry Zamzam water to Madinah",
      "Scholars drank Zamzam for memory and knowledge"
    ]
  },
  {
    id: 6,
    title: "Prayers in Masjid al-Haram",
    description: "Maximize rewards through prayers in the Sacred Mosque",
    fullDescription: "Masjid al-Haram is the holiest mosque in Islam, and prayers offered here carry extraordinary rewards. The Prophet ﷺ said: 'One prayer in my mosque is better than 1,000 prayers elsewhere, except in Masjid al-Haram, where one prayer is better than 100,000 prayers elsewhere.' This means a single obligatory prayer in Masjid al-Haram equals approximately 200 years of prayers elsewhere! The mosque never closes, allowing worship 24/7. Beyond the multiplied rewards, praying while viewing the Kaaba, the first house of worship built for humanity, creates an unparalleled spiritual experience that strengthens faith and connection with Allah.",
    duration: "Continuous throughout stay",
    steps: [
      "UNDERSTANDING THE REWARDS:\n• 1 prayer in Masjid al-Haram = 100,000 prayers elsewhere\n• This applies to obligatory (fard) prayers\n• Scholars differ on whether it applies to voluntary prayers\n• 5 daily prayers here = 500,000 prayers (approximately 274 years)\n• Even greater rewards during Ramadan\n• Every good deed is multiplied in the Haram\n• Bad deeds are not multiplied (Allah's mercy)",
      "PRAYER TIMES AND PREPARATION:\n• Download 'Haramain' app for accurate prayer times\n• Adhan is called 20-30 minutes before prayer\n• Arrive at least 30-45 minutes early for good spots\n• For Jummah, arrive 1-2 hours early\n• Perform wudu at your hotel if possible (crowded at mosque)\n• Bring a small prayer mat or use mosque carpets\n• Keep shoes in provided racks or carry in a bag",
      "FINDING YOUR SPOT:\n• Ground floor (closest to Kaaba):\n  - Most crowded but most rewarding\n  - Best spiritual experience\n  - Difficult to find space near prayer times\n• First floor:\n  - Good balance of proximity and space\n  - Easier to find spots\n  - Still excellent view of Kaaba\n• Roof level:\n  - Most spacious\n  - Cooler in hot weather\n  - Further from Kaaba but still full reward\n• Choose based on your physical ability and crowd tolerance",
      "PRAYING BEHIND THE IMAM:\n• The Imam's beautiful recitation enhances khushu (concentration)\n• Follow the Imam carefully - don't precede him\n• Rows are very long - you might hear echo\n• Watch others if you lose track\n• After prayer, Imam makes dua - say Ameen\n• Common for people to cry during prayers (emotional experience)\n• Maintain focus despite distractions",
      "SUNNAH AND VOLUNTARY PRAYERS:\n• Tahiyyat al-Masjid (2 rak'ah upon entering):\n  - Can be combined with Tawaf if you do Tawaf first\n• Sunnah prayers before/after fard:\n  - Fajr: 2 rak'ah before\n  - Dhuhr: 4 before, 2 after\n  - Asr: 4 before (optional)\n  - Maghrib: 2 after\n  - Isha: 2 after\n• Tahajjud (night prayer):\n  - Special tahajjud prayers led by Imam\n  - Usually starts 1-2 hours before Fajr\n  - Extremely rewarding and emotional\n• Ishraq (after sunrise) and Duha prayers",
      "SPECIAL PRAYERS AND OCCASIONS:\n• JUMMAH (FRIDAY) PRAYER:\n  - Arrive very early (1-2 hours)\n  - Khutbah in Arabic (translation apps available)\n  - Extremely crowded - overflow areas outside\n  - Special reward for Jummah in Haram\n\n• TARAWEEH (RAMADAN):\n  - 20 rak'ah led by renowned reciters\n  - Entire Quran completed in month\n  - Witr prayer at end\n  - Arrive 2+ hours early\n\n• ECLIPSE PRAYER:\n  - Performed during solar/lunar eclipse\n  - Very long recitation\n  - Rare and special experience",
      "ETIQUETTE AND TIPS:\n• Maintain wudu throughout your stay\n• Don't reserve spots with prayer mats\n• Make space for others - compress rows\n• Avoid walking in front of people praying\n• Keep phones on silent/airplane mode\n• Don't take photos/videos during prayer\n• Help elderly find spots\n• Be patient with crowds - it's a test\n• Use time between prayers for Quran, dhikr, dua\n• Stay after fard prayers for dhikr and dua"
    ],
    duas: [
      {
        arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Rabbana taqabbal minna innaka antas-sami'ul-'alim",
        translation: "Our Lord, accept from us. Indeed, You are the All-Hearing, All-Knowing"
      },
      {
        arabic: "اللَّهُمَّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي",
        transliteration: "Allahumma-j'alni muqimas-salati wa min dhurriyyati",
        translation: "O Allah, make me an establisher of prayer, and from my descendants"
      }
    ],
    tips: [
      "Use Haramain app for prayer times and live streaming",
      "Pray on marble during hot days - carpet gets very hot",
      "Carry a small bag for shoes and belongings",
      "Stay hydrated between prayers",
      "Upper floors have better air conditioning",
      "Exit gates get crowded immediately after prayers",
      "Best time for peaceful prayer: between Isha and Fajr",
      "Join the Imam even if you missed some rak'ah",
      "Women's sections are marked - usually behind or sides",
      "Security may close certain areas - follow their guidance",
      "Don't rush - you're in the holiest place on Earth"
    ]
  },
  {
    id: 7,
    title: "Additional Worship & Completion",
    description: "Maximize your time in the sacred city",
    fullDescription: "While your Umrah is complete after Halq/Taqsir, your journey of worship in Makkah continues. Every moment in this blessed city is an opportunity for immense rewards. The Prophet ﷺ said: 'The most beloved places to Allah are the mosques.' Masjid al-Haram offers unique opportunities for worship that cannot be performed anywhere else in the world. From voluntary Tawaf to intense dua sessions, from reciting Quran while viewing the Kaaba to helping fellow pilgrims, every act of worship here is magnified. Make the most of every moment before you leave this sacred sanctuary.",
    duration: "Throughout your stay",
    steps: [
      "VOLUNTARY TAWAF (NAFL TAWAF):\n• You can perform additional Tawaf anytime\n• Each Tawaf equals freeing a slave (huge reward)\n• No Ihram required for voluntary Tawaf\n• Must have wudu\n• Follow same method as Umrah Tawaf\n• Pray 2 rak'ah after each Tawaf\n• Best times: late night, early morning\n• Can be done on behalf of deceased relatives\n• No limit to number of Tawaf you can perform",
      "SPECIAL PLACES FOR DUA:\n• MULTAZAM (Between Black Stone and Door of Kaaba):\n  - Place where duas are especially accepted\n  - Press chest, face, arms against the wall if possible\n  - Make intense dua here\n  - Very crowded - try during quiet hours\n\n• HIJR ISMAIL (Semi-circular area near Kaaba):\n  - Part of the original Kaaba\n  - Praying here is like praying inside the Kaaba\n  - Make dua and pray nafl here\n\n• BEHIND MAQAM IBRAHIM:\n  - After any Tawaf\n  - Special place for accepted duas\n\n• While looking at the Kaaba:\n  - Any time you look at Kaaba is worship\n  - Make continuous dua while viewing it\n\n• During Tawaf and Sa'i:\n  - Continuous state of accepted dua",
      "QURAN RECITATION:\n• Reciting Quran while viewing Kaaba has special merit\n• Complete the Quran if possible during your stay\n• Each letter recited = 10 rewards, multiplied by 100,000\n• Join Quran circles if available\n• Best spots: upper floors for quiet recitation\n• Reflect on meanings while in this holy place\n• Make dua after recitation",
      "DHIKR AND TASBEEH:\n• Constant remembrance of Allah\n• Recommended dhikr:\n  - SubhanAllah (33x)\n  - Alhamdulillah (33x)\n  - Allahu Akbar (34x)\n  - La ilaha illallah\n  - Astaghfirullah\n  - Salawat on Prophet ﷺ\n• Walking to/from hotel is time for dhikr\n• Use waiting time for dhikr\n• Dhikr while doing Tawaf of Kaaba with eyes",
      "SERVING OTHER PILGRIMS:\n• Help elderly with wheelchairs\n• Distribute Zamzam water\n• Guide lost pilgrims\n• Share food/dates with others\n• Teach Umrah procedures to first-timers\n• Give up your spot for elderly/disabled\n• Every act of kindness is multiplied here\n• The Prophet ﷺ said: 'The best of people are those who benefit others'",
      "SEEKING FORGIVENESS:\n• This is the best place for Tawbah (repentance)\n• Make a list of sins to seek forgiveness for\n• Cry if you can - tears of repentance are beloved\n• Make sincere intention to never return to sins\n• Ask Allah to accept your repentance\n• Forgive others who have wronged you\n• Make dua for those you may have hurt",
      "BEFORE LEAVING MAKKAH:\n• Perform farewell Tawaf (Tawaf al-Wada) - recommended\n• Make final duas at Multazam\n• Drink Zamzam one last time\n• Take mental/spiritual snapshot of Kaaba\n• Ask Allah to invite you back\n• Make intention to implement changes in life\n• Leave with right foot, make dua:\n  'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ'\n  'Bismillahi was-salatu was-salamu 'ala Rasulillah, Allahumma inni as'aluka min fadlik'\n  'In Allah's name, prayers and peace upon Allah's Messenger. O Allah, I ask You from Your bounty'"
    ],
    duas: [
      {
        arabic: "اللَّهُمَّ لَا تَجْعَلْهُ آخِرَ الْعَهْدِ بِبَيْتِكَ الْحَرَامِ",
        transliteration: "Allahumma la taj'alhu akhiral-'ahdi bi-baytikal-haram",
        translation: "O Allah, do not make this my last visit to Your Sacred House"
      },
      {
        arabic: "اللَّهُمَّ ارْزُقْنِي الْعَوْدَةَ إِلَى بَيْتِكَ الْحَرَامِ مَرَّاتٍ وَمَرَّاتٍ",
        transliteration: "Allahummar-zuqnil-'awdata ila baytikal-harami marratin wa marrat",
        translation: "O Allah, grant me return to Your Sacred House again and again"
      },
      {
        arabic: "اللَّهُمَّ تَقَبَّلْ مِنَّا وَاغْفِرْ لَنَا وَلِوَالِدَيْنَا وَلِجَمِيعِ الْمُسْلِمِينَ",
        transliteration: "Allahumma taqabbal minna waghfir lana wa li-walidayna wa li-jami'il-muslimin",
        translation: "O Allah, accept from us and forgive us, our parents, and all Muslims"
      }
    ],
    tips: [
      "No limit on Umrahs - can perform multiple (go to Tan'eem/Masjid Aisha for new Ihram)",
      "Combine Umrah for deceased relatives (make intention for them)",
      "Best time for everything: last third of night",
      "Make a dua list before going - don't forget anyone",
      "Take photos for memories but don't waste worship time",
      "Buy gifts (prayer mats, dates, Zamzam) for loved ones",
      "Journal your spiritual experiences",
      "Make friends with pilgrims from around the world",
      "Learn from scholars if lectures are available",
      "Visit historical sites if time permits (Cave Hira, Jabal Rahmah, etc.)",
      "Most importantly: Don't waste a single moment in this blessed place",
      "Return home as a better person - that's the real success"
    ]
  }
];