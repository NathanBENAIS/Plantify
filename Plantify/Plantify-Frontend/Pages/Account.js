import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const MenuItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="#1A3B0A" />
        </View>
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#1A3B0A" />
    </View>
  </TouchableOpacity>
);

const Account = () => {

  const menuItems = [
    { title: 'Mon historique', icon: 'time' },
    { title: 'Mes favoris', icon: 'heart' },
    { title: 'Autorisations', icon: 'shield-checkmark' },
    { title: 'Support', icon: 'help-circle' },
    { title: 'Notifications', icon: 'notifications' },
    { title: 'Confidentialité', icon: 'lock-closed' },
    { title: 'À propos', icon: 'information-circle' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Réglages</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={30} color="#FFFFFF" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Mon Compte</Text>
          <Text style={styles.profileEmail}>Gérer vos informations personnelles</Text>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer}>
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              onPress={() => console.log(`${item.title} pressed`)}
            />
          ))}
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#B4D8B2',
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontFamily: 'Belleza',
    fontWeight:'700',
    fontSize: 28,
    color: '#1A3B0A',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A3B0A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A3B0A',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuContainer: {
    flex: 1,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#B4D8B2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1A3B0A',
    fontWeight: '500',
  },
  versionInfo: {
    padding: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default Account;