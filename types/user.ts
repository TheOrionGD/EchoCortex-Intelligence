export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  avatar?: string;
}

export interface TeamInfo {
  id: string;
  name: string;
  memberCount: number;
  storageUsed: string;
}
