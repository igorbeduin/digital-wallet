# Digital Wallet

## Sobre
---
Digital Wallet (ou MyWallet) é uma aplicação web desenvolvida em ReactJS com o objetivo de simular um portal para negociação e gerenciamento de sua carteira digital.


A ideia é que o usuário possa criar uma conta, acessar sua carteria e imediatamento começar a negociar. Para isso, ao criar uma conta já é disponibilizado para o usuário R$100.000,00 (ficcionais) de crédito em sua carteira.

Os bancos de dados de usuários, carteiras e histórico de transações estão abstraídos localmente no navegador, dessa forma a todo momento as informações salvas podem ser acessadas em seu *localStorage*.

Ainda, nesta aplicação é possível fazer negociações com 3 moedas: Real (BRL), Bitcoin (BTC) e BinanceDollar(BUSD). Dessa forma podemos: comprar criptomoedas (BTC/BUSD) com Real; vender criptomoedas, recebendo em Real; e negociar as criptomoedas entre si, aplicando as taxas de conversão combinadas.

Mais detalhes sobre as funcionalidades disponíveis a seguir.

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
- Login de usuário;
- Visualização de seus créditos na carteira separados por moeda;
- Visualização em tempo real das cotações de BTC e BUSD (atualizadas a cada 10s);
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
![alt text](https://user-images.githubusercontent.com/19144094/190949921-78db96e6-44a4-43ed-a16a-4e244645e835.png "SignIn")
![alt text](https://user-images.githubusercontent.com/19144094/190950105-66a4e698-3665-4372-b80d-f7933ef520fd.png "SignUn")
![alt text](https://user-images.githubusercontent.com/19144094/190950159-60d71524-4d17-450e-84d1-d75a12a05a73.png "Home")
![alt text](https://user-images.githubusercontent.com/19144094/190950238-12cf70c9-35b5-4156-b2a8-824f8ea2b8c6.png "BuyingBitcoins")
![alt text](https://user-images.githubusercontent.com/19144094/190950294-1cdd5abb-24ca-4af4-a04f-8eaa66e43fe3.png "ConfirmationModal")
![alt text](https://user-images.githubusercontent.com/19144094/190950348-521b5afe-4d6a-4fc3-97f0-a793896a26d4.png "Transactions")
![alt text](https://user-images.githubusercontent.com/19144094/190950461-f59382d8-fd1a-4f30-9f8b-394481c21304.png "LoginMobile")
![alt text](https://user-images.githubusercontent.com/19144094/190950458-11d0880d-5789-47f6-83a0-ab9ff46c4ded.png "HomeMobile")

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