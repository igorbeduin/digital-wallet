# Digital Wallet
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/login.png "SignIn")

## Sobre
---
Digital Wallet (ou MyWallet) é uma aplicação web desenvolvida em ReactJS com o objetivo de simular um portal para negociação e gerenciamento de sua carteira digital.


A ideia é que o usuário possa criar uma conta, acessar sua carteria e imediatamento começar a negociar. Para isso, ao criar uma conta já é disponibilizado para o usuário R$100.000,00 (ficcionais) de crédito em sua carteira.

Os bancos de dados de usuários, carteiras e histórico de transações estão abstraídos localmente no navegador, dessa forma a todo momento as informações salvas podem ser acessadas em seu *localStorage*.

Ainda, nesta aplicação é possível fazer negociações com 3 moedas: Real (BRL), Bitcoin (BTC) e BinanceDollar(BUSD). Dessa forma podemos: comprar criptomoedas (BTC/BUSD) com Real; vender criptomoedas, recebendo em Real; e negociar as criptomoedas entre si, aplicando as taxas de conversão combinadas.

Link para este repositório: https://github.com/igorbeduin/digital-wallet


## Instalação e Execução
---

### Clone este repositório:
```
git clone https://github.com/igorbeduin/digital-wallet
cd digital-wallet
```
### Instale as dependências:
```
yarn install
```

### Execute localmente (*development*):
```
yarn start
```

## Funcionalidades
---
- Cadastro de usuário;

  ```
  No início da aplicação é criado um usuário padrão username&password=admin
  ```
- Login e logout de usuário;
- Visualização de seus créditos na carteira separados por moeda;
- Visualização em tempo real das cotações de BTC e BUSD (atualizadas a cada 10s);

  ```
  Os valores de BTC e BUSD são obtidos através APIs públicas:
    https://www.mercadobitcoin.net/api/BTC/ticker, pelo atributo { ticker: { last } }
    https://economia.awesomeapi.com.br/all/USD-BRL, pelo atributo { USD: { bid } } 
  ```
- Comprar Bitcoins, usando Real
- Vender Bitcoins, recebendo em Real
- Comprar BUSDs, usando Real
- Vender BUSDs, recebendo em Real
- Trocar BUSDs por Bitcoins
- Trocar Bitcoins por BUSDs
- Visualizar extrato de negociações com suas descrições, separado por moeda

## Design
---
O portal foi desenvolvido se baseando na ideia de **Dashboard**, com uma barra de navegação entre paginas e *cards* de funcionalidades.

Todas as paginas e componentes foram pensados de forma responsiva seguindo o princípio de "mobile-first" do TailwindCSS. Assim, as classes são padronizadas para telas pequenas e mudam especificamente para breakpoints de telas grandes.

## Navegando nas Telas
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/login.png "SignIn")
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/signup.png "SignUp")
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/home.png "Home")
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/buyingBtc.png "Buying Bitcoin")
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/buyingModal.png "Confirmation Modal")
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/history.png "Transactions")
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/signinMobile.png "LoginMobile")
![alt text](https://github.com/igorbeduin/digital-wallet/blob/master/src/images/homeMobile.png "HomeMobile")

Mais imagens disponíveis [aqui](https://github.com/igorbeduin/digital-wallet/tree/master/src/images).

## Desenvolvido com
---
- ReactJs
- TailwindCSS
- Typescript
- FontAwesome
- Axios
- ReactToastify
- ReactRouter
- Eslint
