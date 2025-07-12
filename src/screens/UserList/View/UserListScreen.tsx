import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserListViewModel, { UserListViewModelReturnType } from '../ViewModel/UserListViewModel';
import Loader from '../../../components/Loader';
import UserCard from './UserCard';

const UserListScreen = () => {
  const viewModel: UserListViewModelReturnType = UserListViewModel();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader visible={viewModel.loading && viewModel.filtered.length === 0} />
      <View style={styles.container}>
        <TextInput
          placeholder="Search name"
          style={styles.input}
          value={viewModel.filters.search}
          onChangeText={viewModel.onChangeSearch}
        />
        <TextInput
          placeholder="Filter by city"
          style={styles.input}
          value={viewModel.filters.city}
          onChangeText={viewModel.onChangeCity}
        />

        {viewModel.error && <Text style={styles.error}>{viewModel.error}</Text>}

        <FlatList
          data={viewModel.filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserCard user={item} onPress={viewModel.onUserPress} />
          )}
          refreshing={viewModel.loading}
          onRefresh={viewModel.onRefresh}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
