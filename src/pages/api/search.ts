import type { APIRoute } from "astro"; //Solo comprueba tipos mientras se desarrolla, no se incluye en el bundle final
import { searchStrategies } from "../../utils/functionsGeneral";

export const prerender = false;

export const GET: APIRoute = ({ request }) => { // aquí se define la función GET que maneja las solicitudes GET a esta ruta de la API
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";

  if (query.length > 100) { //Podemos limitar la longitud de la búsqueda para evitar problemas de rendimiento o abuso del servicio
    return Response.json(
      { error: "La búsqueda es demasiado larga" },
      { status: 400 }, //Bad request
    );
  }

  try {
    const results = searchStrategies(query);

    return Response.json({
      query,
      results,
    });
  } catch (error) {
    console.error("Error al buscar estrategias:", error);

    return Response.json(
      { error: "No fue posible realizar la búsqueda" },
      { status: 500 }, // Internal Server Error
    );
  }
};