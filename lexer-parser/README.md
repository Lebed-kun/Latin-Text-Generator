# Versatile JS library for parsing formal languages

Lexer and parser are separate modules. To make full parser, you should combine lexer and parser such way:

```
    function fullParser(str) {
        let tokens = lexer(str);
        let result = parser(tokens);

        return result;
    }
```

## Library modules:
1. Lexer: /lib/lexer.js
2. Parser /lib/parser.js

