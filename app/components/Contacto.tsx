"use client";

import Image from "next/image";
import { motion } from "motion/react";

const WHATSAPP_URL =
  "https://wa.me/5493875510713?text=Hola%20David%2C%20vi%20la%20p%C3%A1gina%20de%20Servicios%20Profesionales%20y%20quisiera%20solicitar%20un%20presupuesto.";



const TARJETA_URL = "/tarjeta-servicios-profesionales.png";

export default function Contacto() {
  const descargarTarjeta = () => {
    const enlace = document.createElement("a");

    enlace.href = TARJETA_URL;
    enlace.download = "Servicios-Profesionales-David-Aguirre.png";

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  };

  const compartirTarjeta = async () => {
    try {
      const respuesta = await fetch(TARJETA_URL);
      const imagen = await respuesta.blob();

      const archivo = new File(
        [imagen],
        "Servicios-Profesionales-David-Aguirre.png",
        {
          type: "image/png",
        },
      );

      if (
        navigator.share &&
        navigator.canShare?.({
          files: [archivo],
        })
      ) {
        await navigator.share({
          title: "Servicios Profesionales",
          text: "Servicios Profesionales de David R. Aguirre",
          files: [archivo],
        });

        return;
      }

      descargarTarjeta();
    } catch (error) {
      console.error("No se pudo compartir la tarjeta:", error);
      descargarTarjeta();
    }
  };

  return (
    <section
      id="contacto"
      className="overflow-hidden bg-[#F7F7F4] px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_420px]">
        {/* Información */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#B98300]">
            Hablemos de tu proyecto
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight text-[#171A1F] sm:text-4xl lg:text-5xl">
            ¿Necesitás transformar un espacio?
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
            Comunicate con David para recibir atención personalizada y solicitar
            un presupuesto sin compromiso.
          </p>

          {/* Datos */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href="tel:+5493875510713"
              className="group rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-[#F5B700] hover:shadow-lg"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Teléfono
              </span>

              <p className="mt-1 font-bold text-[#171A1F] group-hover:text-[#B98300]">
                +54 9 387 551-0713
              </p>
            </a>

            <a
              href="mailto:d-aguirre-rupe@hotmail.com"
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-[#F5B700] hover:shadow-lg"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Correo
              </span>

              <p className="mt-1 truncate font-bold text-[#171A1F] group-hover:text-[#B98300]">
                d-aguirre-rupe@hotmail.com
              </p>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Juan+Vucetich+178+Barrio+Universitario+Salta"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-[#F5B700] hover:shadow-lg sm:col-span-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Dirección
              </span>

              <p className="mt-1 font-bold text-[#171A1F] group-hover:text-[#B98300]">
                Juan Vucetich 178 · B° Universitario · Salta
              </p>
            </a>
          </div>

          {/* Botones */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#F5B700] px-6 py-4 text-center font-bold text-[#171A1F] shadow-[0_12px_30px_rgba(245,183,0,0.25)] transition hover:bg-[#FFD044]"
            >
              WhatsApp
            </motion.a>

            <motion.button
              type="button"
              onClick={compartirTarjeta}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#171A1F] px-6 py-4 font-bold text-white transition hover:bg-[#292E36]"
            >
              Compartir tarjeta
            </motion.button>

            <motion.button
              type="button"
              onClick={descargarTarjeta}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border-2 border-[#171A1F] px-6 py-4 font-bold text-[#171A1F] transition hover:bg-[#171A1F] hover:text-white"
            >
              Descargar
            </motion.button>
          </div>
        </motion.div>

        {/* Vista previa: oculta en celular para no alargar la página */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative hidden aspect-[2/3] overflow-hidden rounded-3xl shadow-[0_25px_70px_rgba(17,19,24,0.25)] lg:block"
        >
          <Image
            src={TARJETA_URL}
            alt="Tarjeta de Servicios Profesionales de David R. Aguirre"
            fill
            sizes="420px"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Pie */}
      <div className="mx-auto mt-14 max-w-7xl border-t border-gray-300 pt-7 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Servicios Profesionales · David R.
          Aguirre
        </p>
      </div>
    </section>
  );
}