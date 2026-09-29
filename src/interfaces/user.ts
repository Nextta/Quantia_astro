export interface User{
  id_clerk: string;            // ID del usuario en Clerk (clave primaria)
  nombre: string;
  apellidos: string;
  username: string;
  descripcion: string | null;
  clave_activacion: string | null;
  usuario_activo: boolean;
}
