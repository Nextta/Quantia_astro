import type { ActivationKey } from "../interfaces/activationKey.ts";
import { cmd } from '../lib/backend.ts';

//Create Keys
export const tableActivationKeys = () => cmd<string>('table_activation_keys');
export const insertKey = (clave:string) => cmd<number>('insert_key', { clave });
export const generateKeys = (cantidad:number) => cmd<string[]>('generate_keys', { cantidad });

//Read Keys
export const getKeys = () => cmd<ActivationKey[]>('get_keys');
export const getAvailableKeys = () => cmd<ActivationKey[]>('get_available_keys');
export const getKeyById = (id:number) => cmd<ActivationKey>('get_key_by_id', { id });

//Delete Keys
export const deleteKey = (id:number) => cmd<void | null>('delete_key', { id });

//Update keys
export const activarUsuario = (idClerk:string,clave:string) => cmd<void | null>('activar_usuario', { idClerk, clave });
export const releaseKey = (id:number) => cmd<void | null>('release_key', { id });