import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../../../networking/ResponseDTO/UserListResponseDTO';

interface Props {
  user: User;
  onPress: (user: User) => void;
}

const UserCard: React.FC<Props> = ({ user, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(user)}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.detail}>📧 {user.email}</Text>
      <Text style={styles.detail}>👤 {user.username}</Text>
      <Text style={styles.detail}>🏙️ {user.address.city}</Text>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
});
