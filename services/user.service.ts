import { User } from '../models';
import { IUser } from '../types';

export async function getOne(cond: any = {}, fields: any = {}): Promise<IUser> {
  const f = { ...fields, password: 0 };
  return User.findOne(cond, f).lean().exec();
}

export async function getAll(fields: any = {}): Promise<IUser[]> {
  const f = { ...fields, password: 0 };
  return User.find({}, f).lean().exec();
}

export async function getById(_id: IUser['_id'], fields: any = {}): Promise<IUser> {
  const f = { ...fields, password: 0 };
  return User.findOne({ _id }, f).lean().exec();
}

export async function create(user: IUser): Promise<IUser> {
  const c = await User.create(user);
  return this.getById(c?._id);
}

export async function update(_id: IUser['_id'], user: IUser): Promise<IUser> {
  await User.updateOne({ _id }, user, { omitUndefined: true });
  return this.getById(_id);
}

export async function updateAll(user: IUser): Promise<IUser[]> {
  await User.updateMany({ }, user, { omitUndefined: true });
  return this.getAll();
}

export async function remove(_id: IUser['_id']): Promise<IUser> {
  const user: IUser = await this.getById(_id)
  await User.deleteOne({ _id });
  return user;
}

export async function removeAll(): Promise<IUser[]> {
  const users: IUser[] = await this.getAll()
  await User.deleteMany();
  return users;
}

export async function count(cond: any = {}): Promise<number> {
  return User.countDocuments(cond).exec();
}
