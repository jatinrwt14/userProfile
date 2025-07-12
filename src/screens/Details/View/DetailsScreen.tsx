import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/StackNavigation';

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailsScreen'>>();
  const { user } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{user.name}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <Text style={styles.info}>Username: <Text style={styles.value}>{user.username}</Text></Text>
        <Text style={styles.info}>Email: <Text style={styles.value}>{user.email}</Text></Text>
        <Text style={styles.info}>Phone: <Text style={styles.value}>{user.phone}</Text></Text>
        <Text style={styles.info}>Website: <Text style={styles.value}>{user.website}</Text></Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.info}>Street: <Text style={styles.value}>{user.address.street}</Text></Text>
        <Text style={styles.info}>Suite: <Text style={styles.value}>{user.address.suite}</Text></Text>
        <Text style={styles.info}>City: <Text style={styles.value}>{user.address.city}</Text></Text>
        <Text style={styles.info}>Zip Code: <Text style={styles.value}>{user.address.zipcode}</Text></Text>
        <Text style={styles.info}>Latitude: <Text style={styles.value}>{user.address.geo.lat}</Text></Text>
        <Text style={styles.info}>Longitude: <Text style={styles.value}>{user.address.geo.lng}</Text></Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Company Info</Text>
        <Text style={styles.info}>Name: <Text style={styles.value}>{user.company.name}</Text></Text>
        <Text style={styles.info}>Catch Phrase: <Text style={styles.value}>{user.company.catchPhrase}</Text></Text>
        <Text style={styles.info}>BS: <Text style={styles.value}>{user.company.bs}</Text></Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  info: {
    fontSize: 15,
    marginBottom: 6,
    color: '#444',
  },
  value: {
    fontWeight: '500',
    color: '#000',
  },
});
