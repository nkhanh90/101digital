import { userLoginSaga } from '@/redux/auth/authSaga';
import { login } from '@/redux/auth/authSlice';
import sagaHelper from 'redux-saga-testing';

describe('When register new user', () => {
  const it = sagaHelper(
    userLoginSaga(
      login({
        username: 'test',
        password: 'test',
        clientId: 'test',
        clientSecret: 'test',
      })
    )
  );

  it('should have called Login API', (result: any) => {
    expect(result.type).toEqual('CALL');
    return {
      data: {
        access_token: 'string',
        expires_in: 3600,
        refresh_token: 'string',
        scope: 'string',
        token_type: 'Bearer',
      },
    };
  });

  it('should have called load me', (result: any) => {
    expect(result.type).toEqual('CALL');
    return {
      email: 'string',
      firstName: 'string',
      lastName: 'string',
      memberships: [
        {
          membershipId: 'string',
          organisationId: 'string',
          roleName: 'string',
          token: 'string',
        },
      ],
    };
  });

  it('should set access token to cookie', (result: any) => {
    expect(result.type).toEqual('CALL');
  });

  it('should set org token to cookie', (result: any) => {
    expect(result.type).toEqual('CALL');
  });

  it('should save user to local storage', (result: any) => {
    expect(result.type).toEqual('CALL');
  });

  it('should put success', (result: any) => {
    expect(result.type).toEqual('PUT');
  });
});
