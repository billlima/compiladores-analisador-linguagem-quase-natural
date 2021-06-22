// mygenerator.js
var Parser = require("jison").Parser;

console.log('\n\n>>>>>>>>>>>>>>');

function getCardinalFromOrdinal(n) {
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

console.log(getCardinalFromOrdinal('decimo quinto'));

// a grammar in JSON
var grammar = {
    "lex": {
        "rules": [
            ["\\s+",                    "/* skip whitespace */"],
            ["(qual e a|qual e o)",     "return 'PRINT'"],
            ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER';"],
            ["(vezes|\\*)",             "return '*';"],
            ["(dividido por|\\/)",      "return '/';"],
            ["(menos|-)",               "return '-';"],
            ["(mais|\\+)",              "return '+';"],
            ["dobro de",             "return 'DOBRO';"],
            ["triplo de",            "return 'TRIPLO';"],
            ["quadruplo de",          "return 'QUADRUPLO';"],
            ["(item de|item da)",         "return 'ITEMDE';"],
            ["\\[(?:\\d+,)*\\d+\\]",    "return 'ARRAY';"],
            ["\\(",                     "return '(';"],
            ["\\)",                     "return ')';"],
            ["$",                       "return 'EOF';"],
            ["[a-z]*\\b",              "return 'TEXT';"]
        ]
    },
    
    "operators": [
        ["left", "+", "-"],
        ["left", "*", "/", "DOBRO", "TRIPLO", "QUADRUPLO"],
        ["left", "PRINT", "ITEM DE"]
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
            [ "ARRAY", "$$ = yytext.replace(/[\\[\\]]/g, '').split(',').map(v => Number(v));"],
            [ "NUMBER",  "$$ = Number(yytext);" ],
            [ "PRINT TEXT ITEMDE e", "$$ = $$; console.log('itens:',$1, $2, $3, $4);"] //TODO como enviar função
            
        ]
    }
};

// `grammar` can also be a string that uses jison's grammar format
var parser = new Parser(grammar);

// generate source, ready to be written to disk
var parserSource = parser.generate();

// you can also use the parser directly from memory

// returns true


parser.parse("qual e o quinto item de [12,30]");
