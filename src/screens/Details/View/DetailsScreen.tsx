import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/StackNavigation';

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailsScreen'>>();
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Username: {user.username}</Text>
      <Text style={styles.info}>Phone: {user.phone}</Text>
      <Text style={styles.info}>Website: {user.website}</Text>
      <Text style={styles.info}>City: {user.address.city}</Text>
      <Text style={styles.info}>Company: {user.company.name}</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
});
