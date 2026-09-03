// Gera as 6 páginas de upsell a partir de template.html + config.mjs.
// Uso: node build.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { MATERIAS, VTURB_ACCOUNT_ID, PRECO, MENTORA } from "./config.mjs";

const template = readFileSync(new URL("./template.html", import.meta.url), "utf8");

// URLs de checkout têm `&` (ex.: ?off=x&checkoutMode=10); escapar para HTML válido.
const escAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

// "A, B e C" — vírgulas entre os primeiros e "e" antes do último.
function listarNomes(nomes) {
  if (nomes.length === 1) return nomes[0];
  return nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1];
}

const PLACEHOLDER = `<div class="vsl-placeholder">
        <div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
        <p>Assista ao vídeo antes de garantir a sua vaga.</p>
      </div>`;

// Embed padrão v4 do Vturb (smart player). O player define a própria altura,
// por isso o frame perde o aspect-ratio fixo quando há player (classe is-player).
function embedVturb(playerId) {
  return `<vturb-smartplayer id="vid-${playerId}" style="display:block;width:100%;"></vturb-smartplayer>
      <script type="text/javascript">
        (function () {
          var s = document.createElement("script");
          s.src = "https://scripts.converteai.net/${VTURB_ACCOUNT_ID}/players/${playerId}/v4/player.js";
          s.async = true;
          document.head.appendChild(s);
        })();
      </script>`;
}

function blocoVsl(m) {
  if (m.vslEmbedRaw && m.vslEmbedRaw.trim()) {
    return { html: m.vslEmbedRaw.trim(), classe: " is-player", fonte: "embed colado" };
  }
  if (m.vturbPlayerId && m.vturbPlayerId.trim()) {
    if (!VTURB_ACCOUNT_ID || !VTURB_ACCOUNT_ID.trim()) {
      throw new Error(
        `/${m.slug}: vturbPlayerId preenchido mas VTURB_ACCOUNT_ID está vazio no config.mjs.`
      );
    }
    return { html: embedVturb(m.vturbPlayerId.trim()), classe: " is-player", fonte: "vturb" };
  }
  return { html: PLACEHOLDER, classe: "", fonte: "placeholder" };
}

for (const m of MATERIAS) {
  const vsl = blocoVsl(m);
  const preco = { ...PRECO, ...(m.preco || {}) };
  const professores = listarNomes([MENTORA, ...(m.professores || [])]);

  const html = template
    .replaceAll("{{MATERIA}}", m.materia)
    .replaceAll("{{CURTA}}", m.curta)
    .replaceAll("{{VAGAS}}", String(m.vagas))
    .replaceAll("{{CHECKOUT_URL}}", escAttr(m.checkoutUrl))
    .replaceAll("{{PROFESSORES}}", professores)
    .replaceAll("{{PRECO_DE}}", preco.de)
    .replaceAll("{{PARCELAS}}", String(preco.parcelas))
    .replaceAll("{{PRECO_PARCELA}}", preco.parcela)
    .replaceAll("{{VSL_CLASS}}", vsl.classe)
    .replaceAll("{{VSL_BLOCK}}", vsl.html)
    .replaceAll("{{SLUG}}", m.slug);

  mkdirSync(new URL(`./${m.slug}`, import.meta.url), { recursive: true });
  writeFileSync(new URL(`./${m.slug}/index.html`, import.meta.url), html);
  console.log(`ok  /${m.slug}  (${m.materia} · ${m.vagas} vagas · vídeo: ${vsl.fonte})`);
}

console.log(`\n${MATERIAS.length} páginas geradas.`);
