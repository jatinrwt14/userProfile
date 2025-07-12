import { CommonAPIResponse } from '../../../networking/ResponseDTO/CommonAPIResponse';
import { User } from '../../../networking/ResponseDTO/UserListResponseDTO';
import APIService from '../../../networking/APIService/APIService';
import { requestTypeToString } from '../../../utils/helperFunction/helper';
import { RequestType } from '../../../utils/enum/enum';

export interface UserRepositoryProtocol {
  getUsers(): Promise<CommonAPIResponse<User[]>>;
}

const UserRepositoryImpl: UserRepositoryProtocol = {
  getUsers: async () => {
    return await APIService<User[]>({
      method: requestTypeToString(RequestType.GET),
      url: 'https://jsonplaceholder.typicode.com/users',
      headers: {},
    });
  },
};

export default UserRepositoryImpl;
