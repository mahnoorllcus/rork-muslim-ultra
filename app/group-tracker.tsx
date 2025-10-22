import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Users, Plus, X, Share2, MapPin, Phone } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GroupMember {
  id: string;
  name: string;
  phone: string;
  role: string;
  color: string;
}

export default function GroupTrackerScreen() {
  const [groupName, setGroupName] = useState("My Pilgrimage Group");
  const [groupCode, setGroupCode] = useState("PG-2024-" + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", phone: "", role: "Member" });
  const [meetingPoint, setMeetingPoint] = useState("Gate 79 - King Abdul Aziz Gate");
  const [emergencyContact, setEmergencyContact] = useState({ name: "Group Leader", phone: "+966 50 123 4567" });

  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"];

  useEffect(() => {
    loadGroupData();
  }, []);

  const loadGroupData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("groupTracker");
      if (savedData) {
        const data = JSON.parse(savedData);
        setGroupName(data.groupName || groupName);
        setGroupCode(data.groupCode || groupCode);
        setMembers(data.members || []);
        setMeetingPoint(data.meetingPoint || meetingPoint);
        setEmergencyContact(data.emergencyContact || emergencyContact);
      }
    } catch (error) {
      console.error("Error loading group data:", error);
    }
  };

  const saveGroupData = async () => {
    try {
      const data = {
        groupName,
        groupCode,
        members,
        meetingPoint,
        emergencyContact,
      };
      await AsyncStorage.setItem("groupTracker", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving group data:", error);
    }
  };

  const addMember = () => {
    if (!newMember.name.trim()) {
      Alert.alert("Error", "Please enter member name");
      return;
    }

    const member: GroupMember = {
      id: Date.now().toString(),
      name: newMember.name,
      phone: newMember.phone,
      role: newMember.role,
      color: colors[members.length % colors.length],
    };

    const updatedMembers = [...members, member];
    setMembers(updatedMembers);
    setNewMember({ name: "", phone: "", role: "Member" });
    setShowAddMember(false);
    saveGroupData();
  };

  const removeMember = (id: string) => {
    Alert.alert(
      "Remove Member",
      "Are you sure you want to remove this member?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            const updatedMembers = members.filter(m => m.id !== id);
            setMembers(updatedMembers);
            saveGroupData();
          },
        },
      ]
    );
  };

  const shareGroupInfo = async () => {
    try {
      const message = `
🕋 ${groupName}
📍 Group Code: ${groupCode}
👥 Members: ${members.length}
📍 Meeting Point: ${meetingPoint}
📞 Emergency: ${emergencyContact.name} - ${emergencyContact.phone}

Join our pilgrimage group using code: ${groupCode}
      `;
      await Share.share({ message });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "Group Tracker",
          headerStyle: { backgroundColor: "#FF9800" },
          headerTintColor: "#FFFFFF",
          headerRight: () => (
            <TouchableOpacity onPress={shareGroupInfo} style={{ marginRight: 15 }}>
              <Share2 size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <TextInput
            style={styles.groupNameInput}
            value={groupName}
            onChangeText={setGroupName}
            onBlur={saveGroupData}
            placeholder="Group Name"
          />
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Group Code:</Text>
            <Text style={styles.codeText}>{groupCode}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Group Members ({members.length})</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddMember(true)}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {showAddMember && (
            <View style={styles.addMemberForm}>
              <TextInput
                style={styles.input}
                placeholder="Member Name"
                value={newMember.name}
                onChangeText={(text) => setNewMember({ ...newMember, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number (optional)"
                value={newMember.phone}
                onChangeText={(text) => setNewMember({ ...newMember, phone: text })}
                keyboardType="phone-pad"
              />
              <View style={styles.roleContainer}>
                {["Leader", "Member", "Guide"].map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.roleButton,
                      newMember.role === role && styles.roleButtonActive,
                    ]}
                    onPress={() => setNewMember({ ...newMember, role })}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        newMember.role === role && styles.roleTextActive,
                      ]}
                    >
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => {
                    setShowAddMember(false);
                    setNewMember({ name: "", phone: "", role: "Member" });
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.formButton, styles.saveButton]}
                  onPress={addMember}
                >
                  <Text style={styles.saveButtonText}>Add Member</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {members.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={[styles.memberAvatar, { backgroundColor: member.color }]}>
                <Text style={styles.avatarText}>
                  {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                {member.phone ? (
                  <View style={styles.phoneContainer}>
                    <Phone size={12} color="#666666" />
                    <Text style={styles.memberPhone}>{member.phone}</Text>
                  </View>
                ) : null}
              </View>
              <TouchableOpacity onPress={() => removeMember(member.id)}>
                <X size={20} color="#FF5252" />
              </TouchableOpacity>
            </View>
          ))}

          {members.length === 0 && (
            <View style={styles.emptyState}>
              <Users size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>No members added yet</Text>
              <Text style={styles.emptySubtext}>Tap + to add group members</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting Point</Text>
          <View style={styles.meetingCard}>
            <MapPin size={20} color="#FF9800" />
            <TextInput
              style={styles.meetingInput}
              value={meetingPoint}
              onChangeText={setMeetingPoint}
              onBlur={saveGroupData}
              placeholder="Enter meeting location"
              multiline
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.emergencyCard}>
            <Phone size={20} color="#FF5252" />
            <View style={styles.emergencyInfo}>
              <TextInput
                style={styles.emergencyName}
                value={emergencyContact.name}
                onChangeText={(text) => setEmergencyContact({ ...emergencyContact, name: text })}
                onBlur={saveGroupData}
                placeholder="Contact Name"
              />
              <TextInput
                style={styles.emergencyPhone}
                value={emergencyContact.phone}
                onChangeText={(text) => setEmergencyContact({ ...emergencyContact, phone: text })}
                onBlur={saveGroupData}
                placeholder="Phone Number"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Tips for Group Travel:</Text>
          <Text style={styles.infoText}>• Share group code with all members</Text>
          <Text style={styles.infoText}>• Set clear meeting points and times</Text>
          <Text style={styles.infoText}>• Keep emergency contacts updated</Text>
          <Text style={styles.infoText}>• Use buddy system in crowded areas</Text>
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
  headerCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 10,
  },
  groupNameInput: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 10,
    marginBottom: 15,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  codeLabel: {
    fontSize: 14,
    color: "#666666",
    marginRight: 10,
  },
  codeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF9800",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    paddingVertical: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#FF9800",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addMemberForm: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  roleButtonActive: {
    backgroundColor: "#FF9800",
    borderColor: "#FF9800",
  },
  roleText: {
    fontSize: 14,
    color: "#666666",
  },
  roleTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  formButtons: {
    flexDirection: "row",
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButtonText: {
    color: "#666666",
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },
  memberRole: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  memberPhone: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999999",
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#CCCCCC",
    marginTop: 5,
  },
  meetingCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  meetingInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333333",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 5,
  },
  emergencyCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  emergencyInfo: {
    flex: 1,
    marginLeft: 10,
  },
  emergencyName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 5,
    marginBottom: 10,
  },
  emergencyPhone: {
    fontSize: 14,
    color: "#666666",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 5,
  },
  infoCard: {
    backgroundColor: "#FFF3E0",
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F57C00",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#F57C00",
    marginBottom: 5,
  },
});