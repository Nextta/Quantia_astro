
// src/lib/backend.ts
import { invoke } from '@tauri-apps/api/core';

// 1. Tipo genérico: cada función declara qué devuelve y qué recibe
export async function cmd<T>(nombre: string, args?: Record<string, unknown>): Promise<T> {
  try {
    return await invoke<T>(nombre, args);
  } catch (e) {
    // 2. Punto único para extraer el { msg } del error del backend
    throw new Error((e as { msg?: string })?.msg ?? 'Error inesperado del backend');
  }
}