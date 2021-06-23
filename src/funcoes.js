var ordinalToCardinal = function(n) {
    let primeirasLetras = n.substr(0,3);

    switch (primeirasLetras) {
        case 'pri': return 1;
        case 'seg': return 2;
        case 'ter': return 3;
        case 'qua': return 4;
        case 'qui': return 5;
        case 'sex': return 6;
        case 'set': return 7;
        case 'oit': return 8;
        case 'non': return 9;
    }
}

var toArrayNumber = function(arr) {
    return arr
        .replace(/[\[\]]/g, '')
        .split(',')
        .map(v => Number(v));
}

var removeAspas = function(str) {
    return str.replace(/\"/g,'');
}

var doRepeatedly = function(qt, funcToDo) {
    while (qt > 0) {
        funcToDo();
        qt--;
    }
}

var ifElse = function(cond, onTrue, onFalse) {
    return (cond) ? onTrue() : onFalse();
}

var menorItemDe = function(itens) {
    var menor = itens[0];
    itens.forEach(i => menor = i < menor ? i : menor);
    return menor;
}

var maiorItemDe = function(itens) {
    var maior = itens[0];
    itens.forEach(i => maior = i > maior ? i : maior);
    return maior;
}

module.exports = {
    ordinalToCardinal: ordinalToCardinal,
    toArrayNumber: toArrayNumber,
    removeAspas: removeAspas,
    doRepeatedly: doRepeatedly,
    ifElse: ifElse,
    maiorItemDe: maiorItemDe,
    menorItemDe: menorItemDe
}