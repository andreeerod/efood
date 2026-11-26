import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { brl } from '../data'
import { Botao, cores } from '../styles'
import { fechar, remover } from '../store/cart'
import { selecionarItens, selecionarTotal, useAppDispatch, useAppSelector } from '../store'
import Checkout from './Checkout'

// Carrinho em barra lateral sobre a página, como no Figma (3ª e 4ª parte)
const Fundo = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  justify-content: flex-end;

  .overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, .7) }
`

const Lateral = styled.aside`
  position: relative;
  width: 360px;
  max-width: 100%;
  height: 100%;
  overflow-y: auto;
  background: ${cores.rosa};
  color: ${cores.bege};
  padding: 32px 8px;
`

const Lista = styled.ul`display: flex; flex-direction: column; gap: 16px`

const Item = styled.li`
  position: relative;
  background: ${cores.bege};
  color: ${cores.rosa};
  padding: 8px 8px 12px;
  display: flex;
  gap: 8px;

  img { width: 80px; height: 80px; object-fit: cover; flex-shrink: 0 }
  h3 { font-size: 18px; font-weight: 900; margin-bottom: 16px }
  p { font-size: 14px }

  .rm {
    position: absolute;
    right: 8px;
    bottom: 8px;
    width: 16px;
    height: 16px;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    color: ${cores.rosa};
  }
  .rm svg { width: 16px; height: 16px; display: block }
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  margin: 40px 0 16px;
`

const Vazio = styled.p`font-size: 14px; line-height: 22px; margin-bottom: 16px`

type Etapa = 'carrinho' | 'checkout'

export default function Carrinho() {
  const aberto = useAppSelector(s => s.cart.aberto)
  const itens = useAppSelector(selecionarItens)
  const total = useAppSelector(selecionarTotal)
  const dispatch = useAppDispatch()
  const [etapa, setEtapa] = useState<Etapa>('carrinho')

  const fecharTudo = () => {
    dispatch(fechar())
    setEtapa('carrinho')
  }

  useEffect(() => {
    if (!aberto) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && fecharTudo()
    document.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto])

  if (!aberto) return null

  return (
    <Fundo>
      <div className="overlay" onClick={fecharTudo} />
      <Lateral role="dialog" aria-modal="true" aria-label="Carrinho">
        {etapa === 'checkout' ? (
          <Checkout onVoltar={() => setEtapa('carrinho')} onConcluir={fecharTudo} />
        ) : itens.length === 0 ? (
          <>
            <Vazio>O carrinho está vazio. Adicione pelo menos um produto para continuar com a compra.</Vazio>
            <Botao $cheio type="button" onClick={fecharTudo}>Voltar</Botao>
          </>
        ) : (
          <>
            <Lista>
              {itens.map(i => (
                <Item key={i.uid}>
                  <img src={i.foto} alt={i.nome} />
                  <div>
                    <h3>{i.nome}</h3>
                    <p>{brl(i.preco)}</p>
                  </div>
                  <button className="rm" type="button" aria-label={`Remover ${i.nome}`} onClick={() => dispatch(remover(i.uid))}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                      <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.7 9.5h6.6L12 4M6.5 6.5v5M9.5 6.5v5" />
                    </svg>
                  </button>
                </Item>
              ))}
            </Lista>
            <Total>
              <span>Valor total</span>
              <span>{brl(total)}</span>
            </Total>
            <Botao $cheio type="button" onClick={() => setEtapa('checkout')}>Continuar com a entrega</Botao>
          </>
        )}
      </Lateral>
    </Fundo>
  )
}
