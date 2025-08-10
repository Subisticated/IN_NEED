export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'Donor' | 'Hospital' | 'VerifiedSource' | 'Admin';
  bloodType?: string;
  isAvailable?: boolean;
  badges?: Badge[];
};

export type Badge = {
  name: string;
  icon: string;
  description: string;
};

export type Donation = {
  id: string;
  type: string;
  hospital: string;
  date: string;
  status: string;
};
