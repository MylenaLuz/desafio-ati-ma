// script.js
function menuShow() {
  var menuMobile = document.querySelector('.mobile-menu');
  var icon = document.querySelector('.hamburguer-icon');
  if (!menuMobile || !icon) return;

  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.remove('open');
    icon.src = "assets/images/icon-menu.png";
  } else {
    menuMobile.classList.add('open');
    icon.src = "assets/images/closeicon.svg";
  }
}

function configurarObrigatoriedadeCpfRgPorNacionalidade() {
  var selectNac = document.getElementById('nacionalidade');
  var cpfInput  = document.getElementById('cpf');
  var rgInput   = document.getElementById('rg');
  if (!selectNac || !cpfInput || !rgInput) return;

  function aplicar() {
    if (selectNac.value === 'ext') {
      cpfInput.required = false;
      rgInput.required  = false;
    } else {
      cpfInput.required = true;
      rgInput.required  = true;
    }
  }
  aplicar();
  selectNac.addEventListener('change', aplicar);
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM pronto');

  // 1) Aplica máscaras (com retry interno)
  applyMasks();

  // 2) Define min da data
  setMinHojeNoInputDate();

  // 3) Inicializa validação
  configurarValidacaoFormulario();

  // 4) Regras de nacionalidade
  configurarObrigatoriedadeCpfRgPorNacionalidade();
});






const horarios = [
    {"id": 10,"horario": "09:00", "disponivel": true },
    {"id": 11,"horario": "10:00", "disponivel": true },
    {"id": 12,"horario": "11:00", "disponivel": true },
    {"id": 13,"horario": "12:00", "disponivel": false},
    {"id": 14,"horario": "13:00", "disponivel": false},
    {"id": 15,"horario": "14:00", "disponivel": true },
    {"id": 16,"horario": "15:00", "disponivel": true },
    {"id": 17,"horario": "16:00", "disponivel": false},
    {"id": 18,"horario": "17:00", "disponivel": true }
]

function buscarHorariosDisponiveis(value) {
  const grid   = document.getElementById('horariosGrid');
  const hidden = document.getElementById('hora');     // input “real” que recebe o horário
  const help   = document.getElementById('horaHelp'); // <small> do horário

  if (!grid || !hidden) return;

  // sempre limpa estado anterior
  grid.innerHTML = '';
  hidden.value = '';
  if (help) { help.textContent = ''; help.className = 'hint'; }

  const dataValida = validarDataPassadaAndSegundaFeira(value);

  if (!dataValida) {
    // esconde grid + help quando a data é inválida
    grid.classList.add('is-hidden');
    if (help) help.classList.add('is-hidden');
    return;
  }

  // data válida → mostra grid e help “em branco”
  grid.classList.remove('is-hidden');
  if (help) help.classList.remove('is-hidden');

  // monta os botões
  horarios.forEach(h => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'slot';
    btn.textContent = h.horario;
    btn.disabled = !h.disponivel;
    btn.dataset.id = h.id;
    btn.dataset.time = h.horario;
    btn.setAttribute('aria-pressed', 'false');

    btn.addEventListener('click', () => {
      if (btn.disabled) return;

      // desmarca outros
      grid.querySelectorAll('.slot.slot--active')
        .forEach(b => { 
          b.classList.remove('slot--active'); 
          b.setAttribute('aria-pressed','false'); 
        });

      // marca atual
      btn.classList.add('slot--active');
      btn.setAttribute('aria-pressed','true');

      // preenche o input real
      hidden.value = h.horario;

      // feedback
      if (help) {
        help.className = 'hint ok';
        help.textContent = `Horário selecionado: ${h.horario}`;
        help.classList.remove('is-hidden');
      }
    });

    grid.appendChild(btn);
  });
}