import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoints, Container, cores } from '../styles'
import { useAppSelector } from '../store'

const Topo = styled.header`
  background: ${cores.bege};
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
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -2px;
  color: ${cores.rosa};
`

const LinkCarrinho = styled(Link)`
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
  return (
    <Topo>
      <Container>
        <Linha>
          <Link className="voltar" to="/">Restaurantes</Link>
          <Logo className="logo" to="/">efood</Logo>
          <LinkCarrinho className="carrinho" to="/carrinho" aria-label={`Carrinho com ${qtd} produto(s)`}>
            <span className="qtd">{qtd}</span>
            <span className="texto">produto(s) no carrinho</span>
          </LinkCarrinho>
        </Linha>
      </Container>
    </Topo>
  )
}
