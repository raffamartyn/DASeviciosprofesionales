import type { ImagenObra } from "./type";

const CSV_IMAGENES_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQUSKkRrdd4iFNxaEdx_dJx-_Q8b2NlWiK4vs_F9QJCyaptHcSwUHq3FaI7nwRej09NSbqVDrgaycY/pub?gid=456524546&single=true&output=csv";

const limpiarValor = (valor: string | undefined) => {
  return (valor ?? "")
    .trim()
    .replace(/^"|"$/g, "");
};

const apiimagenes = {
  imagen: {
    list: async (): Promise<ImagenObra[]> => {
      const respuesta = await fetch(CSV_IMAGENES_URL, {
        cache: "no-store",
      });

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las imágenes");
      }

      const texto = await respuesta.text();

      return texto
        .replace(/\r/g, "")
        .trim()
        .split("\n")
        .slice(1)
        .filter((fila) => fila.trim() !== "")
        .map((fila): ImagenObra => {
          const [ID_IMAGEN, ID_OBRA, IMAGEN, LINK] = fila.split(",");

          return {
            ID_IMAGEN: limpiarValor(ID_IMAGEN),
            ID_OBRA: limpiarValor(ID_OBRA),
            IMAGEN: limpiarValor(IMAGEN),
            LINK: limpiarValor(LINK),
          };
        })
        .filter(
          (imagen) =>
            imagen.ID_IMAGEN !== "" &&
            imagen.ID_OBRA !== "" &&
            imagen.LINK !== "",
        );
    },
  },
};

export default apiimagenes;