import { LoginResponse } from '../authentication/data-access/models/login-response.model';
import { User } from '../authentication/data-access/models/user.model';

const mockLoginResponses: LoginResponse[] = [
  {
    email: 'mock@mock.co.za',
    roles: ['Reader'],
    token: 'dlfsdfsdfggrddfkdlsoreolp',
  },
  {
    email: 'mockAdmin@mock.co.za',
    roles: ['Reader', 'Writer'],
    token: 'fdgsdfdsfdsfdsfdsfsae',
  },
];

const mockUsers: User[] = [
  {
    email: 'mockAdmin@mock.co.za',
    roles: ['Writer', 'Reader'],
  },
  {
    email: 'mockUser@mock.co.za',
    roles: ['Reader'],
  },
];

export { mockLoginResponses, mockUsers };
