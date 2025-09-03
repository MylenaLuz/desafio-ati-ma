    
function validarDataPassadaAndSegundaFeira(value){
    if (!value) return false;
    if (value < todayStr()) return false;
    if (isMonday(value)) return false;
    return true;
}
    
    
    function configurarValidacaoFormulario() {
    var form = document.querySelector('form.form-container');
    if (!form || !window.JustValidate) return;

    // Data mínima = hoje
    setMinHojeNoInputDate();

   
    var validator = new window.JustValidate('form.form-container', {
        validateBeforeSubmitting: true,
        focusInvalidField: true,
        lockForm: true,
        errorLabelCssClass: 'hint err',   
        successLabelCssClass: 'hint ok',
        errorFieldCssClass: 'is-invalid', 
        successFieldCssClass: 'is-valid'  
    });

    // Nome
    validator.addField('#name', [
        { rule: 'required', errorMessage: 'Informe seu nome.' },
        { rule: 'minLength', value: 3, errorMessage: 'Mínimo de 3 caracteres.' },
        {
        validator: function (value) {
            // só letras, acentos, espaço, hífen e apóstrofo
            return /^[A-Za-zÀ-ÿ\s'-]+$/.test(value || '');
        },
        errorMessage: 'Use apenas letras.'
        }
    ]);

    // Email
    validator.addField('#email', [
        { rule: 'required', errorMessage: 'Informe seu e-mail.' },
        { rule: 'email', errorMessage: 'Formato de e-mail inválido.' }
    ]);

    // Telefone
    validator.addField('#telefone', [
        {
        validator: function (value) {
            var raw = onlyDigits(value);
            return raw.length >= 10 && raw.length <= 20;
        },
        errorMessage: 'Telefone incompleto.'
        }
    ]);

    // Nacionalidade
    validator.addField('#nacionalidade', [
        { rule: 'required', errorMessage: 'Selecione sua nacionalidade.' }
    ]);

    // CPF (só se BR)
    validator.addField('#cpf', [
        {
        validator: function (value) {
            var nacEl = document.getElementById('nacionalidade');
            var nac = nacEl ? nacEl.value : '';
            if (nac === 'ext') return true;     
            var raw = onlyDigits(value);
            if (raw.length !== 11) return false;
            if (window.BrazilianValues && window.BrazilianValues.isCPF) {
            return BrazilianValues.isCPF(value);
            }
            return true; 
        },
        errorMessage: 'CPF inválido.'
        }
    ]);

    // RG (só se BR) 
    validator.addField('#rg', [
        {
        validator: function (value) {
            var nacEl = document.getElementById('nacionalidade');
            var nac = nacEl ? nacEl.value : '';
            if (nac === 'ext') return true;
            var v = (value || '').trim();
            return v.length >= 5;
        },
        errorMessage: 'Informe um RG válido.'
        }
    ]);

    // Data
    validator.addField('#data', [
        { rule: 'required', errorMessage: 'Selecione a data.' },
        {
        validator: validarDataPassadaAndSegundaFeira,
        errorMessage: 'Escolha uma data a partir de hoje (segunda indisponível).'
        }
    ]);

    // Hora
    validator.addField('#hora', [
        { rule: 'required', errorMessage: 'Selecione a hora.' },
        {
        validator: function (value) {
            return value >= '09:00' && value <= '17:00';
        },
        errorMessage: 'Atendimento entre 09:00 e 17:00.'
        }
    ]);

    // revalidação cpf/rg caso mude nacionalidade
    var selNac = document.getElementById('nacionalidade');
    if (selNac) {
        selNac.addEventListener('change', function () {
        validator.revalidateField('#cpf');
        validator.revalidateField('#rg');
        });
    }

    
    validator.onSuccess(function (event) {
        event.preventDefault();

        var btn = document.querySelector('.button-agen');
        if (btn) {
        btn.setAttribute('aria-busy', 'true');
        btn.disabled = true;
        btn.textContent = 'Enviando...';
        }

        setTimeout(function () {
        if (btn) {
            btn.removeAttribute('aria-busy');
            btn.disabled = false;
            btn.textContent = 'Finalizar Agendamento';
        }
        alert('Formulário validado com sucesso!');
        }, 1000);
    });
    }