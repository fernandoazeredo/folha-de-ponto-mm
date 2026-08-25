'use strict';

const funcionarios = {
  carla: {
    nome: 'Carla Regina Roberto Trindade',
    admissao: '01/09/22',
    cargo: 'Advogada'
  },
  carolina: {
    nome: 'Carolina Santoro de Carvalho',
    admissao: '07/04/22',
    cargo: 'Adv Jr I'
  },
  christiane: {
    nome: 'Christiane Ferreira Alves do Nascimento',
    admissao: '04/07/22',
    cargo: 'Advogada'
  },
  debora: {
    nome: 'Débora Muniz Lisboa',
    admissao: '01/03/13',
    cargo: 'Coordenadora'
  },
  erico: {
    nome: 'Erico dos Santos de Lima',
    admissao: '01/10/20',
    cargo: 'Adv Jr I'
  },
  gabriele: {
    nome: 'Gabriele de Souza Cunha',
    admissao: '10/07/23',
    cargo: 'Assist Jur'
  },
  jamily: {
    nome: 'Jamily da Silva',
    admissao: '16/09/24',
    cargo: 'Advogada'
  },
  juliana: {
    nome: 'Juliana Dias da Mota Borba',
    admissao: '27/05/24',
    cargo: 'Recepção'
  },
  lelia: {
    nome: 'Lelia Maria Faria Gaspar',
    admissao: '01/10/24',
    cargo: 'Advogada'
  },
  maria_elizabete: {
    nome: 'Maria Elizabete de Lima',
    admissao: '02/05/17',
    cargo: 'Aux Serv Gerais'
  },
  maria_socorro: {
    nome: 'Maria Socorro C Filgueira',
    admissao: '26/02/2024',
    cargo: 'Assist. Finan.'
  },
  mariana: {
    nome: 'Mariana Oliveira dos Santos',
    admissao: '21/01/21',
    cargo: 'Adv Jr'
  },
  michel: {
    nome: 'Michel dos Santos Barreto',
    admissao: '29/06/23',
    cargo: 'Assist Jur'
  },
  nicole: {
    nome: 'Nicole Silva Rocha',
    admissao: '21/02/22',
    cargo: 'Assist Jur'
  },
  pollyana: {
    nome: 'Pollyana Lourenço da Silva',
    admissao: '13/02/20',
    cargo: 'Assist Jur'
  },
  renata: {
    nome: 'Renata Cristina Alves da Cunha',
    admissao: '07/04/25',
    cargo: 'Assist Jur'
  },
  solange: {
    nome: 'Solange de Souza Mendes',
    admissao: '28/10/19',
    cargo: 'Assist Jur'
  },
  thais: {
    nome: 'Thais da Silva Reis',
    admissao: '18/07/17',
    cargo: 'Assist Jur'
  },
  vanessa: {
    nome: 'Vanessa de Souza Joaquim',
    admissao: '01/11/19',
    cargo: 'Assist Jur'
  }
};

const feriadosFixos = ['01/01', '21/04', '01/05', '07/09', '12/10', '02/11', '15/11', '25/12'];

function calcularFeriadosMoveis(ano) {
  const f = Math.floor;
  const G = ano % 19;
  const C = f(ano / 100);
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  const J = (ano + f(ano / 4) + I + 2 - C + f(C / 4)) % 7;
  const L = I - J;
  const mPas = 3 + f((L + 40) / 44);
  const dPas = L + 28 - 31 * f(mPas / 4);
  const pas = new Date(ano, mPas - 1, dPas);
  const dia = 86400000;

  return [pas.getTime() - 2 * dia, pas.getTime() - dia, pas.getTime(), pas.getTime() + 60 * dia]
    .map((timestamp) => {
      const data = new Date(timestamp);
      return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
    });
}

function atualizarEspelhosDeImpressao() {
  const mSel = document.getElementById('mesSelect');
  const aSel = document.getElementById('anoSelect');
  const fSel = document.getElementById('funcionarioSelect');
  document.getElementById('mesPrint').textContent = mSel.options[mSel.selectedIndex]?.text || '';
  document.getElementById('anoPrint').textContent = aSel.value || '';

  const key = fSel.value;
  document.getElementById('funcionarioPrint').textContent =
    (key && key !== 'todos' && funcionarios[key]?.nome) ? funcionarios[key].nome : '';
}

function preencherDadosFuncionario() {
  const key = document.getElementById('funcionarioSelect').value;
  const funcionario = funcionarios[key];
  document.getElementById('dataAdmissao').innerText = funcionario?.admissao || '---';
  document.getElementById('cargo').innerText = funcionario?.cargo || '---';
  atualizarEspelhosDeImpressao();
}

function gerarFolha() {
  const mes = Number(document.getElementById('mesSelect').value);
  const ano = Number(document.getElementById('anoSelect').value);
  const tbody = document.getElementById('folhaTabela');
  tbody.innerHTML = '';

  const dias = new Date(ano, mes + 1, 0).getDate();
  const feriadosMoveis = calcularFeriadosMoveis(ano);

  for (let dia = 1; dia <= dias; dia += 1) {
    const data = new Date(ano, mes, dia);
    const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase();
    const dataFormatada = data.toLocaleDateString('pt-BR');
    const chave = `${String(dia).padStart(2, '0')}/${String(mes + 1).padStart(2, '0')}`;
    const feriadoFixo = feriadosFixos.includes(chave);
    const feriadoMovel = feriadosMoveis.includes(chave);
    const numeroDiaSemana = data.getDay();
    let jornada = '';
    let inicioIntervalo = '';
    let fimIntervalo = '';
    let extra = '';

    if (feriadoFixo || feriadoMovel) {
      jornada = inicioIntervalo = fimIntervalo = extra = 'FERIADO';
    } else if (numeroDiaSemana === 0) {
      jornada = inicioIntervalo = fimIntervalo = extra = 'DOMINGO';
    } else if (numeroDiaSemana === 6) {
      jornada = inicioIntervalo = fimIntervalo = extra = 'SÁBADO';
    }

    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${dataFormatada}</td><td>${diaSemana}</td>
      <td contenteditable="true">${jornada}</td><td contenteditable="true">${inicioIntervalo}</td>
      <td contenteditable="true">${fimIntervalo}</td><td contenteditable="true">${jornada}</td>
      <td contenteditable="true">${extra}</td><td contenteditable="true">${extra}</td>
      <td contenteditable="true"></td>`;
    tbody.appendChild(linha);
  }

  atualizarEspelhosDeImpressao();
}

function handleFuncionarioChange() {
  const selecionado = document.getElementById('funcionarioSelect').value;

  if (selecionado === 'todos') {
    document.getElementById('dataAdmissao').innerText = '---';
    document.getElementById('cargo').innerText = '---';
    gerarFolha();
    return;
  }

  preencherDadosFuncionario();
  gerarFolha();
}

function imprimirAtual() {
  document.body.classList.remove('batch-print');
  document.getElementById('printArea').innerHTML = '';
  atualizarEspelhosDeImpressao();
  requestAnimationFrame(() => setTimeout(() => window.print(), 0));
}

function imprimirTodos() {
  document.body.classList.add('batch-print');
  const printArea = document.getElementById('printArea');
  const sheet = document.getElementById('sheet');
  const funcionarioSelect = document.getElementById('funcionarioSelect');
  const funcionarioAnterior = funcionarioSelect.value;
  printArea.innerHTML = '';

  const fragmento = document.createDocumentFragment();

  for (const key of Object.keys(funcionarios)) {
    funcionarioSelect.value = key;
    preencherDadosFuncionario();
    gerarFolha();
    atualizarEspelhosDeImpressao();

    const copia = sheet.cloneNode(true);
    copia.removeAttribute('id');
    copia.querySelectorAll('[id]').forEach((elemento) => elemento.removeAttribute('id'));
    copia.style.pageBreakAfter = 'always';
    fragmento.appendChild(copia);
  }

  printArea.appendChild(fragmento);

  const limparImpressao = () => {
    document.body.classList.remove('batch-print');
    printArea.innerHTML = '';
    funcionarioSelect.value = funcionarioAnterior;

    if (funcionarioAnterior && funcionarioAnterior !== 'todos') {
      preencherDadosFuncionario();
    } else {
      document.getElementById('dataAdmissao').innerText = '---';
      document.getElementById('cargo').innerText = '---';
    }

    gerarFolha();
    window.onafterprint = null;
  };

  requestAnimationFrame(() => {
    setTimeout(() => {
      window.onafterprint = limparImpressao;
      window.print();
      setTimeout(() => {
        if (document.body.classList.contains('batch-print')) {
          limparImpressao();
        }
      }, 1500);
    }, 50);
  });
}

function alternarTema() {
  const escuroAtivo = document.body.classList.toggle('dark-mode');
  const botao = document.getElementById('btnTheme');
  botao.textContent = escuroAtivo ? 'Modo claro' : 'Modo escuro';
  botao.setAttribute('aria-pressed', String(escuroAtivo));
}

document.addEventListener('DOMContentLoaded', () => {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const selMes = document.getElementById('mesSelect');
  const selAno = document.getElementById('anoSelect');

  meses.forEach((mes, indice) => selMes.add(new Option(mes, indice)));
  selMes.value = new Date().getMonth();

  for (let ano = 2015; ano <= 2065; ano += 1) {
    selAno.add(new Option(ano, ano));
  }

  selAno.value = new Date().getFullYear();

  selMes.addEventListener('change', gerarFolha);
  selAno.addEventListener('change', gerarFolha);
  document.getElementById('funcionarioSelect').addEventListener('change', handleFuncionarioChange);
  document.getElementById('btnPrint').addEventListener('click', imprimirAtual);
  document.getElementById('btnPrintAll').addEventListener('click', imprimirTodos);
  document.getElementById('btnTheme').addEventListener('click', alternarTema);

  gerarFolha();
});
