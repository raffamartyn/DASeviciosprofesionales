export interface Obra {
  ID_OBRA: string;
  NOMBRE_OBRA: string;
}

export interface ImagenObra {
  ID_IMAGEN: string;
  ID_OBRA: string;
  IMAGEN: string;
  LINK: string;
}