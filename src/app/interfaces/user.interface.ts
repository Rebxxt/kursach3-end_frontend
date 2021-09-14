export interface UserInterface {
  username: string
  phones: string[] | null
  addresses: string[] | null
  transports: string[] | null
  groups: string[] | null
  firstName: string | null
  lastName: string | null
  email: string | null
  isStaff: boolean | null
  isActive: boolean | null
  isSuperuser: boolean | null
  dateJoined: string | null
  lastLogin: string | null
}
