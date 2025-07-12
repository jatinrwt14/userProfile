import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import APIService from '../networking/APIService/APIService';
import { CommonAPIResponse } from '../networking/ResponseDTO/CommonAPIResponse';
import { User } from '../networking/ResponseDTO/UserListResponseDTO';
import { requestTypeToString } from '../utils/helperFunction/helper';
import { RequestType } from '../utils/enum/enum';
import UserRepositoryImpl from '../screens/UserList/Service/UserListRepository';

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
    filters: {
        city: string;
        search: string;
    };
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
    filters: {
        city: '',
        search: '',
    },
};

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const result = await UserRepositoryImpl.getUsers();

    if (result.success) {
      return result.data!;
    } else {
      return rejectWithValue(result.error ?? 'Unknown error');
    }
  } catch (error) {
    console.error('API Fetch Error:', error);
    return rejectWithValue('Failed to fetch users');
  }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCityFilter(state, action: PayloadAction<string>) {
            state.filters.city = action.payload;
        },
        setSearchFilter(state, action: PayloadAction<string>) {
            state.filters.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Error fetching users';
            });
    },
});

export const { setCityFilter, setSearchFilter } = usersSlice.actions;
export default usersSlice.reducer;
