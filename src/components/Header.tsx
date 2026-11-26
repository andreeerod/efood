import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoints, Container, cores } from '../styles'
import { texturaTalheres } from '../styles'
import { useAppDispatch, useAppSelector } from '../store'
import { abrir } from '../store/cart'
import LogoEfood from './LogoEfood'

const Topo = styled.header`
  ${texturaTalheres}
  padding: 48px 0;

  @media (max-width: ${breakpoints.celular}) { padding: 24px 0 }
`

const Linha = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  font-weight: 900;
  font-size: 18px;

  .voltar { justify-self: start }
  .carrinho { justify-self: end }

  @media (max-width: ${breakpoints.celular}) {
    grid-template-columns: 1fr auto;
    font-size: 14px;

    .logo { grid-column: 1 / -1; grid-row: 1; justify-self: center }
  }
`

export const Logo = styled(Link)`
  display: block;
`

const LinkCarrinho = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  .qtd {
    min-width: 28px;
    height: 28px;
    padding: 0 6px;
    border-radius: 14px;
    background: ${cores.rosa};
    color: ${cores.creme};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  &:hover .texto { text-decoration: underline }
`

export default function Header() {
  const qtd = useAppSelector(s => s.cart.itens.length)
  const dispatch = useAppDispatch()
  return (
    <Topo>
      <Container>
        <Linha>
          <Link className="voltar" to="/">Restaurantes</Link>
          <Logo className="logo" to="/" aria-label="efood - página inicial"><LogoEfood /></Logo>
          <LinkCarrinho className="carrinho" type="button" onClick={() => dispatch(abrir())} aria-label={`Carrinho com ${qtd} produto(s)`}>
            <span className="qtd">{qtd}</span>
            <span className="texto">produto(s) no carrinho</span>
          </LinkCarrinho>
        </Linha>
      </Container>
    </Topo>
  )
}
