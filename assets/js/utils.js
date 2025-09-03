function onlyDigits(s) {
  return (s || '').replace(/\D/g, '');
}

function todayStr() {
  var d = new Date();
  d.setHours(0, 0, 0, 0);
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1).padStart(2, '0');
  var dd = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + dd;
}

function isMonday(yyyy_mm_dd) {
  if (!yyyy_mm_dd) return false;
  var p = yyyy_mm_dd.split('-');
  var dt = new Date(parseInt(p[0],10), parseInt(p[1],10)-1, parseInt(p[2],10));
  return dt.getDay() === 1; 
}


function __applyMasksNow() {
  var tel = document.getElementById('telefone');
  if (tel && window.Inputmask) {
    Inputmask({
      mask: "+[9][9] (99) 9999[9]-9999",
      greedy: false,
      clearIncomplete: true,
      showMaskOnFocus: true,
      showMaskOnHover: false
    }).mask(tel);
    console.log('Máscara aplicada no telefone:', !!tel.inputmask);
  }

  var cpf = document.getElementById('cpf');
  if (cpf && window.Inputmask) {
    Inputmask({
      mask: "999.999.999-99",
      clearIncomplete: true,
      showMaskOnFocus: true,
      showMaskOnHover: false
    }).mask(cpf);
    console.log('Máscara aplicada no CPF:', !!cpf.inputmask);
  }
}

function applyMasks() {
  var tentativas = 0;
  (function tentar() {
    if (window.Inputmask) {
      __applyMasksNow();
      return;
    }
    tentativas++;
    if (tentativas > 10) {
      console.error('Inputmask não carregado após aguardar (1s). Verifique a CDN/Network.');
      return;
    }
    setTimeout(tentar, 100); 
  })();
}


function setMinHojeNoInputDate() {
  var data = document.getElementById('data');
  if (!data) return;
  var d = new Date();
  d.setHours(0,0,0,0);
  var y = d.getFullYear();
  var m = String(d.getMonth()+1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  data.min = y + '-' + m + '-' + day;
}
