# VDE Mentoria Upsell · 2ª Fase OAB

6 páginas de upsell da Mentoria do Método VDE (2ª Fase OAB), uma por matéria, geradas de um template único. Estrutura de 1 dobra espelhando a referência (Ícaro/MAV): barra superior, logo, headline, VSL, card de CTA. Sem rodapé.

## Identidade (extraída de metodovde.com.br/segundafase)

Tokens lidos do CSS e do DOM do site oficial, não aproximados:

| Token | Valor | Onde o site usa |
|---|---|---|
| gradiente da marca | `#5A009F → #0047AA` (`to right`) | botões, barra superior, texto em destaque |
| gradiente secundário | `#3388FF → #0047AA` | aba superior dos cards de disciplina |
| fundo da página | `#F8F6FA` (`bg-secondary`) | body |
| card | `#FFFFFF` (`bg-primary`) | cards |
| texto | `#0C030C` (`text-primary`) | títulos |
| texto secundário | `#666666` (`text-secondary`) | corpo |
| raio | 24px (`rounded-3xl`) e `999px` (pills) | cards e botões |
| fonte | Poppins | tudo |
| headline | peso **500**, sentence case, destaque em gradiente | h1/h2 do site |

Assets em `assets/` baixados do próprio site: `logo-2fase.svg` (logo vetorial oficial), `fundo-gradiente.svg` (os 3 halos concêntricos do hero, 5/10/15% de opacidade), `estrela.svg`, e `olho-2fase.svg` (o símbolo do olho recortado da logo, usado como marca d'água de fundo).

## URLs

| Rota | Matéria | Vagas |
|---|---|---|
| `/penal` | Direito Penal | 20 |
| `/administrativo` | Direito Administrativo | 10 |
| `/trabalho` | Direito do Trabalho | 20 |
| `/tributario` | Direito Tributário | 10 |
| `/constitucional` | Direito Constitucional | 20 |
| `/civil` | Direito Civil | 10 |
| `/obrigado` | Página de obrigado (comum às seis) | — |

Mesmos slugs das turmas do site oficial (`metodovde.com.br/segundafase/turma/<slug>`).

## Página de obrigado (`/obrigado`)

Uma só para as seis matérias, porque o caminho de acesso é idêntico e o link do grupo fica dentro da plataforma, não na página. Estrutura copiada de `metodovde.com.br/concursos/obrigado`: fundo em gradiente, logo branca, headline com trecho em degradê, cards com círculo de ícone e bloco de suporte.

Diferenças em relação à referência: usa o **fundo claro das páginas de venda** (`#F8F6FA` + halos do `fundo-gradiente.svg`) no lugar do fundo roxo em gradiente, e 4 passos que refletem o fluxo real da mentoria — e-mail, entrar na plataforma, abrir o módulo **Mentorias**, clicar em **Grupo do WhatsApp**. O passo 4 mostra uma pílula imitando o botão que a pessoa vê dentro do módulo.

Nos passos 3 e 4 a página usa os **prints reais da plataforma** (`assets/print-menu-mentorias.png` e `assets/print-grupo-whatsapp.png`), recortados das capturas enviadas pelo Davi, em vez de ícones recriados: a pessoa reconhece na hora o que precisa procurar. Nos passos 1 e 2 os ícones vêm do Material Symbols Outlined, mesma fonte de ícones da referência.

Arquivo estático em `obrigado/index.html` (não passa pelo `build.mjs`, já que não varia por matéria).

## Como editar

1. Tudo que muda por matéria (vagas, checkout, VSL) fica em `config.mjs`.
2. Copy e layout ficam em `template.html` (placeholders `{{MATERIA}}`, `{{CURTA}}`, `{{VAGAS}}`, `{{CHECKOUT_URL}}`, `{{VSL_BLOCK}}`).
3. Regenerar: `node build.mjs`

## Checkouts (conferidos)

A lista de links recebida estava em **ordem alfabética**, não na ordem das matérias, então cada link foi aberto e conferido pelo nome do produto na Hotmart antes de entrar no config:

| Página | ID Hotmart | Produto confirmado |
|---|---|---|
| `/penal` | W107452136P | Mentoria - VDE 2ª Fase Penal |
| `/administrativo` | U107452050T | Mentoria - VDE 2ª Fase Administrativo |
| `/trabalho` | M107452107V | Mentoria - VDE 2ª Fase Trabalho |
| `/tributario` | M107452164I | Mentoria - VDE 2ª Fase Tributário |
| `/constitucional` | P107452154P | Mentoria - VDE 2ª Fase Constitucional |
| `/civil` | N107451857K | Mentoria - VDE 2ª Fase Civil |

Duas inconsistências nos parâmetros, mantidas como recebidas: **Administrativo** é o único sem `off=` (cai na oferta padrão do produto) e **Civil** é o único sem `checkoutMode=10`.

## Professores

Em `professores` de cada matéria no `config.mjs`. Os nomes vieram das páginas de turma de `metodovde.com.br/segundafase/turma/<slug>`, conferindo nome exibido, arquivo da foto e @ do Instagram de cada pessoa. **Ana Clara Fernandes não entra na lista** (é mentora do curso, e o bloco mostra só os professores da matéria).

| Matéria | Professores |
|---|---|
| Penal | Bruna Sakezevski, Victor Pontes |
| Administrativo | Tainan Natércia |
| Trabalho | Ana Carolina Destefani, Renata Japiassu |
| Tributário | Lara Machado |
| Constitucional | Líbero Filho, Natalia Valença |
| Civil | Eduarda Caraciolo |

Civil: o site lista também Giulia Christensen no curso, mas ela **não** participa da mentoria (confirmado pelo Davi), por isso está fora.

## Preço

Definido em `PRECO` no `config.mjs` e igual para todas as matérias: **de R$ 2.997 por 12x de R$ 149,71**.
Para variar em uma matéria só, adicione `preco: { de, parcelas, parcela }` naquela entrada do `MATERIAS`.

## VSL (Vturb)

O embed é montado pelo build. No painel do Vturb, o código de incorporação traz uma URL assim:

```
https://scripts.converteai.net/<ACCOUNT_ID>/players/<PLAYER_ID>/v4/player.js
```

1. Cole o `<ACCOUNT_ID>` em `VTURB_ACCOUNT_ID` no `config.mjs` (é o mesmo para toda a conta).
2. Cole o `<PLAYER_ID>` de cada vídeo em `vturbPlayerId` da matéria correspondente.
3. `node build.mjs`

Se o painel entregar um snippet fora do padrão v4, cole o código inteiro em `vslEmbedRaw` da matéria e ele é usado como está, ignorando os IDs. Sem ID e sem snippet, a página mostra o placeholder de vídeo.

O frame reserva 16:9 (`aspect-ratio` em `.vsl-frame`), mesmo comportamento do snippet padrão do Vturb, que usa `padding-top: 56.25%`. Isso evita salto de layout enquanto o player carrega. Se a VSL não for 16:9, trocar o `aspect-ratio` no template.

Preencher `vturbPlayerId` sem preencher `VTURB_ACCOUNT_ID` faz o build falhar com mensagem explícita, em vez de gerar um embed quebrado.

## Pendências

- [ ] IDs do Vturb (`VTURB_ACCOUNT_ID` + `vturbPlayerId` das 6 matérias)
- [ ] Confirmar as duas inconsistências de parâmetro de checkout acima

## Repositório

`davifacanhaa/vde-mentoria-upsell` (**privado**, porque a oferta ainda não foi lançada).
Para abrir ao público: `gh repo edit davifacanhaa/vde-mentoria-upsell --visibility public --accept-visibility-change-consequences`

Autor dos commits: `davifacanhaa@gmail.com` (o email metodovde causa BLOCK de git-author na Vercel).

## Deploy (padrão VDE)

```
export npm_config_cache=/tmp/npmcache-funil
npx -y vercel --prod --yes
```

Autor git: `davifacanhaa@gmail.com`.
