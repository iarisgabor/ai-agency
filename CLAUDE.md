# CLAUDE.md — ai-agency (site de prezentare, Iaris Gabor)

Site de prezentare de o pagină pentru servicii AI oferite afacerilor locale din România.
**Vite + React 18 + TypeScript + Tailwind + Framer Motion**, deployat pe Vercel.
Singurul proiect din acest folder de pe disc care are build step.

## ⚠️ Repo git independent

**Acest folder e un repo git separat**, cu remote propriu
(`https://github.com/iarisgabor/ai-agency.git`). E ignorat explicit din monorepo-ul
`Claude code curs` (`.gitignore` de la rădăcină: `personal/ai-agency/`), ca să nu apară ca
gitlink/submodul spart.

**Orice commit se face din acest folder, cu `git`-ul lui** — niciodată din rădăcina
monorepo-ului. Inclusiv fișierul de față: el aparține repo-ului `ai-agency`.

## Structură

```
index.html            shell Vite (lang="ro")
src/main.tsx          montarea React
src/App.tsx           ordinea secțiunilor + gate-ul de intrare (800ms)
src/index.css         Tailwind + fonturi + reset; fundal negru global
src/components/       Navbar, Footer, Logo, SquashHamburger, ScrambleIn, ScrambleText
src/sections/         Hero, CinematicText, Metrics, Technology, Architecture
public/videos/        hero-scrub.mp4 (local, vezi mai jos)
public/favicon.svg, public/icons.svg
```

`App.tsx` ține un singur bit de stare — `entranceComplete`, după 800ms — pasat spre
`Navbar` și `Hero` ca să-și pornească animațiile de intrare.

## Secțiuni

| Componentă | Ce e |
|---|---|
| `Hero` | video scrubbed **cu mișcarea mouse-ului pe orizontală** (nu cu scroll) |
| `CinematicText` | text animat la scroll (`useScroll` + `useSpring` + `useMotionTemplate`) |
| `Metrics` | trei cifre (48h / 100+ / 24/7) |
| `Technology` | lista de servicii (Găsire Clienți, Site-uri AI, …) |
| `Architecture` | cele trei etape: Analiză → Construcție → Livrare |

Conținutul (cifre, servicii, etape) e hardcodat în constante la începutul fiecărei
secțiuni — acolo se editează.

## De reținut

1. **Video-ul din Hero e local (`/videos/hero-scrub.mp4`), deliberat.** Originalul de pe
   CloudFront avea **un singur keyframe pe tot clipul**, deci fiecare seek forța decodare
   de la început și scrub-ul era sacadat la mișcări rapide de mouse. A fost re-codat cu
   ffmpeg, **keyframe pe fiecare cadru** (commit `87587bc`) — de aici și cei ~9.7 MB.
   Dacă îl înlocuiești, re-encodează la fel (`-g 1` / `keyint=1`), altfel scrub-ul se
   strică din nou.
2. **Celelalte trei secțiuni încă folosesc video de pe CloudFront** (URL-uri hardcodate în
   `CinematicText.tsx`, `Metrics.tsx`, `Technology.tsx`). Acelea doar rulează, nu sunt
   scrubbed, deci n-au aceeași cerință de encodare.
3. **Scrub-ul serializează seek-urile** printr-un flag `seekingRef` + handler `seeked` —
   fără el, `currentTime` setat mai repede decât poate decoda browserul pierde cadre.
4. **Tailwind e configurat cu Space Mono pe toate cele trei familii** (`sans`, `serif`,
   `mono`) — nu există font cu serife în design, e intenționat.
5. **`index.css` conține clase `.lenis-*`** rămase de la o integrare Lenis care nu mai e
   instalată — CSS mort, inofensiv.
6. `README.md` e cel generat de template-ul Vite, nu documentație a proiectului. Fișierul
   de față îl înlocuiește ca ghid.

## Comenzi

```bash
npm install
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run lint      # oxlint (nu ESLint)
npm run preview
```

Deploy: Vercel (`.vercel/project.json` prezent local, gitignored).
