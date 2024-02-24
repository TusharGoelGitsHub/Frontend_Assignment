export interface ICustomCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  isFollowing: boolean;
  handleFollowClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}
