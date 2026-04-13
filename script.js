class CartaLogica {
    constructor(id, simbolo) {
        this.id = id;
        this.simbolo = simbolo;
        this.revelada = false;
        this.concluida = false;
    }
}

class MotorJogo {
    constructor(n1, n2) {
        this.jogadores = [{nome: n1, pontos: 0}, {nome: n2, pontos: 0}];
        this.turno = 0;
        this.cartas = [];
        this.selecionadas = [];
        this.podeJogar = true;
    }

    inicializarCartas() {
        const simbolos = ['🔥', '⭐', '🍀', '💎', '🍎', '👻', '☀️', '🌙'];
        const deck = [...simbolos, ...simbolos];
        deck.sort(() => Math.random() - 0.5);
        this.cartas = deck.map((s, i) => new CartaLogica(i, s));
    }
}

let jogo;

function iniciar() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('p1')) {
        jogo = new MotorJogo(params.get('p1'), params.get('p2'));
        jogo.inicializarCartas();
        montarTabuleiro();
        atualizarInterface();
    }
}

function montarTabuleiro() {
    const container = document.getElementById('tabuleiro');
    if (!container) return;
    
    jogo.cartas.forEach(c => {
        const div = document.createElement('div');
        div.classList.add('carta');
        div.dataset.id = c.id;
        div.textContent = c.simbolo;
        div.addEventListener('click', selecionarCarta);
        container.appendChild(div);
    });
}

function selecionarCarta(e) {
    if (!jogo.podeJogar) return;
    const id = e.target.dataset.id;
    const carta = jogo.cartas[id];

    if (carta.revelada || jogo.selecionadas.length >= 2) return;

    e.target.classList.add('revelada');
    carta.revelada = true;
    jogo.selecionadas.push({obj: carta, el: e.target});

    if (jogo.selecionadas.length === 2) verificarPar();
}

function verificarPar() {
    jogo.podeJogar = false;
    const [c1, c2] = jogo.selecionadas;

    if (c1.obj.simbolo === c2.obj.simbolo) {
        jogo.jogadores[jogo.turno].pontos++;
        c1.el.classList.add('par-encontrado');
        c2.el.classList.add('par-encontrado');
        adicionarHistorico(`Par de ${c1.obj.simbolo} encontrado por ${jogo.jogadores[jogo.turno].nome}`);
        resetTurno(true);
    } else {
        setTimeout(() => {
            c1.el.classList.remove('revelada');
            c2.el.classList.remove('revelada');
            c1.obj.revelada = false;
            c2.obj.revelada = false;
            jogo.turno = (jogo.turno === 0) ? 1 : 0;
            resetTurno(false);
        }, 1000);
    }
}

function resetTurno(manterTurno) {
    jogo.selecionadas = [];
    jogo.podeJogar = true;
    atualizarInterface();
}

function atualizarInterface() {
    const corpo = document.getElementById('corpoPlacar');
    corpo.innerHTML = '';
    
    jogo.jogadores.forEach((j, index) => {
        const tr = document.createElement('tr');
        if (index === jogo.turno) tr.classList.add('vez-do-jogador');
        tr.innerHTML = `<td>${j.nome}</td><td>${j.pontos}</td>`;
        corpo.appendChild(tr);
    });
    
    document.getElementById('jogadorAtual').textContent = jogo.jogadores[jogo.turno].nome;
}

function adicionarHistorico(texto) {
    const lista = document.getElementById('listaEventos');
    const li = document.createElement('li');
    li.textContent = texto;
    lista.appendChild(li);
}

if (document.getElementById('btnIniciar')) {
    document.getElementById('btnIniciar').onclick = () => {
        const n1 = document.getElementById('p1').value || 'Jogador 1';
        const n2 = document.getElementById('p2').value || 'Jogador 2';
        window.location.href = `jogo.html?p1=${n1}&p2=${n2}`;
    };
}

if (document.getElementById('btnLimparHistorico')) {
    document.getElementById('btnLimparHistorico').onclick = () => {
        document.getElementById('listaEventos').innerHTML = '';
    };

}

window.onload = iniciar;