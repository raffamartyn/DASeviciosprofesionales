"use client";

import Image from "next/image";
import { motion } from "motion/react";

const servicios = [
  {
    titulo: "Construcción en seco",
    descripcion:
      "Tabiques, divisiones y revestimientos con sistemas modernos y terminaciones precisas.",
    imagen: "/construccion-seco.png",
  },
  {
    titulo: "Pintura",
    descripcion:
      "Pintura interior y exterior con preparación profesional de cada superficie.",
    imagen: "/pintura.png",
  },
  {
    titulo: "Terminación de obra",
    descripcion:
      "Masillado, alisado y terminaciones cuidadas para entregar cada espacio listo.",
    imagen: "/terminacion-obra.png",
  },
  {
    titulo: "Cielorrasos",
    descripcion:
      "Cielorrasos modernos, bandejas de iluminación y diseños adaptados a cada ambiente.",
    imagen: "/cielorrasos.png",
  },
];

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="overflow-hidden bg-[#F7F7F4] px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center sm:mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C58F00]">
            Lo que hacemos
          </span>

          <h2 className="mt-3 text-3xl font-black text-[#171A1F] sm:text-4xl lg:text-5xl">
            Nuestros servicios
          </h2>

          <p className="mx-auto mt-4 hidden max-w-2xl text-gray-600 sm:block">
            Soluciones profesionales para construir, renovar y mejorar tus
            espacios.
          </p>
        </motion.div>

        {/* Tarjetas */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {servicios.map((servicio, index) => (
            <motion.article
              key={servicio.titulo}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(17,19,24,0.08)]"
            >
              {/* Imagen */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 via-transparent to-transparent" />

                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5B700] text-xs font-black text-[#171A1F] sm:h-10 sm:w-10 sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Título visible en celular */}
                <h3 className="absolute bottom-0 left-0 right-0 p-3 text-base font-black leading-tight text-white sm:hidden">
                  {servicio.titulo}
                </h3>
              </div>

              {/* Contenido en pantallas grandes */}
              <div className="hidden p-5 sm:block">
                <h3 className="text-xl font-black text-[#171A1F]">
                  {servicio.titulo}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {servicio.descripcion}
                </p>

                <a
                  href="#contacto"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#B98300] transition group-hover:gap-3"
                >
                  Consultar
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}