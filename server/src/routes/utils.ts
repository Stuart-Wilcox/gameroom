import * as Express from 'express';
import { User } from '../models';

export const getUser = async (req: Express.Request, res: Express.Response): Promise<any> => {
  const { id } = req.cookies;

  if (!id) {
    res.status(401).json({ err: 'No user id provided' });
    return null;
  }

  let user;
  try {
    user = await User.findOne({ id });
  } catch (err) {
    res.status(500).json(err);
    return null;
  }

  if (!user || !user.isActive) {
    res.status(401).json({ err: 'User not found' });
    return null;
  }

  return user;
};

export const validate = async (fields: Object): Promise<string|undefined> => {
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined) {
      return `Field ${key} is required`;
    }
  }
  return;
}

export const equalIds = (a: string | object, b: string | object): boolean => {
  return new String(a).valueOf() === new String(b).valueOf();
};