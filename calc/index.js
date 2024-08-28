(function() {
    let expressao = '';
    let resultadoParcial = 0;
    let operadorAtual = null;

    const botoes = document.querySelectorAll('.botao');
    const display = document.getElementById('display');

    function atualizarDisplay(valor) {
        display.textContent = valor;
    }

    function resetarCalculadora() {
        expressao = '';
        resultadoParcial = 0;
        operadorAtual = null;
        atualizarDisplay('0');
    }

    function calcularResultadoParcial(valorAtual) {
        let valor = parseFloat(valorAtual);
        if (operadorAtual === '+') {
            resultadoParcial += valor;
        } else if (operadorAtual === '-') {
            resultadoParcial -= valor;
        } else if (operadorAtual === '*') {
            resultadoParcial *= valor;
        } else if (operadorAtual === '/') {
            if (valor !== 0) {
                resultadoParcial /= valor;
            } else {
                return 'Erro';
            }
        } else {
            resultadoParcial = valor;
        }
        return resultadoParcial;
    }

    function processarCliqueBotao(valor) {
        if (!isNaN(valor) || valor === '.') {
            expressao += valor;
            atualizarDisplay(expressao);
        } else if (valor === 'C') {
            resetarCalculadora();
        } else if (valor === '=') {
            if (operadorAtual !== null) {
                resultadoParcial = calcularResultadoParcial(expressao);
                atualizarDisplay(resultadoParcial);
                expressao = resultadoParcial.toString();
                operadorAtual = null;
            }
        } else {
            if (expressao !== '') {
                resultadoParcial = calcularResultadoParcial(expressao);
                operadorAtual = valor;
                expressao = '';
                atualizarDisplay(resultadoParcial);
            }
        }
    }

    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            processarCliqueBotao(botao.getAttribute('data-valor'));
        });
    });

    resetarCalculadora();
})();


