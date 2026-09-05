import { motion } from 'framer-motion'

const LAYERS = [
  { label: 'Etapa 1', value: 'Analiză' },
  { label: 'Etapa 2', value: 'Construcție' },
  { label: 'Etapa 3', value: 'Livrare' },
]

export default function Architecture() {
  return (
    <section
      id="despre"
      className="relative min-h-screen w-full bg-black px-6 py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">
            Proces
          </p>
          <h2 className="mb-10 text-[clamp(28px,6vw,56px)] font-light leading-[1.15] tracking-[-0.02em] text-white">
            Trei pași. Zero bătăi de cap.
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/45 sm:text-[17px]">
            Analizez afacerea și identific oportunitățile de creștere.
            Construiesc soluția potrivită — site, automatizare sau aplicație.
            Livrez și optimizez continuu, pe baza rezultatelor reale.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 flex w-full flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {LAYERS.map((layer) => (
            <div
              key={layer.label}
              className="flex h-[72px] w-full max-w-md items-center justify-between rounded-lg border border-white/10 px-6"
            >
              <span className="text-[12px] uppercase tracking-[0.15em] text-white/30">
                {layer.label}
              </span>
              <span className="text-[16px] font-light text-white sm:text-[18px]">
                {layer.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
