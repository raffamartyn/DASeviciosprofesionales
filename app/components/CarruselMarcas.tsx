"use client";

import Image from "next/image";
import { motion } from "motion/react";

const marcas = [
  {
    nombre: "Durlock",
    imagen: "/durlock.png",
  },
  {
    nombre: "Knauf",
    imagen: "/knauf.png",
  },
  {
    nombre: "Alba",
    imagen: "/alba.png",
  },
  {
    nombre: "Sinteplast",
    imagen: "/sinteplast.png",
  },
  {
    nombre: "Martel",
    imagen: "/martel.png",
  },
];

function ListaMarcas() {
  return (
    <>
      {marcas.map((marca) => (
        <div
          key={marca.nombre}
          className="group flex h-20 w-44 shrink-0 items-center justify-center px-5 sm:w-52"
        >
          <div className="relative h-14 w-full">
            <Image
              src={marca.imagen}
              alt={`Logo de ${marca.nombre}`}
              fill
              sizes="208px"
              className="object-contain grayscale opacity-50 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default function CarruselMarcas() {
  return (
    <section className="overflow-hidden border-y border-gray-200 bg-white py-10">
      <div className="mx-auto mb-7 max-w-7xl px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
          Trabajamos con
        </p>

        <h2 className="mt-2 text-xl font-bold text-[#171A1F]">
          Marcas de confianza
        </h2>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max gap-8"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="flex gap-8 pr-8">
            <ListaMarcas />
          </div>

          <div className="flex gap-8 pr-8" aria-hidden="true">
            <ListaMarcas />
          </div>
        </motion.div>
      </div>
    </section>
  );
}