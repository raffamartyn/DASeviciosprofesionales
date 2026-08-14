import type { Obra } from "./type";

const CSV_OBRAS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQUSKkRrdd4iFNxaEdx_dJx-_Q8b2NlWiK4vs_F9QJCyaptHcSwUHq3FaI7nwRej09NSbqVDrgaycY/pub?gid=0&single=true&output=csv";

const apiobras = {
  obra: {
    list: async (): Promise<Obra[]> => {
      const respuesta = await fetch(CSV_OBRAS_URL, {
        cache: "no-store",
      });

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las obras");
      }

      const texto = await respuesta.text();

      return texto
        .replace(/\r/g, "")
        .trim()
        .split("\n")
        .slice(1)
        .filter((fila) => fila.trim() !== "")
        .map((fila): Obra => {
          const [ID_OBRA, NOMBRE_OBRA] = fila.split(",");

          return {
            ID_OBRA: ID_OBRA?.trim() ?? "",
            NOMBRE_OBRA: NOMBRE_OBRA?.trim() ?? "",
          };
        })
        .filter((obra) => obra.ID_OBRA !== "");
    },
  },
};

export default apiobras;