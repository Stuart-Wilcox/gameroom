import { User } from '../../models';

export const search = async (userId: string, username?: string) => {
  // TODO exclude certain fields
  const users = await User.find({
    _id: { $ne: userId }, // omit current user from search result
    username: {
      $regex: username,
      $options: 'i',
    },
  }).limit(10);

  return {
    users,
    err: undefined,
  }
};