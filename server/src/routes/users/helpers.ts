import { User } from '../../models';

export const search = async (userId: string, username?: string) => {
  // TODO limit number of users
  // TODO exclude certain fields
  return User.find({
    id: { $ne: userId }, // omit current user from search result
    username: { $search: username },
    isActive: true,
  });
};