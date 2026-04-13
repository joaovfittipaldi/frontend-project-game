# Jogo da Memória — Trabalho de Front End

Jogo da memória para dois jogadores, desenvolvido com HTML, CSS e JavaScript puro, sem uso de bibliotecas externas.

---

## Estrutura de arquivos

```
/
├── index.html    # Página inicial (configuração dos jogadores)
├── jogo.html     # Página do jogo em si
├── script.js     # Toda a lógica do jogo
└── style.css     # Estilos de ambas as páginas
```

---

## Como jogar

1. Abra o arquivo `index.html` no navegador
2. Digite o nome dos dois jogadores
3. Clique em **Iniciar Partida**
4. Os jogadores se alternam clicando nas cartas para encontrar pares
5. Quem encontrar mais pares ao final vence

Não é necessário instalar nada ou usar servidor. Basta abrir o `index.html` diretamente no navegador.

---

## Funcionamento

### Página inicial (`index.html`)
Formulário simples com dois campos de nome e um botão que redireciona para `jogo.html`, passando os nomes via query string (`?p1=...&p2=...`).

### Página do jogo (`jogo.html`)
Ao carregar, lê os nomes da URL e inicializa o jogo. A página é composta por três seções:

- **Placar** — tabela dinâmica com o nome e a pontuação de cada jogador. A linha do jogador da vez é destacada em amarelo.
- **Tabuleiro** — grade 4×4 com 16 cartas (8 pares de emojis). As cartas são embaralhadas a cada partida.
- **Histórico de ações** — lista dinâmica que registra cada par encontrado, com botão para limpar.

### Mecânica de turno
- O jogador da vez clica em duas cartas
- Se formarem par: as cartas ficam viradas, o jogador marca ponto e mantém a vez
- Se não formarem par: as cartas viram de volta após 1 segundo e a vez passa para o outro jogador

---

## Requisitos técnicos atendidos

| Requisito | Como foi implementado |
|---|---|
| Animação com figuras | Cartas com animação CSS de flip (rotateY) ao serem reveladas |
| Dois jogadores humanos | Dois jogadores se alternam na mesma tela |
| Tabela dinâmica | Placar gerado e atualizado via JS (`createElement`, `innerHTML`) |
| Lista dinâmica | Histórico de ações com itens adicionados e removidos via JS |
| Mudança de estilo por estado | Linha do jogador da vez recebe a classe `.vez-do-jogador` dinamicamente |
| Resposta a eventos | Cliques nas cartas, botão de iniciar e botão de limpar histórico |
| Placar atualizado | Pontuação e nome de cada jogador exibidos e atualizados em tempo real |
| Duas páginas com passagem de parâmetros | Nomes enviados via query string e lidos com `URLSearchParams` |
| Layout CSS | Flexbox e Grid usados para organizar o tabuleiro e a interface |
| Classes JS | `CartaLogica` (representa cada carta) e `MotorJogo` (gerencia o estado da partida) |
| Sem bibliotecas externas | HTML, CSS e JS puros |
| Separação completa HTML/CSS/JS | Sem código JS ou CSS inline nos HTMLs |

---

## Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, transitions)
- JavaScript ES6+ (classes, arrow functions, URLSearchParams)
