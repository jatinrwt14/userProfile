import React, { useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserListViewModel from '../ViewModel/UserListViewModel';
import Loader from '../../../components/Loader';
import UserCard from './UserCard';
import { User } from '../../../networking/ResponseDTO/UserListResponseDTO';

const UserListScreen = () => {
  const viewModel = UserListViewModel();

  const renderItem = useCallback(
    ({ item }: { item: User }) => <UserCard user={item} onPress={viewModel.onUserPress} />,
    [viewModel.onUserPress]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Loader visible={viewModel.loading && viewModel.filtered.length === 0} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Search by name or username"
            style={styles.input}
            value={viewModel.localSearch}
            onChangeText={viewModel.setLocalSearch}
          />

          <TextInput
            placeholder="Filter by city"
            style={styles.input}
            value={viewModel.localCity}
            onChangeText={viewModel.setLocalCity}
          />

          {viewModel.error && <Text style={styles.error}>{viewModel.error}</Text>}

          <FlatList
            data={viewModel.filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshing={viewModel.loading}
            onRefresh={viewModel.onRefresh}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              viewModel.filtered.length === 0 && !viewModel.loading
                ? styles.emptyContainer
                : { paddingBottom: 20 }
            }
            ListEmptyComponent={
              !viewModel.loading &&
              (viewModel.localSearch.trim().length > 0 || viewModel.localCity.trim().length > 0) ? (
                <Text style={styles.emptyText}>No users found</Text>
              ) : null
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 18,
    fontStyle: 'italic',
  },
});
