import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { SweetModel } from '../models/sweet.model.js';
import { sample_users } from '../data.js';
import { sample_sweets } from '../data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedUsers();
    await seedSweets();
    console.log('connect successfully---');
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('Users seed is done!');
}

async function seedSweets() {
  const sweets = await SweetModel.countDocuments();
  if (sweets > 0) {
    console.log('Sweets seed is already done!');
    return;
  }

  for (const sweet of sample_sweets) {
    sweet.imageUrl = `/sweets/${sweet.imageUrl}`;
    await SweetModel.create(sweet);
  }

  console.log('Sweets seed Is Done!');
}
