# extenso
API para retornar número por extenso (PT_BR)

## Introdução
Servidor HTTP em NodeJS que retorna um JSON cuja chave ```extenso``` é a versão por extenso do número decimal inteiro enviado no path. Os números podem estar no intervalo [-99999, 99999].

Exemplos:

http://localhost:3000/1
```{ "extenso": "um" }```

http://localhost:3000/-1042
```{ "extenso": "menos mil e quarenta e dois" }```

http://localhost:3000/94587
```{ "extenso": "noventa e quatro mil e quinhentos e oitenta e sete" }```

## Instruções

### Docker
```
$ docker build -t pedropxm/extenso .
$ docker run -p 3000:3000 pedropxm/extenso
```

### NodeJS 8.x/10.x/12.x
```
npm install
npm start
```

### Tests
```
npm run test
```
