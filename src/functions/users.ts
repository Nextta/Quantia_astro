// src/functions/users.ts
import type { User } from '../interfaces/user.ts';
import { cmd } from '../lib/backend';

export const getUserByIdClerk = (idClerk: string) => cmd<User>('get_user_by_id_clerk', { idClerk });