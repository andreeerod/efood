import styled, { createGlobalStyle } from 'styled-components'
export const cores = { rosa: '#E66767', bege: '#FFEBD9', creme: '#FFF8F2', branco: '#FFFFFF' }
export const Global = createGlobalStyle`
  * { margin:0; padding:0; box-sizing:border-box; font-family:'Roboto',sans-serif; list-style:none; text-decoration:none }
  body { background:${cores.creme}; color:${cores.rosa} }
`
export const Container = styled.div`max-width:1024px;margin:0 auto;padding:0 16px;`
export const Botao = styled.button`
  background:${cores.bege};color:${cores.rosa};border:0;font-weight:700;font-size:14px;padding:4px 6px;cursor:pointer;
  &:hover{opacity:.85}
`
