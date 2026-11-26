import { type ChangeEvent, type FormEvent, useState } from 'react'
import styled from 'styled-components'
import { brl } from '../data'
import { Botao, cores } from '../styles'
import { limpar } from '../store/cart'
import { selecionarItens, selecionarTotal, useAppDispatch, useAppSelector } from '../store'

const CHECKOUT_URL = 'https://api-ebac.vercel.app/api/efood/checkout'

type Entrega = { receiver: string; description: string; city: string; zipCode: string; number: string; complement: string }
type Pagamento = { name: string; number: string; code: string; month: string; year: string }
type Etapa = 'entrega' | 'pagamento' | 'confirmacao'

const Titulo = styled.h2`font-size:16px;font-weight:700;margin-bottom:16px`
const Texto = styled.p`font-size:14px;line-height:22px;margin-bottom:24px`
const Campo = styled.label`display:flex;flex-direction:column;gap:8px;font-size:14px;font-weight:700;margin-bottom:8px;flex:1;min-width:0;
  input{width:100%;height:32px;border:2px solid ${cores.bege};background:${cores.bege};color:#4B4B4B;padding:0 8px;font-size:14px;font-weight:700;outline:none}
  input:focus{border-color:#4B4B4B}
  input[aria-invalid=true]{border-color:#FFB930}`
const Linha = styled.div`display:flex;gap:24px;&.cartao label:first-child{flex:2.4}
  @media(max-width:360px){flex-direction:column;gap:0}`
const Acoes = styled.div`display:flex;flex-direction:column;gap:8px;margin-top:24px`
const Voltar = styled(Botao).attrs({ $cheio: true })``
const Erro = styled.p`background:${cores.bege};color:${cores.rosa};padding:8px;font-weight:700;font-size:14px;margin:16px 0 0 !important`

const so = (v: string) => v.replace(/\D/g, '')

type Props = { onVoltar: () => void; onConcluir: () => void }

export default function Checkout({ onVoltar, onConcluir }: Props) {
  const itens = useAppSelector(selecionarItens)
  const total = useAppSelector(selecionarTotal)
  const dispatch = useAppDispatch()

  const [etapa, setEtapa] = useState<Etapa>('entrega')
  const [entrega, setEntrega] = useState<Entrega>({ receiver: '', description: '', city: '', zipCode: '', number: '', complement: '' })
  const [pagamento, setPagamento] = useState<Pagamento>({ name: '', number: '', code: '', month: '', year: '' })
  const [invalidos, setInvalidos] = useState<string[]>([])
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [pedido, setPedido] = useState('')

  const validarEntrega = () => {
    const ruins: string[] = []
    if (entrega.receiver.trim().length < 3) ruins.push('receiver')
    if (!entrega.description.trim()) ruins.push('description')
    if (!entrega.city.trim()) ruins.push('city')
    if (so(entrega.zipCode).length !== 8) ruins.push('zipCode')
    if (!so(entrega.number)) ruins.push('number')
    return ruins
  }
  const validarPagamento = () => {
    const ruins: string[] = []
    if (pagamento.name.trim().length < 3) ruins.push('name')
    if (so(pagamento.number).length < 13) ruins.push('cardNumber')
    if (so(pagamento.code).length < 3) ruins.push('code')
    const mes = Number(pagamento.month)
    if (!(mes >= 1 && mes <= 12)) ruins.push('month')
    if (so(pagamento.year).length !== 4) ruins.push('year')
    return ruins
  }

  const irParaPagamento = (e: FormEvent) => {
    e.preventDefault()
    const ruins = validarEntrega()
    setInvalidos(ruins)
    if (ruins.length === 0) setEtapa('pagamento')
  }

  const finalizar = async (e: FormEvent) => {
    e.preventDefault()
    const ruins = validarPagamento()
    setInvalidos(ruins)
    if (ruins.length) return
    setEnviando(true)
    setErro('')
    try {
      const res = await fetch(CHECKOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: itens.map(i => ({ id: i.id, price: i.preco })),
          delivery: {
            receiver: entrega.receiver.trim(),
            address: {
              description: entrega.description.trim(), city: entrega.city.trim(),
              zipCode: entrega.zipCode, number: Number(so(entrega.number)), complement: entrega.complement.trim()
            }
          },
          payment: {
            card: {
              name: pagamento.name.trim(), number: so(pagamento.number), code: Number(so(pagamento.code)),
              expires: { month: Number(pagamento.month), year: Number(pagamento.year) }
            }
          }
        })
      })
      if (!res.ok) throw new Error(`Erro ${res.status}`)
      const dados: { orderId: string } = await res.json()
      setPedido(dados.orderId)
      setEtapa('confirmacao')
    } catch {
      setErro('Não foi possível concluir o pedido. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  const concluir = () => {
    dispatch(limpar())
    onConcluir()
  }

  const inv = (n: string) => invalidos.includes(n)
  const ent = (k: keyof Entrega) => ({ value: entrega[k], onChange: (e: ChangeEvent<HTMLInputElement>) => setEntrega({ ...entrega, [k]: e.target.value }) })
  const pag = (k: keyof Pagamento) => ({ value: pagamento[k], onChange: (e: ChangeEvent<HTMLInputElement>) => setPagamento({ ...pagamento, [k]: e.target.value }) })

  return (
      <>
        {etapa === 'entrega' && (
          <form onSubmit={irParaPagamento} noValidate>
            <Titulo>Entrega</Titulo>
            <Campo>Quem irá receber<input {...ent('receiver')} aria-invalid={inv('receiver')} autoComplete="name" /></Campo>
            <Campo>Endereço<input {...ent('description')} aria-invalid={inv('description')} autoComplete="street-address" /></Campo>
            <Campo>Cidade<input {...ent('city')} aria-invalid={inv('city')} autoComplete="address-level2" /></Campo>
            <Linha>
              <Campo>CEP<input {...ent('zipCode')} aria-invalid={inv('zipCode')} inputMode="numeric" placeholder="00000-000" maxLength={9} autoComplete="postal-code" /></Campo>
              <Campo>Número<input {...ent('number')} aria-invalid={inv('number')} inputMode="numeric" /></Campo>
            </Linha>
            <Campo>Complemento (opcional)<input {...ent('complement')} /></Campo>
            {invalidos.length > 0 && <Erro role="alert">Confira os campos destacados.</Erro>}
            <Acoes>
              <Botao $cheio type="submit">Continuar com o pagamento</Botao>
              <Voltar type="button" onClick={onVoltar}>Voltar para o carrinho</Voltar>
            </Acoes>
          </form>
        )}

        {etapa === 'pagamento' && (
          <form onSubmit={finalizar} noValidate>
            <Titulo>Pagamento - Valor a pagar {brl(total)}</Titulo>
            <Campo>Nome no cartão<input {...pag('name')} aria-invalid={inv('name')} autoComplete="cc-name" /></Campo>
            <Linha className="cartao">
              <Campo>Número do cartão<input {...pag('number')} aria-invalid={inv('cardNumber')} inputMode="numeric" maxLength={19} autoComplete="cc-number" /></Campo>
              <Campo>CVV<input {...pag('code')} aria-invalid={inv('code')} inputMode="numeric" maxLength={4} autoComplete="cc-csc" /></Campo>
            </Linha>
            <Linha>
              <Campo>Mês de vencimento<input {...pag('month')} aria-invalid={inv('month')} inputMode="numeric" maxLength={2} placeholder="MM" autoComplete="cc-exp-month" /></Campo>
              <Campo>Ano de vencimento<input {...pag('year')} aria-invalid={inv('year')} inputMode="numeric" maxLength={4} placeholder="AAAA" autoComplete="cc-exp-year" /></Campo>
            </Linha>
            {invalidos.length > 0 && <Erro role="alert">Confira os campos destacados.</Erro>}
            {erro && <Erro role="alert">{erro}</Erro>}
            <Acoes>
              <Botao $cheio type="submit" disabled={enviando}>{enviando ? 'Enviando pedido...' : `Finalizar pagamento - ${brl(total)}`}</Botao>
              <Voltar type="button" onClick={() => { setInvalidos([]); setEtapa('entrega') }}>Voltar para a edição de endereço</Voltar>
            </Acoes>
          </form>
        )}

        {etapa === 'confirmacao' && (
          <div>
            <Titulo>Pedido realizado - {pedido}</Titulo>
            <Texto>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue para {entrega.receiver.trim()} em {entrega.description.trim()}, {so(entrega.number)}{entrega.complement.trim() ? ` (${entrega.complement.trim()})` : ''} - {entrega.city.trim()}.</Texto>
            <Texto>Lembre-se de que nossos entregadores não estão autorizados a realizar cobranças extras.</Texto>
            <Texto>Para garantir a segurança e a qualidade do seu pedido, higienize as mãos antes de recebê-lo.</Texto>
            <Texto>Esperamos que tenha uma ótima refeição. Bom apetite!</Texto>
            <Botao $cheio type="button" onClick={concluir}>Concluir</Botao>
          </div>
        )}
      </>
  )
}
