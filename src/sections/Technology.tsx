import { motion } from 'framer-motion'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4'

const SERVICES = [
  {
    title: 'Găsire Clienți',
    desc: 'Identific afaceri și lead-uri potrivite folosind date publice și AI.',
  },
  {
    title: 'Site-uri AI',
    desc: 'Generez site-uri personalizate, adaptate industriei, în timp record.',
  },
  {
    title: 'Automatizări',
    desc: 'Chatboți, integrări Telegram și workflow-uri care elimină munca repetitivă.',
  },
  {
    title: 'Aplicații Custom',
    desc: 'Aplicații web complete, construite cu AI, pentru nevoi specifice.',
  },
]

export default function Technology() {
  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black">
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex h-full flex-col px-8 py-12 sm:px-12 sm:py-16 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <motion.h2
            className="text-[clamp(36px,8vw,72px)] font-light leading-[0.95] tracking-[-0.03em] text-white"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
          >
            Automatizare
            <br />
            Inteligentă
          </motion.h2>

          <motion.p
            className="max-w-xs text-[13px] leading-relaxed text-white/50 sm:text-[15px] md:pt-2 md:text-right"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            Sistemul învață particularitățile afacerii tale din primele zile
            de colaborare. De acolo, fiecare proces e mapat, optimizat și
            automatizat în timp real.
          </motion.p>
        </div>

        <div className="flex-1" />

        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <h3 className="mb-2 text-[14px] font-normal text-white sm:text-[16px]">
                {service.title}
              </h3>
              <p className="text-[12px] leading-relaxed text-white/40 sm:text-[14px]">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
