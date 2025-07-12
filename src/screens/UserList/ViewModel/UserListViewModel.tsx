import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { fetchUsers, setCityFilter, setSearchFilter } from '../../../redux/reducer';
import { User } from '../../../networking/ResponseDTO/UserListResponseDTO';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigation';
import debounce from 'lodash.debounce';

export interface UserListViewModelReturnType {
  filtered: User[];
  loading: boolean;
  error: string | null;
  localSearch: string;
  localCity: string;
  setLocalSearch: (text: string) => void;
  setLocalCity: (text: string) => void;
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

  const [localSearch, setLocalSearchState] = useState(filters.search);
  const [localCity, setLocalCityState] = useState(filters.city);

  useEffect(() => {
    setLocalSearchState(filters.search);
  }, [filters.search]);

  useEffect(() => {
    setLocalCityState(filters.city);
  }, [filters.city]);

  const debouncedSetSearchFilter = useMemo(() =>
    debounce((text: string) => dispatch(setSearchFilter(text)), 500),
    [dispatch]
  );

  const debouncedSetCityFilter = useMemo(() =>
    debounce((text: string) => dispatch(setCityFilter(text)), 500),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchFilter.cancel();
      debouncedSetCityFilter.cancel();
    };
  }, [debouncedSetSearchFilter, debouncedSetCityFilter]);

  const setLocalSearch = useCallback((text: string) => {
    setLocalSearchState(text);
    debouncedSetSearchFilter(text);
  }, [debouncedSetSearchFilter]);

  const setLocalCity = useCallback((text: string) => {
    setLocalCityState(text);
    debouncedSetCityFilter(text);
  }, [debouncedSetCityFilter]);

  const filtered = useMemo(() => {
    const searchText = filters.search.toLowerCase();
    const cityText = filters.city.toLowerCase();

    return users.filter(user => {
      const matchesNameOrUsername =
        user.name.toLowerCase().includes(searchText) ||
        user.username.toLowerCase().includes(searchText);

      const matchesCity = user.address.city.toLowerCase().includes(cityText);

      return matchesNameOrUsername && matchesCity;
    });
  }, [users, filters]);

  const onRefresh = () => dispatch(fetchUsers());

  const onUserPress = (user: User) => {
    navigation.navigate('DetailsScreen', { user });
  };

  return {
    filtered,
    loading,
    error,
    localSearch,
    localCity,
    setLocalSearch,
    setLocalCity,
    onRefresh,
    onUserPress,
  };
};

export default UserListViewModel;
