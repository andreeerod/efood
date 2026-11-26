import styled, { createGlobalStyle } from 'styled-components'
import fundoTalheres from './assets/fundo-talheres.svg'

export const cores = {
  rosa: '#E66767',
  rosaEscuro: '#C94F4F',
  bege: '#FFEBD9',
  creme: '#FFF8F2',
  branco: '#FFFFFF',
  texto: '#4B4B4B',
  alerta: '#FFB930'
}

export const breakpoints = {
  celular: '600px',
  tablet: '900px'
}

export const Global = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto', sans-serif; list-style: none; text-decoration: none }
  html, body { overflow-x: hidden }
  body { background: ${cores.creme}; color: ${cores.rosa}; -webkit-font-smoothing: antialiased }
  img { max-width: 100% }
  a { color: inherit }
  button { font-family: inherit }
  :focus-visible { outline: 3px solid ${cores.alerta}; outline-offset: 2px }
`

// Conteúdo com 1024px de largura útil, como no Figma
export const Container = styled.div`
  max-width: 1056px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`

type BotaoProps = { $cheio?: boolean }

// Botão bege do Figma: 24px de altura, texto 14px bold rosa
export const Botao = styled.button<BotaoProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $cheio }) => ($cheio ? '100%' : 'auto')};
  background: ${cores.bege};
  color: ${cores.rosa};
  border: 0;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  padding: 4px 7px;
  cursor: pointer;

  &:disabled { opacity: .6; cursor: wait }
`

export const Mensagem = styled.p`
  padding: 56px 0 120px;
  text-align: center;
  font-size: 16px;

  a { text-decoration: underline; font-weight: 700 }
`

// Textura de garfo e faca do Figma: módulo de 127x360 que se repete
export const texturaTalheres = `
  background-color: ${cores.bege};
  background-image: url("${fundoTalheres}");
  background-repeat: repeat-x;
  background-position: left top;
`
