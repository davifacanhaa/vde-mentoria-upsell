// Configuração das 6 páginas de upsell da Mentoria do Método VDE (2ª Fase OAB).
// Edite aqui e rode `node build.mjs` para regenerar as páginas.
//
// Os checkoutUrl foram conferidos um por um abrindo cada link e lendo o nome do
// produto na página da Hotmart (ex.: "Mentoria - VDE 2ª Fase Penal"), porque a
// lista recebida estava em ordem alfabética, não na ordem das matérias abaixo.

// ---------------------------------------------------------------------------
// VTURB
// ---------------------------------------------------------------------------
// ID da conta Vturb (o mesmo para todos os vídeos da conta). No painel do Vturb
// ele aparece no código de incorporação, no meio da URL do script:
//   https://scripts.converteai.net/<ACCOUNT_ID>/players/<PLAYER_ID>/v4/player.js
// Cole aqui só o <ACCOUNT_ID>.
export const VTURB_ACCOUNT_ID = "";

// Para cada matéria, cole em `vturbPlayerId` o <PLAYER_ID> daquele vídeo
// (mesma URL do script, depois de /players/).
//
// Se o painel do Vturb te der um snippet diferente do padrão v4, cole o código
// inteiro em `vslEmbedRaw` e ele é usado exatamente como está, ignorando os IDs.
//
// Sem ID e sem snippet, a página mostra o placeholder de vídeo.

// ---------------------------------------------------------------------------
// PREÇO (torre de preço do card). Vale para todas as matérias; para variar em
// uma, adicione `preco: { de: "...", parcelas: 12, parcela: "..." }` na matéria.
// ---------------------------------------------------------------------------
export const PRECO = { de: "2.997", parcelas: 12, parcela: "149,71" };

export const MATERIAS = [
  {
    slug: "penal",
    materia: "Direito Penal",
    curta: "Penal",
    vagas: 20,
    checkoutUrl: "https://pay.hotmart.com/W107452136P?off=sipj6ywt&checkoutMode=10",
    vturbPlayerId: "",
    vslEmbedRaw: "",
  },
  {
    slug: "administrativo",
    materia: "Direito Administrativo",
    curta: "Administrativo",
    vagas: 10,
    // Único link sem parâmetro `off=` (cai na oferta padrão do produto). Confirmar com o Davi.
    checkoutUrl: "https://pay.hotmart.com/U107452050T?checkoutMode=10",
    vturbPlayerId: "",
    vslEmbedRaw: "",
  },
  {
    slug: "trabalho",
    materia: "Direito do Trabalho",
    curta: "Trabalho",
    vagas: 20,
    checkoutUrl: "https://pay.hotmart.com/M107452107V?off=5qu3at55&checkoutMode=10",
    vturbPlayerId: "",
    vslEmbedRaw: "",
  },
  {
    slug: "tributario",
    materia: "Direito Tributário",
    curta: "Tributário",
    vagas: 10,
    checkoutUrl: "https://pay.hotmart.com/M107452164I?off=rwulhps9&checkoutMode=10",
    vturbPlayerId: "",
    vslEmbedRaw: "",
  },
  {
    slug: "constitucional",
    materia: "Direito Constitucional",
    curta: "Constitucional",
    vagas: 20,
    checkoutUrl: "https://pay.hotmart.com/P107452154P?off=f0t5hky9&checkoutMode=10",
    vturbPlayerId: "",
    vslEmbedRaw: "",
  },
  {
    slug: "civil",
    materia: "Direito Civil",
    curta: "Civil",
    vagas: 10,
    // Único link sem `checkoutMode=10` (os outros 5 têm). Confirmar com o Davi.
    checkoutUrl: "https://pay.hotmart.com/N107451857K?off=9lf5etnd",
    vturbPlayerId: "",
    vslEmbedRaw: "",
  },
];
