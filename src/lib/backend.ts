// src/lib/backend.ts
import { invoke } from '@tauri-apps/api/core';

export function parseBackendError(e: unknown): string {
  if (
    typeof e === 'object' &&
    e !== null &&
    'msg' in e &&
    typeof e.msg === 'string'
  ) {
    return e.msg;
  }

  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;

  return 'Error inesperado del backend';
}

// 1. Tipo genérico: cada función declara qué devuelve y qué recibe
export async function cmd<T>(nombre: string, args?: Record<string, unknown>): Promise<T> {
  try {
    return await invoke<T>(nombre, args);
  } catch (e:unknown) {
    // 2. Punto único para extraer el { msg } del error del backend
    throw new Error(parseBackendError(e));
  }
}
