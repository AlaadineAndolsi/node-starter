import { User } from '../models';
import { IUser } from '../types';

export async function getOne(cond: any = {}, fields: any = {}): Promise<IUser> {
  return User.findOne(cond, fields).lean().exec();
}

export async function getByEmail(email: IUser['email'], fields: any = {}): Promise<IUser> {
  return User.findOne({ email }, fields).lean().exec();
}

export async function getById(_id: IUser['_id'], fields: any = {}): Promise<IUser> {
  return User.findOne({ _id }, fields).lean().exec();
}
