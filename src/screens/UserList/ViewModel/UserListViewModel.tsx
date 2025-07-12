// ViewModel/UserListViewModel.ts
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { fetchUsers, setCityFilter, setSearchFilter } from '../../../redux/reducer';
import { User } from '../../../networking/ResponseDTO/UserListResponseDTO';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigation';

export interface UserListViewModelReturnType {
  filtered: User[];
  filters: { city: string; search: string };
  loading: boolean;
  error: string | null;
  onChangeSearch: (text: string) => void;
  onChangeCity: (text: string) => void;
  onRefresh: () => void;
  onUserPress: (user: User) => void;
}

const UserListViewModel = (): UserListViewModelReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { users, loading, error, filters } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(filters.search.toLowerCase()) &&
    user.address.city.toLowerCase().includes(filters.city.toLowerCase())
  );

  const onChangeSearch = (text: string) => dispatch(setSearchFilter(text));
  const onChangeCity = (text: string) => dispatch(setCityFilter(text));
  const onRefresh = () => dispatch(fetchUsers());

  const onUserPress = (user: User) => {
    navigation.navigate('DetailsScreen', { user });
  };

  return {
    filtered,
    filters,
    loading,
    error,
    onChangeSearch,
    onChangeCity,
    onRefresh,
    onUserPress,
  };
};

export default UserListViewModel;
