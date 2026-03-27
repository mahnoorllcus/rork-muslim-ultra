import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Calendar, Star, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react-native";

interface IslamicEvent {
  date: string;
  hijriDate: string;
  title: string;
  description: string;
  type: "hajj" | "eid" | "holy" | "fast";
  color: string;
}

export default function IslamicCalendarScreen() {
  const { width } = useWindowDimensions();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [viewMode, setViewMode] = useState<'calendar' | 'events'>('calendar');

  const islamicEvents: IslamicEvent[] = useMemo(() => [
    {
      date: "March 11, 2024",
      hijriDate: "1 Ramadan 1445",
      title: "First Day of Ramadan",
      description: "Beginning of the holy month of fasting",
      type: "fast",
      color: "#4CAF50",
    },
    {
      date: "March 27, 2024",
      hijriDate: "17 Ramadan 1445",
      title: "Nuzul Al-Quran",
      description: "Revelation of the Quran",
      type: "holy",
      color: "#2196F3",
    },
    {
      date: "April 6, 2024",
      hijriDate: "27 Ramadan 1445",
      title: "Laylat al-Qadr",
      description: "Night of Power (estimated)",
      type: "holy",
      color: "#9C27B0",
    },
    {
      date: "April 10, 2024",
      hijriDate: "1 Shawwal 1445",
      title: "Eid al-Fitr",
      description: "Festival of Breaking the Fast",
      type: "eid",
      color: "#FF9800",
    },
    {
      date: "June 7, 2024",
      hijriDate: "1 Dhul Hijjah 1445",
      title: "Start of Dhul Hijjah",
      description: "Beginning of Hajj month",
      type: "hajj",
      color: "#FF5252",
    },
    {
      date: "June 15, 2024",
      hijriDate: "9 Dhul Hijjah 1445",
      title: "Day of Arafah",
      description: "Most important day of Hajj",
      type: "hajj",
      color: "#FF5252",
    },
    {
      date: "June 16, 2024",
      hijriDate: "10 Dhul Hijjah 1445",
      title: "Eid al-Adha",
      description: "Festival of Sacrifice",
      type: "eid",
      color: "#FF9800",
    },
    {
      date: "July 7, 2024",
      hijriDate: "1 Muharram 1446",
      title: "Islamic New Year",
      description: "Beginning of year 1446 AH",
      type: "holy",
      color: "#00BCD4",
    },
    {
      date: "July 16, 2024",
      hijriDate: "10 Muharram 1446",
      title: "Day of Ashura",
      description: "Day of remembrance",
      type: "holy",
      color: "#607D8B",
    },
    {
      date: "September 15, 2024",
      hijriDate: "12 Rabi' al-Awwal 1446",
      title: "Mawlid an-Nabi",
      description: "Birth of Prophet Muhammad ﷺ",
      type: "holy",
      color: "#4CAF50",
    },
    {
      date: "January 26, 2025",
      hijriDate: "27 Rajab 1446",
      title: "Isra and Mi'raj",
      description: "Night Journey of Prophet ﷺ",
      type: "holy",
      color: "#9C27B0",
    },
    {
      date: "February 14, 2025",
      hijriDate: "15 Sha'ban 1446",
      title: "Laylat al-Bara'at",
      description: "Night of Forgiveness",
      type: "holy",
      color: "#2196F3",
    },
  ], []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "hajj":
        return Calendar;
      case "eid":
        return Star;
      case "fast":
        return Moon;
      default:
        return Sun;
    }
  };

  // Hijri calendar conversion (simplified approximation)
  const getHijriDate = (gregorianDate: Date) => {
    const hijriEpoch = new Date('622-07-16'); // Approximate start of Hijri calendar
    const daysDiff = Math.floor((gregorianDate.getTime() - hijriEpoch.getTime()) / (1000 * 60 * 60 * 24));
    const hijriYear = Math.floor(daysDiff / 354.37) + 1; // Hijri year is ~354.37 days
    const dayOfYear = daysDiff % 354;
    const hijriMonth = Math.floor(dayOfYear / 29.5) + 1;
    const hijriDay = Math.floor(dayOfYear % 29.5) + 1;
    
    const hijriMonths = [
      'Muharram', 'Safar', 'Rabi\'al-Awwal', 'Rabi\'al-Thani',
      'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
      'Ramadan', 'Shawwal', 'Dhul Qi\'dah', 'Dhul Hijjah'
    ];
    
    return {
      day: Math.max(1, Math.min(29, hijriDay)),
      month: hijriMonths[Math.max(0, Math.min(11, hijriMonth - 1))],
      monthNumber: Math.max(1, Math.min(12, hijriMonth)),
      year: hijriYear
    };
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const hijriDate = getHijriDate(date);
      const hasEvent = islamicEvents.some(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });
      
      days.push({
        day,
        date,
        hijriDate,
        hasEvent,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString()
      });
    }
    
    return days;
  }, [currentMonth, currentYear, selectedDate, islamicEvents]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const upcomingEvents = islamicEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate >= today;
  }).slice(0, 3);

  const groupedEvents = islamicEvents.reduce((acc, event) => {
    if (!event?.date?.trim()) return acc;
    const month = new Date(event.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {} as Record<string, IslamicEvent[]>);

  const selectedDateEvents = islamicEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "Islamic Calendar",
          headerStyle: { backgroundColor: "#9C27B0" },
          headerTintColor: "#FFFFFF",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* View Mode Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'calendar' && styles.toggleButtonActive]}
            onPress={() => setViewMode('calendar')}
          >
            <Calendar size={20} color={viewMode === 'calendar' ? '#FFFFFF' : '#9C27B0'} />
            <Text style={[styles.toggleText, viewMode === 'calendar' && styles.toggleTextActive]}>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'events' && styles.toggleButtonActive]}
            onPress={() => setViewMode('events')}
          >
            <Star size={20} color={viewMode === 'events' ? '#FFFFFF' : '#9C27B0'} />
            <Text style={[styles.toggleText, viewMode === 'events' && styles.toggleTextActive]}>Events</Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'calendar' ? (
          <>
            {/* Calendar Header */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
                <ChevronLeft size={24} color="#9C27B0" />
              </TouchableOpacity>
              <View style={styles.monthYearContainer}>
                <Text style={styles.monthYearText}>
                  {monthNames[currentMonth]} {currentYear}
                </Text>
                <Text style={styles.hijriMonthText}>
                  {getHijriDate(new Date(currentYear, currentMonth, 15)).month} {getHijriDate(new Date(currentYear, currentMonth, 15)).year} AH
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
                <ChevronRight size={24} color="#9C27B0" />
              </TouchableOpacity>
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarContainer}>
              {/* Day Names Header */}
              <View style={styles.dayNamesRow}>
                {dayNames.map((dayName) => (
                  <Text key={dayName} style={styles.dayNameText}>
                    {dayName}
                  </Text>
                ))}
              </View>

              {/* Calendar Days */}
              <View style={styles.calendarGrid}>
                {calendarDays.map((dayData, index) => {
                  if (!dayData) {
                    return <View key={`empty-${index}`} style={[styles.emptyDay, { width: (width - 70) / 7 }]} />;
                  }

                  return (
                    <TouchableOpacity
                      key={`day-${dayData.day}-${currentMonth}-${currentYear}`}
                      style={[
                        styles.dayCell,
                        { width: (width - 70) / 7 },
                        dayData.isToday && styles.todayCell,
                        dayData.isSelected && styles.selectedCell,
                        dayData.hasEvent && styles.eventCell,
                      ]}
                      onPress={() => setSelectedDate(dayData.date)}
                    >
                      <Text style={[
                        styles.calendarDayNumber,
                        dayData.isToday && styles.todayText,
                        dayData.isSelected && styles.selectedText,
                      ]}>
                        {dayData.day}
                      </Text>
                      <Text style={[
                        styles.hijriDayNumber,
                        dayData.isToday && styles.todayHijriText,
                        dayData.isSelected && styles.selectedHijriText,
                      ]}>
                        {dayData.hijriDate.day}
                      </Text>
                      {dayData.hasEvent && <View style={styles.eventDot} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Selected Date Info */}
            <View style={styles.selectedDateInfo}>
              <Text style={styles.selectedDateTitle}>Selected Date</Text>
              <Text style={styles.selectedDateText}>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              <Text style={styles.selectedDateHijriText}>
                {getHijriDate(selectedDate).day} {getHijriDate(selectedDate).month} {getHijriDate(selectedDate).year} AH
              </Text>
              
              {selectedDateEvents.length > 0 && (
                <View style={styles.selectedDateEvents}>
                  <Text style={styles.eventsTitle}>Events on this day:</Text>
                  {selectedDateEvents.map((event, index) => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <View key={`selected-${event.title}-${index}`} style={styles.eventItem}>
                        <Icon size={16} color={event.color} />
                        <Text style={[styles.eventItemText, { color: event.color }]}>
                          {event.title}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </>
        ) : (
          <>
            <View style={styles.upcomingSection}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              {upcomingEvents.map((event, index) => {
                const Icon = getEventIcon(event.type);
                return (
                  <View key={`upcoming-${event.title}-${index}`} style={styles.upcomingCard}>
                    <View style={[styles.iconContainer, { backgroundColor: `${event.color}20` }]}>
                      <Icon size={24} color={event.color} />
                    </View>
                    <View style={styles.eventContent}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventDate}>{event.date}</Text>
                      <Text style={styles.hijriDate}>{event.hijriDate}</Text>
                      <Text style={styles.eventDescription}>{event.description}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.allEventsSection}>
              <Text style={styles.sectionTitle}>All Islamic Events {currentYear}</Text>
              {Object.entries(groupedEvents).map(([month, events]) => (
                <View key={month}>
                  <Text style={styles.monthTitle}>{month}</Text>
                  {events.map((event, index) => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <TouchableOpacity
                        key={`event-${event.title}-${index}`}
                        style={styles.eventCard}
                        activeOpacity={0.7}
                        onPress={() => {
                          setSelectedDate(new Date(event.date));
                          setViewMode('calendar');
                        }}
                      >
                        <View style={styles.dateContainer}>
                          <Text style={styles.eventDayNumber}>
                            {new Date(event.date).getDate()}
                          </Text>
                          <Text style={styles.dayName}>
                            {new Date(event.date).toLocaleString('default', { weekday: 'short' })}
                          </Text>
                        </View>
                        <View style={styles.eventInfo}>
                          <View style={styles.eventHeader}>
                            <Icon size={16} color={event.color} />
                            <Text style={[styles.eventName, { color: event.color }]}>
                              {event.title}
                            </Text>
                          </View>
                          <Text style={styles.hijriDateSmall}>{event.hijriDate}</Text>
                          <Text style={styles.eventDesc}>{event.description}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Note:</Text>
          <Text style={styles.infoText}>
            • Islamic dates may vary by 1-2 days based on moon sighting
          </Text>
          <Text style={styles.infoText}>
            • Dates are approximate and subject to official announcements
          </Text>
          <Text style={styles.infoText}>
            • Local timings may differ based on your location
          </Text>
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
  toggleContainer: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#9C27B0',
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#9C27B0',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButton: {
    padding: 8,
  },
  monthYearContainer: {
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  hijriMonthText: {
    fontSize: 14,
    color: '#4CAF50',
    fontStyle: 'italic',
    marginTop: 2,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dayNameText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    height: 60,
  },
  dayCell: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 5,
    position: 'relative',
  },
  todayCell: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  selectedCell: {
    backgroundColor: '#9C27B0',
  },
  eventCell: {
    backgroundColor: '#FFF3E0',
  },
  calendarDayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  hijriDayNumber: {
    fontSize: 10,
    color: '#4CAF50',
    marginTop: 2,
  },
  todayText: {
    color: '#2196F3',
  },
  todayHijriText: {
    color: '#2196F3',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  selectedHijriText: {
    color: '#FFFFFF',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF9800',
  },
  selectedDateInfo: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  selectedDateHijriText: {
    fontSize: 14,
    color: '#4CAF50',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  selectedDateEvents: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
  eventsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventItemText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  upcomingSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  upcomingCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  eventDate: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  hijriDate: {
    fontSize: 13,
    color: "#4CAF50",
    fontStyle: "italic",
    marginTop: 2,
  },
  eventDescription: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
  },
  allEventsSection: {
    paddingHorizontal: 20,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dateContainer: {
    width: 50,
    alignItems: "center",
    marginRight: 15,
    paddingVertical: 5,
  },
  eventDayNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  dayName: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },
  eventInfo: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventName: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
  hijriDateSmall: {
    fontSize: 12,
    color: "#4CAF50",
    fontStyle: "italic",
    marginTop: 4,
  },
  eventDesc: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: "#F3E5F5",
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7B1FA2",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#7B1FA2",
    marginBottom: 5,
  },
});