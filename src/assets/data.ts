import { UserType } from '@/store/reducers/users/types.ts';

export const initLoginData ={
  password: "Test#123",
  id: "user"
}
export const mockUser:UserType ={
  userId: "user",
  password: "Test#123",
  salutation:'Mr',
  firstName: 'First Name',
  lastName: 'Last Name',
  email:  'user@gmail.com',
  avatar: '',
  address: 'No 35, 2nd Street',
  country: 'Sri Lanka',
  postalCode: '10500',
  birthday: '1997-08-06',
  gender: 'MALE',
  status: 'Single'
}