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

  
  applyMasks();


  setMinHojeNoInputDate();

  
  configurarValidacaoFormulario();


  configurarObrigatoriedadeCpfRgPorNacionalidade();
});





// aqui eu coloquei so um exemplo pra poder mostrar os horarios la no site
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
  const hidden = document.getElementById('hora');     
  const help   = document.getElementById('horaHelp'); 

  if (!grid || !hidden) return;

  
  grid.innerHTML = '';
  hidden.value = '';
  if (help) { help.textContent = ''; help.className = 'hint'; }

  const dataValida = validarDataPassadaAndSegundaFeira(value);

  if (!dataValida) {
    grid.classList.add('is-hidden');
    if (help) help.classList.add('is-hidden');
    return;
  }

  
  grid.classList.remove('is-hidden');
  if (help) help.classList.remove('is-hidden');

  
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

      
      grid.querySelectorAll('.slot.slot--active')
        .forEach(b => { 
          b.classList.remove('slot--active'); 
          b.setAttribute('aria-pressed','false'); 
        });

     
      btn.classList.add('slot--active');
      btn.setAttribute('aria-pressed','true');

      
      hidden.value = h.horario;

      
      if (help) {
        help.className = 'hint ok';
        help.textContent = `Horário selecionado: ${h.horario}`;
        help.classList.remove('is-hidden');
      }
    });

    grid.appendChild(btn);
  });
}