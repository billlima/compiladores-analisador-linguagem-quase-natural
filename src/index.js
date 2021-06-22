// mygenerator.js
var Parser = require("jison").Parser;
var Funcoes = require("./funcoes");

console.log('\n\n>>>>>>>>>>>>>>');


// a grammar in JSON
var grammar = {
    "yy": {
        "ordinalToCardinal": Funcoes.ordinalToCardinal
    },
    "lex": {
        "rules": [
            ["\\s+",                    "/* skip whitespace */"],
            ["(qual e a|qual e o)",     "return 'PRINT'"],
            ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER';"],
            ["(vezes o|vezes|\\*)",             "return '*';"],
            ["(dividido por|dividido pelo|\\/)",      "return '/';"],
            ["(menos o|menos|-)",               "return '-';"],
            ["(mais o|mais|\\+)",              "return '+';"],
            ["(dobro do|dobro de)",             "return 'DOBRO';"],
            ["(triplo do|triplo de)",            "return 'TRIPLO';"],
            ["(quadruplo de|quadruplo do)",          "return 'QUADRUPLO';"],
            ["(item de|item da)",         "return 'ITEMDE';"],
            ["(escreva|escrever|escreva o|escrever o)",      "return 'ESCREVER';"],
            ["(armazenar|armazene)",    "return 'ARMAZENAR';"],
            ["em",                      "return 'EM';"],
            ["\\[(?:\\d+,)*\\d+\\]",    "return 'ARRAY';"],
            ["\\(",                     "return '(';"],
            ["\\)",                     "return ')';"],
            ["\\\"[a-z]*\\b\\\"",              "return 'TEXT';"],
            ["[a-z]+([0-9]|[a-z])*",    "return 'ID';"],
            ["$",                       "return 'EOF';"],
        ]
    },
    
    "operators": [
        ["left", "+", "-"],
        ["left", "*", "/", "ID", "DOBRO", "TRIPLO", "QUADRUPLO", "ARRAY", "TEXT", "PRINT", "ITEM DE"]
    ],
    
    "bnf": {
        "expressions" :[[ "e EOF",   "console.log($1); return $1;"  ]],
        
        "e" :[
            [ "e + e",   "$$ = $1 + $3;" ],
            [ "e - e",   "$$ = $1 - $3;" ],
            [ "e * e",   "$$ = $1 * $3;" ],
            [ "e / e",   "$$ = $1 / $3;" ],
            [ "( e )",   "$$ = $2;" ],
            [ "DOBRO e",   "$$ = 2 * $2;"],
            [ "TRIPLO e",   "$$ = 3 * $2;"],
            [ "QUADRUPLO e",   "$$ = 4 * $2;"],
            [ "NUMBER",  "$$ = Number(yytext);" ],
            [ "ID ITEMDE ARRAY", "$$ = yy.toArrayNumber($3)[yy.ordinalToCardinal($1)-1]"],
            [ "ARMAZENAR e EM ID", "$$ = $$; yy.memory[$4] = $2"],
            [ "ESCREVER ID", "console.log(yy.memory[$2])"],
            [ "ESCREVER TEXT", "console.log($2)"]
        ]
    }
};

// `grammar` can also be a string that uses jison's grammar format
var parser = new Parser(grammar);
parser.yy = {...Funcoes};
parser.yy.memory = [];

var parserSource = parser.generate();

parser.parse("armazenar 2 em x");
parser.parse("escreva x");
