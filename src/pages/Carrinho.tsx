import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { brl } from '../data'
import { breakpoints, Botao, Container, cores, Mensagem } from '../styles'
import { limpar, remover } from '../store/cart'
import { selecionarItens, selecionarTotal, useAppDispatch, useAppSelector } from '../store'

const Painel = styled.section`
  max-width: 640px;
  margin: 0 auto;
  padding: 56px 0 120px;

  h1 { font-size: 24px; font-weight: 900; margin-bottom: 24px }

  @media (max-width: ${breakpoints.celular}) { padding: 32px 0 64px }
`

const Lista = styled.ul`display: flex; flex-direction: column; gap: 16px`

const Linha = styled.li`
  background: ${cores.rosa};
  color: ${cores.bege};
  padding: 8px;
  display: flex;
  gap: 16px;
  align-items: center;

  img { width: 80px; height: 80px; object-fit: cover; flex-shrink: 0 }
  h3 { font-size: 18px; margin-bottom: 8px }
  p { font-size: 14px }
  .rm { margin-left: auto; align-self: flex-end; width: 40px; height: 40px; background: none; border: 0; color: ${cores.bege}; font-size: 18px; cursor: pointer }
  .rm:hover { background: rgba(255, 255, 255, .15) }

  @media (max-width: ${breakpoints.celular}) { h3 { font-size: 16px } }
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  padding: 24px 0;
  margin-top: 16px;
  border-top: 2px solid ${cores.bege};
`

const Acoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;

  @media (max-width: ${breakpoints.celular}) {
    flex-direction: column-reverse;
    button { width: 100% }
  }
`

const Esvaziar = styled.button`
  background: none;
  border: 0;
  color: ${cores.rosa};
  font-weight: 700;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  padding: 12px;
`

export default function Carrinho() {
  const itens = useAppSelector(selecionarItens)
  const total = useAppSelector(selecionarTotal)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Container>
        {itens.length === 0 ? (
          <Mensagem>
            Seu carrinho está vazio. <Link to="/">Escolha um restaurante</Link>
          </Mensagem>
        ) : (
          <Painel>
            <h1>Seu carrinho</h1>
            <Lista>
              {itens.map(i => (
                <Linha key={i.uid}>
                  <img src={i.foto} alt={i.nome} />
                  <div>
                    <h3>{i.nome}</h3>
                    <p>{brl(i.preco)}</p>
                  </div>
                  <button className="rm" aria-label={`Remover ${i.nome}`} onClick={() => dispatch(remover(i.uid))}>🗑</button>
                </Linha>
              ))}
            </Lista>
            <Total>
              <span>Valor total</span>
              <span>{brl(total)}</span>
            </Total>
            <Acoes>
              <Esvaziar onClick={() => dispatch(limpar())}>Esvaziar carrinho</Esvaziar>
              <Botao $variante="compra" onClick={() => navigate('/checkout')}>Continuar com a entrega</Botao>
            </Acoes>
          </Painel>
        )}
      </Container>
    </>
  )
}
