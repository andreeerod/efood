# efood

Plataforma de delivery feita em React + TypeScript, com Styled Components, React Router e Redux Toolkit. Projeto do curso da EBAC.

**Deploy:** https://efood-rho-opal.vercel.app

## Funcionalidades

- Lista de restaurantes e cardápio carregados da API da EBAC
- Modal do prato com botão de compra em destaque
- Carrinho com Redux, salvo no `localStorage`
- Checkout em etapas (entrega, pagamento e confirmação) com validação
- Layout responsivo para celular, tablet e desktop

## Estrutura

```
src/
  components/  Header e Footer compartilhados
  hooks/       useRestaurantes (busca na API)
  pages/       Home, Perfil, Carrinho e Checkout
  store/       Redux: slice do carrinho, hooks tipados e seletores
  styles.ts    cores, breakpoints e componentes base
```

## Como rodar

```bash
npm install
npm run dev
```
