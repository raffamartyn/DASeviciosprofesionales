"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import CarruselMarcas from "./components/CarruselMarcas";
import Servicios from "./components/Servicios";
import Obras from "./components/Obras";

import Contacto from "./components/Contacto";

const WHATSAPP_URL =
  "https://wa.me/3875107130?text=Hola%20David%2C%20vi%20la%20p%C3%A1gina%20de%20Servicios%20Profesionales%20y%20quisiera%20solicitar%20un%20presupuesto.";

function TextoEscribiendo() {
  const texto = "Transformamos tus espacios";
  const [textoVisible, setTextoVisible] = useState("");

  useEffect(() => {
    let posicion = 0;

    const intervalo = window.setInterval(() => {
      posicion += 1;
      setTextoVisible(texto.slice(0, posicion));

      if (posicion >= texto.length) {
        window.clearInterval(intervalo);
      }
    }, 75);

    return () => window.clearInterval(intervalo);
  }, []);

  return (
    <span>
      {textoVisible}

      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
        className="ml-1 inline-block text-[#F5B700]"
      >
        |
      </motion.span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#171A1F]">
      {/* Encabezado */}
      <header className="absolute left-0 top-0 z-30 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <motion.a
            href="#inicio"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <span className="text-2xl font-black text-white">
              DA<span className="text-[#F5B700]">.</span>
            </span>

            <span className="hidden text-sm font-bold uppercase leading-tight text-white sm:block">
              Servicios
              <span className="block text-[#F5B700]">Profesionales</span>
            </span>
          </motion.a>

          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden items-center gap-8 text-sm font-semibold text-white md:flex"
          >
            <a
              href="#inicio"
              className="transition hover:text-[#F5B700]"
            >
              Inicio
            </a>

            <a
              href="#servicios"
              className="transition hover:text-[#F5B700]"
            >
              Servicios
            </a>

            <a
              href="#obras"
              className="transition hover:text-[#F5B700]"
            >
              Obras
            </a>

            <a
              href="#contacto"
              className="transition hover:text-[#F5B700]"
            >
              Contacto
            </a>
          </motion.nav>

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-[#F5B700] px-4 py-3 text-xs font-bold text-[#171A1F] shadow-lg transition hover:bg-[#FFD044] sm:px-5 sm:text-sm"
          >
            Pedir presupuesto
          </motion.a>
        </div>
      </header>

      {/* Portada */}
      <section
        id="inicio"
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        <Image
          src="/hero-servicios-profesionales.png"
          alt="Trabajo profesional de construcción en seco y pintura"
          fill
          priority
          className="object-cover object-[65%_center]"
        />

        {/* Oscurecimiento de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/90 via-transparent to-[#111318]/40" />

        {/* Contenido */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 lg:px-8">
          <div className="max-w-2xl">
            {/* Logo principal dentro del banner */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative mb-5 h-24 w-full max-w-[500px] sm:h-28"
            >
              <Image
                src="/logo-servicios-profesiona.png"
                alt="Servicios Profesionales - David R. Aguirre"
                fill
                priority
                className="object-contain object-left"
              />
            </motion.div>

            {/* Ubicación */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-[#F5B700]" />

              <span className="text-sm font-semibold text-white">
                Servicios de construcción en Salta
              </span>
            </motion.div>

            {/* Título animado */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              <span className="block min-h-[100px] sm:min-h-[120px]">
                <TextoEscribiendo />
              </span>

              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 2.3,
                }}
                className="mt-1 block text-[#F5B700]"
              >
                con terminaciones profesionales
              </motion.span>
            </motion.h1>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="mt-6 max-w-xl text-base leading-7 text-gray-200 sm:text-lg"
            >
              Construcción en seco, pintura y terminación de obras con
              responsabilidad, experiencia y atención en cada detalle.
            </motion.p>

            {/* Botones */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.7 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-[#F5B700] px-7 py-4 text-center font-bold text-[#171A1F] shadow-[0_12px_35px_rgba(245,183,0,0.3)] transition hover:bg-[#FFD044]"
              >
                Solicitar presupuesto
              </motion.a>

              <motion.a
                href="#servicios"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full border border-white/30 bg-white/10 px-7 py-4 text-center font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Conocer servicios
              </motion.a>
            </motion.div>

            {/* Beneficios */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.9 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-200"
            >
              <span>✓ Atención personalizada</span>
              <span>✓ Presupuesto sin compromiso</span>
              <span>✓ Trabajos en Salta</span>
            </motion.div>
          </div>
        </div>
      </section>
      <CarruselMarcas />
      <Servicios />
      <Obras />
      <Contacto />
    </main>
    
    
  );
}