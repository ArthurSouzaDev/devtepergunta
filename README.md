# devtepergunta

> "dev, te pergunta": um jogo rápido para treinar explicar tecnologia em voz alta.

O **devtepergunta** sorteia um assunto de tecnologia. Você pesquisa por 10 minutos e depois fala sobre ele por 1 minuto, com cronômetro. É um projeto pessoal e divertido, feito para treinar comunicação técnica: pesquisar rápido, organizar a ideia e explicar de forma clara.

## Inspiração

O projeto é inspirado no trabalho de [@mamejunqueira](https://instagram.com/mamejunqueira), criadora do [Em Pauta](https://empauta.co), que usa a mesma mecânica com temas como moda, beleza, cultura pop e arquitetura. O Em Pauta, por sua vez, cita como inspiração o trabalho de [@bitterbuilds](https://instagram.com/bitterbuilds).

Aqui a ideia é a mesma, mas com temas de tecnologia. Os créditos aparecem no cabeçalho e no rodapé do site.

## Como o jogo funciona

1. **Gire.** Toque em **Girar** para sortear uma pauta. Use os filtros no topo para escolher uma categoria ou deixe em **Tudo**.
2. **Pesquise.** Toque em **Pesquisar · 10 min**. O cronômetro conta 10 minutos para você estudar o assunto.
3. **Fale.** Quando a pesquisa acaba, o cronômetro passa sozinho para **1 minuto de fala**. Um aviso sonoro marca cada troca de fase. Você também pode pular a pesquisa e ir direto para a fala, com **Falar · 1 min**, ou com **Pular para a fala** durante a pesquisa.
4. **Confirme.** Ao fim do minuto, toque em **Falei!** para ganhar um ponto na sequência.

### Sequência (win streak)

- Cada pauta concluída soma **1** na sua **sequência**.
- **Desistir** no meio do cronômetro **zera** a sequência.
- O **recorde** guarda a maior sequência que você já fez, e o **total** conta todas as pautas concluídas.
- **Já falei** marca uma pauta como concluída sem usar o cronômetro, e também soma um ponto. É no sistema de confiança: use quando você já explicou o assunto em voz alta por conta própria.
- Girar para outra pauta antes de começar o cronômetro não zera a sequência.

### Salvos

Toque em **Salvar pauta** para guardar um assunto que você quer voltar a estudar. Ele aparece na lista **Salvos**, logo abaixo dos botões, na própria página principal. Para tirar uma pauta da lista, toque no **×** ao lado dela.

## Categorias

Infra, Desenvolvimento, Suporte, Linux, Windows e Geral. Hoje são 45 pautas, por exemplo:

- "Por que o Kubernetes existe, afinal?"
- "Git rebase vs. merge"
- "Tudo é arquivo no Linux"
- "O que é o registro do Windows"
- "Como a internet encontra um site"

## Tecnologias

- [Next.js](https://nextjs.org) 15 (App Router) e React 19
- TypeScript
- [Framer Motion](https://www.framer.com/motion/) para as animações
- CSS puro, sem biblioteca de componentes
- Tipografia: Bodoni Moda e Inter, via Google Fonts

Não há backend nem banco de dados. Tudo roda no navegador.

## Como rodar

Você precisa do [Node.js](https://nodejs.org) 20 ou mais recente.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros comandos:

```bash
npm run build      # build de produção
npm run start      # serve o build de produção
npm run typecheck  # checagem de tipos
```

## Estrutura

```
app/
  layout.tsx              cabeçalho, rodapé e créditos
  page.tsx                página principal
  globals.css             tema (azul e roxo) e estilos
  _components/Gerador.tsx sorteio, cronômetro, sequência e salvos
lib/
  topics.ts               lista de pautas e categorias
  progress.ts             regras da sequência
  useStoredState.ts       estado salvo no localStorage
  format.ts               formatação do tempo (mm:ss)
```

## Adicionando pautas

Edite `lib/topics.ts` e acrescente um item à lista `TOPICS`:

```ts
{
  id: "dev-11",          // único
  category: "Desenvolvimento",
  title: "O que é idempotência",
  hint: "Repetir a operação sem mudar o resultado.",
}
```

Para criar uma categoria nova, inclua o nome no tipo `Category` e na lista `CATEGORIES`.

## Dados salvos

Os salvos e a sequência ficam no `localStorage` do navegador, então cada navegador e cada dispositivo tem os seus. Não há conta nem sincronização. Limpar os dados do site apaga tudo.

As chaves usadas são `devtepergunta:saved` e `devtepergunta:progress`.

## Ideias para o futuro

- Conta de usuário para sincronizar salvos e sequência entre dispositivos
- Mais pautas e níveis de dificuldade
- Histórico das pautas faladas

## Licença

Projeto pessoal, sem licença definida até o momento.
