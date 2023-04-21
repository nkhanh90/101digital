export interface IMembershipProps {
  membershipId: string;
  organisationId: string;
  roleName: string;
  token: string;
}
export interface IUserProps {
  email: string;
  firstName: string;
  lastName: string;
  memberships: IMembershipProps[];
}
