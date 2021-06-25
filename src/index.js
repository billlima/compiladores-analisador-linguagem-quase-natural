// mygenerator.js
var Parser = require("jison").Parser;
var Funcoes = require("./funcoes");

var tokens = {
    SE:         {t: 'SE',           message:'\"se\": Início de uma condição (Ex: se ... então faça ...'},
    EM:         {t: 'EM',           message:'\"em\": Para informar a localização de armazenamento de uma variável (Ex: armazene ... em ...'},
    NUMBER:     {t: 'NUMBER',       message:'Número'},
    VEZES:      {t: 'VEZES',        message:'\"vezes\": Operação de multiplicação'},
    DIVIDIDO:   {t: 'DIVIDIDO',     message:'\"dividido por|pelo\": Operação de divisão'},
    MENOS:      {t: 'MENOS',        message:'\n"menos\": Operação de subtração'},
    MAIS:       {t: 'MAIS',         message:'\n"mais\n": Operação de adição'},
    LT:         {t: 'LT',           message:'\"menor que\": Verifica qual o menor'},
    GT:         {t: 'GT',           message:'\"maior que\": Verifica qual o maior'},
    EQ:         {t: 'EQ',           message:'\"igual a\": Verifica se são iguais'},
    NEQ:        {t: 'NEQ',          message:'\"diferente de\": Verifica se são diferentes'},
    DOBRO:      {t: 'DOBRO',        message:'\"dobro de\": Calcula o dobro\"'},
    TRIPLO:     {t: 'TRIPLO',       message:'\"triplo de\": Calcula o triplo\"'},
    QUADRUPLO:  {t: 'QUADRUPLO',    message:'\"quádruplo de\": Calcula o quádruplo\"'},
    MAIORITEMDE:{t: 'MAIORITEMDE',  message:'\"maior item de\": Busca o maior ítem de um vetor'},
    MENORITEMDE:{t: 'MENORITEMDE',  message:'\"menor item de\": Busca o maior ítem de um vetor'},
    ITEMDE:     {t: 'ITEMDE',       message:'\"primeiro|...|décimo nono item de\": Busca o ítem de vetor conforme localização informada'},
    ARMAZENAR:  {t: 'ARMAZENAR',    message:'\"armazene|armazenar\": Início de uma operação de armazenamento de um valor na memória (Ex.: armazenar 20 em x)'},
    ENTAO:      {t: 'ENTAO',        message:'\"então faça\": Precede operação a ser executada em uma condição positiva (Ex.: se ... então faça'},
    SENAO:      {t: 'SENAO',        message:'\"senão faça\": Precede operação a ser executada em uma condição (Ex.: se ... então faça ... senão faça ...'},
    ARRAY:      {t: 'ARRAY',        message:'Vetor de números (Ex: [1,2,3]'},
    LP:         {t: 'LP',           message:'\"(\": Abre Parênteses'},
    RP:         {t: 'RP',           message:'\")\": Fecha Parênteses'},
    ESCREVER:   {t: 'ESCREVER',     message:'\"escreva|escrever\": Operação para escrever na saída algo (Ex.: escreva 1 + 4)'},
    ID:         {t: 'ID',           message:'Identificador de uma localização da memória, inicia com uma letra e após números ou letras (Ex.: x, x1)'},
    TEXT:       {t: 'TEXT',         message:'Texto entre aspas (Ex.: \"casa\"'},
    EOF:        {t: 'EOF',          message:''},
}

// a grammar in JSON
var grammar = {
    "yy": {
        "ordinalToCardinal": Funcoes.ordinalToCardinal
    },
    "lex": {
        "rules": [
            ["se ",                             `return '${tokens.SE.t}';`],
            [" em ",                            `return '${tokens.EM.t}';`],
            ["\\s+",                            "/* skip whitespace */"],
            ["[0-9]+(?:\\.[0-9]+)?\\b",         `return '${tokens.NUMBER.t}';`],
            ["vezes( o)?",                      `return '${tokens.VEZES.t}';`],
            ["(dividido por|dividido pelo|\\/)",`return '${tokens.DIVIDIDO.t}';`],
            ["menos( o)?",                      `return '${tokens.MENOS.t}';`],
            ["mais( o)?",                       `return '${tokens.MAIS.t}';`],
            ["(e|for) (menor) (do )?(que)",     `return '${tokens.LT.t}';`],
            ["(e|for) (maior) (do )?(que)",     `return '${tokens.GT.t}';`],
            ["(e|for) (igual a)",               `return '${tokens.EQ.t}';`],
            ["(e|for) (diferente de)",          `return '${tokens.NEQ.t}';`],
            ["(dobro) (do|de)",                 `return '${tokens.DOBRO.t}';`],
            ["(triplo) (do|de)",                `return '${tokens.TRIPLO.t}';`],
            ["(quadruplo) (de|do)",             `return '${tokens.QUADRUPLO.t}';`],
            ["maior item (de|da)",              `return '${tokens.MAIORITEMDE.t}';`],
            ["menor item (de|da)",              `return '${tokens.MENORITEMDE.t}';`],
            ["[a-z]+ (item de|item da)",        `return '${tokens.ITEMDE.t}';`],
            ["(armazenar|armazene)",            `return '${tokens.ARMAZENAR.t}';`],
            ["(entao)( faca)?",                 `return '${tokens.ENTAO.t}';`],
            ["(senao)( faca)?",                 `return '${tokens.SENAO.t}';`],
            ["\\[(?:\\d+,)*\\d+\\]",            `return '${tokens.ARRAY.t}';`],
            ["\\(",                             `return '${tokens.LP.t}';`],
            ["\\)",                             `return '${tokens.RP.t}';`],
            ["(escreva|escrever)( o)?",         `return '${tokens.ESCREVER.t}';`],
            ["[a-z]+([0-9]|[a-z])*",            `return '${tokens.ID.t}';`],
            ["\\\"(.*?)\\\"",                   `return '${tokens.TEXT.t}';`],
            ["$",                               `return '${tokens.EOF.t}';`]
        ]
    },

    "operators": [
        ["left", tokens.MAIS.t, tokens.MENOS.t],
        ["left", tokens.VEZES.t, tokens.DIVIDIDO.t],
        ["left", tokens.GT.t, tokens.LT.t],
        ["left", tokens.EQ.t, tokens.NEQ.t],
        ["left", tokens.SE.t, tokens.DOBRO.t, tokens.TRIPLO.t, tokens.QUADRUPLO.t, tokens.ENTAO.t, tokens.SENAO.t, tokens.ITEMDE.t]
    ],

    "bnf": {
        "expressions": [
            [`e EOF`,       "return $1;"],
            [`ifExp EOF`,   "return $1;"],
            [`st EOF`,      "return $1;"],
        ],
        "ifExp": [
            [`SE ifExp ENTAO stNot SENAO stNot`,    "if ($2) $4(); else $6();"],
            [`SE ifExp ENTAO stNot`,                "if ($2) $4();"],

            [`e GT e`,              "$$ = $1 > $3;"],
            [`ID GT e`,             "$$ = yy.memory[$1] > $3;"],
            [`e GT ID`,             "$$ = $1 > yy.memory[$3];"],
            [`ID GT ID`,            "$$ = yy.memory[$1] > yy.memory[$3];"],

            [`e LT e`,              "$$ = $1 < $3;"],
            [`ID LT e`,             "$$ = yy.memory[$1] < $3;"],
            [`e LT ID`,             "$$ = $1 < yy.memory[$3];"],
            [`ID LT ID`,            "$$ = yy.memory[$1] < yy.memory[$3];"],

            [`e EQ e`,              "$$ = $1 == $3;"],
            [`ID EQ e`,             "$$ = yy.memory[$1] == $3;"],
            [`e EQ ID`,             "$$ = $1 == yy.memory[$3];"],
            [`ID EQ ID`,            "$$ = yy.memory[$1] == yy.memory[$3];"],

            [`e NEQ e`,             "$$ = $1 !== $3;"],
            [`ID NEQ e`,            "$$ = yy.memory[$1] !== $3;"],
            [`e NEQ ID`,            "$$ = $1 !== yy.memory[$3];"],
            [`ID NEQ ID`,           "$$ = yy.memory[$1] !== yy.memory[$3];"],
        ],
        "e": [
            [`e MAIS e`,            "$$ = $1 + $3;"],
            [`ID MAIS e`,           "$$ = yy.memory[$1] + $3"],
            [`e MAIS ID`,           "$$ = $1 + yy.memory[$3]"],
            [`ID MAIS ID`,          "$$ = yy.memory[$1] + yy.memory[$3]"],

            [`e MENOS e`,           "$$ = $1 - $3;"],
            [`ID MENOS e`,          "$$ = yy.memory[$1] - $3"],
            [`e MENOS ID`,          "$$ = $1 - yy.memory[$3]"],
            [`ID MENOS ID`,         "$$ = yy.memory[$1] - yy.memory[$3]"],

            [`e VEZES e`,           "$$ = $1 * $3;"],
            [`ID VEZES e`,          "$$ = yy.memory[$1] * $3"],
            [`e VEZES ID`,          "$$ = $1 * yy.memory[$3]"],
            [`ID VEZES ID`,         "$$ = yy.memory[$1] * yy.memory[$3]"],

            [`e DIVIDIDO e`,        "$$ = $1 / $3;"],
            [`ID DIVIDIDO e`,       "$$ = yy.memory[$1] / $3"],
            [`e DIVIDIDO ID`,       "$$ = $1 / yy.memory[$3]"],
            [`ID DIVIDIDO ID`,      "$$ = yy.memory[$1] / yy.memory[$3]"],

            [`LP e RP`,               "$$ = $2;"],
            [`DOBRO e`,             "$$ = 2 * $2;"],
            [`TRIPLO e`,            "$$ = 3 * $2;"],
            [`QUADRUPLO e`,         "$$ = 4 * $2;"],
            [`DOBRO ID`,            "$$ = 2 * yy.memory[$2];"],
            [`TRIPLO ID`,           "$$ = 3 * yy.memory[$2];"],
            [`QUADRUPLO ID`,        "$$ = 4 * yy.memory[$2];"],

            [`NUMBER`,              "$$ = Number(yytext);"],
            [`ITEMDE ARRAY`,        "$$ = yy.toArrayNumber($2)[yy.ordinalToCardinal($1)-1]"],
            [`MAIORITEMDE ARRAY`,   "$$ = yy.maiorItemDe(yy.toArrayNumber($2));"],
            [`MENORITEMDE ARRAY`,   "$$ = yy.menorItemDe(yy.toArrayNumber($2));"],
        ],
        "st": [
            [`ARMAZENAR e EM ID`,   "yy.memory[$4] = $2"],
            [`ESCREVER e`,          "$$ = yy.out.push($2)"],
            [`ESCREVER ID e VEZES`,     "yy.doRepeatedly($3, () => {yy.out.push(yy.memory[$2])})"],
            [`ESCREVER ID`,         "yy.out.push(yy.memory[$2])"],
            [`ESCREVER TEXT`,       "yy.out.push(yy.removeAspas($2))"],
            [`ESCREVER TEXT e VEZES`,   "yy.doRepeatedly($3, () => yy.out.push(yy.removeAspas($2)))"],
        ],
        "stNot": [
            [`ARMAZENAR e EM ID`,   "$$ = ()=>{yy.memory[$4] = $2;}"],
            [`ESCREVER ID`,         "$$ = ()=>{yy.out.push(yy.memory[$2]);}"],
            [`ESCREVER TEXT`,       "$$ = ()=>{yy.out.push(yy.removeAspas($2));}"],
            [`ESCREVER TEXT e VEZES`,   "$$ = ()=>{yy.doRepeatedly($3, () => yy.out.push(yy.removeAspas($2)));}"],
            [`ESCREVER e`,          "$$ = ()=>{yy.out.push($2);}"],
            [`ESCREVER ID e VEZES`,     "$$ = ()=>{yy.doRepeatedly($3, () => {yy.out.push(yy.memory[$2])});}"],
        ]
    }
};

function preProcessamento(texto) {
    texto = texto.toLowerCase();                                                         
    texto = texto.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    texto = texto.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    texto = texto.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    texto = texto.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    texto = texto.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    texto = texto.replace(new RegExp('[Ç]','gi'), 'c');
    
    var linhas = texto
        .toLowerCase()
        .split(/\r?\n/g)
        .filter(l => l && l.replace(/\s/g, "").length);
    return linhas;
}

function interpretar(texto) {
    // Adiciona a gramática, regras dos analisadores e cria o parser
    var parser = new Parser(grammar);
    parser.generate();

    parser.yy = { ...Funcoes }; //funções utilizadas;
    parser.yy.memory = []; //para armazenamento dos dados em memória
    parser.yy.out = []; //para armazenamento da saída
    
    var linhas = preProcessamento(texto);
    var retorno = [];

    try {
        linhas.forEach(linha => {
            try {
                parser.yy.out = [];
                parser.parse(linha);
            } catch(e) {
                retorno.push({ linha: linha, saida: [], error: {
                    message: `Palavra \"${e.hash.text}\" inválida ou não reconhecida, espera-se:`,
                    expected: e.hash.expected
                        .map(exp => {
                            exp = exp.replace(/\'/g,'');
                            for (o in tokens) {
                                if (o == exp) return (tokens[o].message);
                            }
                        })
                        .filter(e => e.length)
                }});
                throw('error');
            }
            retorno.push({ linha: linha, saida: parser.yy.out });
        });
    } catch (e) {
    }

    return retorno;
}

module.exports = { 
    interpretar: interpretar
}