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

module.exports = {
    ordinalToCardinal: ordinalToCardinal,
    toArrayNumber: toArrayNumber
}