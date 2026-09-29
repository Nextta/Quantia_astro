import type { User } from "../interfaces/user.ts";
import { cmd } from '../lib/backend.ts';

//Create Users
export const tableUsers = () => cmd<string>('table_users'); //Verificamos que la tabla de usuarios exista, sino existe se crea una nueva.
export const insertUser = (user:User) => cmd<void | null>('insert_user', {user}); 

//Read Users
export const getUsers = () => cmd<User[]>('get_users');
export const getUser = (idClrek:string) => cmd<User>('get_user_by_id_clerk', { idClrek });
export const getUserByUsername = (username:string) => cmd<User>('get_user_by_username', { username });

//Update Users
export const updateUser = (user:User) => cmd<void | null>('update_user',{ user });
export const updateUserClave = (idClerk:string, clave:string) => cmd<void | null>('update_user_clave',{ idClerk, clave });
export const updateUserActivo = (idClerk:string,activo:boolean) => cmd<User>('update_user_activo', { idClerk, activo });

//Delate
export const deleteUser = (idClerk:string) => cmd<string>('delete_user',{ idClerk });




