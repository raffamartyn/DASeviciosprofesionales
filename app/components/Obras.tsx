"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import apiobras from "@/app/api/apiobras";
import apiimagenes from "@/app/api/apiimagenes";

import type { ImagenObra, Obra } from "@/app/api/type";

export default function Obras() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [imagenes, setImagenes] = useState<ImagenObra[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [obraSeleccionada, setObraSeleccionada] =
    useState<Obra | null>(null);

  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError("");

        const [obrasCargadas, imagenesCargadas] = await Promise.all([
          apiobras.obra.list(),
          apiimagenes.imagen.list(),
        ]);

        setObras(obrasCargadas);
        setImagenes(imagenesCargadas);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar las obras.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const obrasConImagenes = useMemo(() => {
    return obras
      .map((obra) => {
        const fotos = imagenes.filter(
          (imagen) => imagen.ID_OBRA === obra.ID_OBRA,
        );

        return {
          ...obra,
          fotos,
        };
      })
      .filter((obra) => obra.fotos.length > 0);
  }, [obras, imagenes]);

  const fotosSeleccionadas = useMemo(() => {
    if (!obraSeleccionada) {
      return [];
    }

    return imagenes.filter(
      (imagen) => imagen.ID_OBRA === obraSeleccionada.ID_OBRA,
    );
  }, [obraSeleccionada, imagenes]);

  const abrirGaleria = (obra: Obra) => {
    setObraSeleccionada(obra);
    setImagenActual(0);
  };

  const cerrarGaleria = () => {
    setObraSeleccionada(null);
    setImagenActual(0);
  };

  const imagenAnterior = () => {
    setImagenActual((actual) =>
      actual === 0 ? fotosSeleccionadas.length - 1 : actual - 1,
    );
  };

  const imagenSiguiente = () => {
    setImagenActual((actual) =>
      actual === fotosSeleccionadas.length - 1 ? 0 : actual + 1,
    );
  };

  return (
    <>
      <section
        id="obras"
        className="overflow-hidden bg-[#171A1F] py-14 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-8 px-4 text-center sm:mb-12 sm:px-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F5B700]">
              Nuestro trabajo
            </span>

            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Obras realizadas
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              Algunos de los espacios que transformamos con responsabilidad y
              atención en cada detalle.
            </p>
          </motion.div>

          {/* Cargando */}
          {cargando && (
            <div className="flex justify-center py-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-10 w-10 rounded-full border-4 border-white/20 border-t-[#F5B700]"
              />
            </div>
          )}

          {/* Error */}
          {!cargando && error && (
            <p className="px-4 text-center text-red-400">{error}</p>
          )}

          {/* Sin obras */}
          {!cargando &&
            !error &&
            obrasConImagenes.length === 0 && (
              <p className="px-4 text-center text-gray-400">
                Próximamente mostraremos nuestras obras.
              </p>
            )}

          {/* Obras */}
          {!cargando && !error && obrasConImagenes.length > 0 && (
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 sm:px-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-8">
              {obrasConImagenes.map((obra, index) => (
                <motion.button
                  key={obra.ID_OBRA}
                  type="button"
                  onClick={() => abrirGaleria(obra)}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -6 }}
                  className="group relative aspect-[4/3] w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-2xl bg-[#242830] text-left shadow-xl sm:w-[360px] sm:max-w-none lg:w-auto"
                >
                  <img
                    src={obra.fotos[0].LINK}
                    alt={obra.NOMBRE_OBRA}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F5B700]">
                      {obra.fotos.length}{" "}
                      {obra.fotos.length === 1 ? "imagen" : "imágenes"}
                    </span>

                    <h3 className="mt-2 text-xl font-black capitalize text-white sm:text-2xl">
                      {obra.NOMBRE_OBRA}
                    </h3>

                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                      Ver obra
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Galería */}
      <AnimatePresence>
        {obraSeleccionada && fotosSeleccionadas.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrarGaleria}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
              onClick={(evento) => evento.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              {/* Título */}
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#F5B700]">
                    Obra realizada
                  </p>

                  <h3 className="mt-1 text-xl font-black capitalize text-white sm:text-2xl">
                    {obraSeleccionada.NOMBRE_OBRA}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={cerrarGaleria}
                  aria-label="Cerrar galería"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-[#F5B700] hover:text-[#171A1F]"
                >
                  ×
                </button>
              </div>

              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#242830] sm:aspect-video">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={fotosSeleccionadas[imagenActual].ID_IMAGEN}
                    src={fotosSeleccionadas[imagenActual].LINK}
                    alt={`${obraSeleccionada.NOMBRE_OBRA} - imagen ${
                      imagenActual + 1
                    }`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-contain"
                  />
                </AnimatePresence>

                {fotosSeleccionadas.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={imagenAnterior}
                      aria-label="Imagen anterior"
                      className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white backdrop-blur transition hover:bg-[#F5B700] hover:text-[#171A1F]"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={imagenSiguiente}
                      aria-label="Imagen siguiente"
                      className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white backdrop-blur transition hover:bg-[#F5B700] hover:text-[#171A1F]"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Contador */}
              <p className="mt-4 text-center text-sm text-gray-300">
                {imagenActual + 1} de {fotosSeleccionadas.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}