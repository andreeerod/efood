import styled, { createGlobalStyle, css } from 'styled-components'

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

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`

type BotaoProps = { $variante?: 'claro' | 'compra'; $cheio?: boolean }

const compra = css`
  background: ${cores.creme};
  color: ${cores.rosaEscuro};
  font-size: 16px;
  font-weight: 900;
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 0 ${cores.rosaEscuro}, 0 6px 14px rgba(0, 0, 0, .18);
  text-transform: uppercase;
  letter-spacing: .5px;

  &:hover { background: ${cores.branco}; transform: translateY(-1px) }
  &:active { transform: translateY(3px); box-shadow: 0 1px 0 ${cores.rosaEscuro} }
`

export const Botao = styled.button<BotaoProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${({ $cheio }) => ($cheio ? '100%' : 'auto')};
  background: ${cores.bege};
  color: ${cores.rosa};
  border: 0;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background .15s, transform .15s, box-shadow .15s;

  &:hover { background: ${cores.branco} }
  &:disabled { opacity: .6; cursor: wait }

  ${({ $variante }) => $variante === 'compra' && compra}
`

export const Mensagem = styled.p`
  padding: 56px 0 120px;
  text-align: center;
  font-size: 16px;

  a { text-decoration: underline; font-weight: 700 }
`
