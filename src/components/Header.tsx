import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoints, Container } from '../styles'
import { texturaTalheres } from '../styles'
import { useAppDispatch, useAppSelector } from '../store'
import { abrir } from '../store/cart'
import LogoEfood from './LogoEfood'

// Topo do Perfil: 162px, logo a 40px do topo, links 18px black
const Topo = styled.header`
  ${texturaTalheres}
  background-position: left 1px;
  height: 162px;
  padding-top: 40px;

  @media (max-width: ${breakpoints.celular}) { height: auto; padding: 24px 0 }
`

const Linha = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;

  .voltar { justify-self: start }
  .carrinho { justify-self: end }
  .voltar, .carrinho { position: relative; top: 1px }

  @media (max-width: ${breakpoints.celular}) {
    grid-template-columns: 1fr auto;
    font-size: 14px;

    .logo { grid-column: 1 / -1; grid-row: 1; justify-self: center }
  }
`

const Logo = styled(Link)`
  display: block;
`

const BotaoCarrinho = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-align: right;
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
          <BotaoCarrinho className="carrinho" type="button" onClick={() => dispatch(abrir())}>
            {qtd} produto(s) no carrinho
          </BotaoCarrinho>
        </Linha>
      </Container>
    </Topo>
  )
}
