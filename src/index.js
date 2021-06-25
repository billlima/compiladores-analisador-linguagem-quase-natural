// mygenerator.js
var Parser = require("jison").Parser;
var Funcoes = require("./funcoes");

// a grammar in JSON
var grammar = {
    "yy": {
        "ordinalToCardinal": Funcoes.ordinalToCardinal
    },
    "lex": {
        "rules": [
            ["se ", "return 'SE';"],
            [" em ", "return 'EM';"],
            ["\\s+", "/* skip whitespace */"],
            ["(qual|quanto) e( a| o)?", "return 'PRINT'"],
            ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER';"],
            ["vezes( o)?", "return '*';"],
            ["(dividido por|dividido pelo|\\/)", "return '/';"],
            ["menos( o)?", "return '-';"],
            ["mais( o)?", "return '+';"],
            ["(e|for) (menor) (do )?(que)", "return '<';"],
            ["(e|for) (maior) (do )?(que)", "return '>';"],
            ["(e|for) (igual a)", "return 'EQ';"],
            ["(e|for) (diferente de)", "return 'NEQ';"],
            ["(dobro) (do|de)", "return 'DOBRO';"],
            ["(triplo) (do|de)", "return 'TRIPLO';"],
            ["(quadruplo) (de|do)", "return 'QUADRUPLO';"],
            ["maior item (de|da)", "return 'MAIORITEMDE';"],
            ["menor item (de|da)", "return 'MENORITEMDE';"],
            ["[a-z]+ (item de|item da)", "return 'ITEMDE';"],
            ["(armazenar|armazene)", "return 'ARMAZENAR';"],
            ["(entao)( faca)?", "return 'ENTAO';"],
            ["(senao)( faca)?", "return 'SENAO';"],
            ["\\[(?:\\d+,)*\\d+\\]", "return 'ARRAY';"],
            ["\\(", "return '(';"],
            ["\\)", "return ')';"],
            ["e igual a", "return 'IGUAL';"],
            ["(escreva|escrever)( o)?", "return 'ESCREVER';"],
            ["[a-z]+([0-9]|[a-z])*", "return 'ID';"],
            ["\\\"(.*?)\\\"", "return 'TEXT';"],
            ["$", "return 'EOF';"]
        ]
    },

    "operators": [
        ["left", "+", "-"],
        ["left", "*", "/"],
        ["left", ">", "<"],
        ["left", "EQ", "NEQ"],
        ["left", "SE", "DOBRO", "TRIPLO", "QUADRUPLO", "ENTAO", "SENAO", "ITEMDE", "ID"]
    ],

    "bnf": {
        "expressions": [
            ["e EOF", "return $1;"],
            ["ifExp EOF", "return $1;"],
            ["st EOF", "return $1;"],
        ],
        "ifExp": [
            ["SE ifExp ENTAO stNot SENAO stNot", "if ($2) $4(); else $6();"],
            ["SE ifExp ENTAO stNot", "if ($2) $4();"],

            ["e > e", "$$ = $1 > $3;"],
            ["ID > e", "$$ = yy.memory[$1] > $3;"],
            ["e > ID", "$$ = $1 > yy.memory[$3];"],
            ["ID > ID", "$$ = yy.memory[$1] > yy.memory[$3];"],

            ["e < e", "$$ = $1 < $3;"],
            ["ID < e", "$$ = yy.memory[$1] < $3;"],
            ["e < ID", "$$ = $1 < yy.memory[$3];"],
            ["ID < ID", "$$ = yy.memory[$1] < yy.memory[$3];"],

            ["e EQ e", "$$ = $1 == $3;"],
            ["ID EQ e", "$$ = yy.memory[$1] == $3;"],
            ["e EQ ID", "$$ = $1 == yy.memory[$3];"],
            ["ID EQ ID", "$$ = yy.memory[$1] == yy.memory[$3];"],

            ["e NEQ e", "$$ = $1 !== $3;"],
            ["ID NEQ e", "$$ = yy.memory[$1] !== $3;"],
            ["e NEQ ID", "$$ = $1 !== yy.memory[$3];"],
            ["ID NEQ ID", "$$ = yy.memory[$1] !== yy.memory[$3];"],
        ],
        "e": [
            ["e + e", "$$ = $1 + $3;"],
            ["ID + e", "$$ = yy.memory[$1] + $3"],
            ["e + ID", "$$ = $1 + yy.memory[$3]"],
            ["ID + ID", "$$ = yy.memory[$1] + yy.memory[$3]"],

            ["e - e", "$$ = $1 - $3;"],
            ["ID - e", "$$ = yy.memory[$1] - $3"],
            ["e - ID", "$$ = $1 - yy.memory[$3]"],
            ["ID - ID", "$$ = yy.memory[$1] - yy.memory[$3]"],

            ["e * e", "$$ = $1 * $3;"],
            ["ID * e", "$$ = yy.memory[$1] * $3"],
            ["e * ID", "$$ = $1 * yy.memory[$3]"],
            ["ID * ID", "$$ = yy.memory[$1] * yy.memory[$3]"],

            ["e / e", "$$ = $1 / $3;"],
            ["ID / e", "$$ = yy.memory[$1] / $3"],
            ["e / ID", "$$ = $1 / yy.memory[$3]"],
            ["ID / ID", "$$ = yy.memory[$1] / yy.memory[$3]"],

            ["( e )", "$$ = $2;"],
            ["DOBRO e", "$$ = 2 * $2;"],
            ["TRIPLO e", "$$ = 3 * $2;"],
            ["QUADRUPLO e", "$$ = 4 * $2;"],
            ["DOBRO ID", "$$ = 2 * yy.memory[$2];"],
            ["TRIPLO ID", "$$ = 3 * yy.memory[$2];"],
            ["QUADRUPLO ID", "$$ = 4 * yy.memory[$2];"],

            ["NUMBER", "$$ = Number(yytext);"],
            ["ITEMDE ARRAY", "$$ = yy.toArrayNumber($2)[yy.ordinalToCardinal($1)-1]"],
            ["MAIORITEMDE ARRAY", "$$ = yy.maiorItemDe(yy.toArrayNumber($2));"],
            ["MENORITEMDE ARRAY", "$$ = yy.menorItemDe(yy.toArrayNumber($2));"],
        ],
        "st": [
            ["ARMAZENAR e EM ID", "yy.memory[$4] = $2"],
            ["ESCREVER e", "$$ = yy.out.push($2)"],
            ["ESCREVER ID e *", "yy.doRepeatedly($3, () => {yy.out.push(yy.memory[$2])})"],
            ["ESCREVER ID", "yy.out.push(yy.memory[$2])"],
            ["ESCREVER TEXT", "yy.out.push(yy.removeAspas($2))"],
            ["ESCREVER TEXT e *", "yy.doRepeatedly($3, () => yy.out.push(yy.removeAspas($2)))"],
        ],
        "stNot": [
            ["ARMAZENAR e EM ID", "$$ = ()=>{yy.memory[$4] = $2;}"],
            ["ESCREVER ID", "$$ = ()=>{yy.out.push(yy.memory[$2]);}"],
            ["ESCREVER TEXT", "$$ = ()=>{yy.out.push(yy.removeAspas($2));}"],
            ["ESCREVER TEXT e *", "$$ = ()=>{yy.doRepeatedly($3, () => yy.out.push(yy.removeAspas($2)));}"],
            ["ESCREVER e", "$$ = ()=>{yy.out.push($2);}"],
            ["ESCREVER ID e *", "$$ = ()=>{yy.doRepeatedly($3, () => {yy.out.push(yy.memory[$2])});}"],
        ]
    }
};



function interpretar() {
    // `grammar` can also be a string that uses jison's grammar format
    var parser = new Parser(grammar);
    parser.yy = { ...Funcoes };
    parser.yy.memory = [];
    parser.yy.result = [];
    parser.yy.out = [];

    var parserSource = parser.generate();

    var texto = `
    se 2 e maior que 1 entao armazenar 2 em x senao armazenar 1 em x\n
    escreva x\n
    armazenar x vezes 8 em x\n
    escreva x 3 vezes\n
    se x e maior que 17 entao escreva x senao escreva o quadruplo de x\n
    se x e maior que 15 entao escreva "OKAY"\n
    escreva "feito" 3 vezes\n
    escrever o dobro de (4 mais 3)\n
    escrever o dobro de 4 mais 3\n
    escrever o sexto item de [1,2,4,5,555,7]\n
    escreva o menor item de [1,2,4,5,555,7]\n
    escreva o maior item de [1,2,4,5,555,7]\n
`;
    var linhas = texto.split(/\r?\n/g);

    linhas.forEach(linha => {
        if (linha && linha.length) {
            console.log('>>>>>>>>>', linha);
            parser.yy.out = [];
            parser.parse(linha);
            console.log(parser.yy.out);

        }
    });
}