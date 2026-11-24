import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { brl } from '../data'
import { Container, cores } from '../styles'
import { limpar } from '../store/cart'
import type { RootState } from '../store'

const CHECKOUT_URL = 'https://api-ebac.vercel.app/api/efood/checkout'

type Entrega = { receiver: string; description: string; city: string; zipCode: string; number: string; complement: string }
type Pagamento = { name: string; number: string; code: string; month: string; year: string }
type Etapa = 'entrega' | 'pagamento' | 'confirmacao'

const Topo = styled.header`background:${cores.bege};height:186px;display:flex;align-items:center;
  .in{display:flex;justify-content:space-between;align-items:center;width:100%;font-weight:900;font-size:18px;color:${cores.rosa}}
  .logo{font-size:36px;letter-spacing:-2px}`
const Painel = styled.section`background:${cores.rosa};color:${cores.bege};max-width:360px;margin:56px auto 120px;padding:32px 8px;
  h2{font-size:16px;font-weight:700;margin-bottom:16px}
  p{font-size:14px;line-height:22px;margin-bottom:24px}`
const Campo = styled.label`display:flex;flex-direction:column;gap:8px;font-size:14px;font-weight:700;margin-bottom:8px;flex:1;
  input{height:32px;border:2px solid ${cores.bege};background:${cores.bege};color:#4B4B4B;padding:0 8px;font-size:14px;font-weight:700;outline:none}
  input:focus{border-color:#4B4B4B}
  input[aria-invalid=true]{border-color:#FFB930}`
const Linha = styled.div`display:flex;gap:34px;&.cartao{gap:30px}&.cartao label:first-child{flex:2.4}`
const Acao = styled.button`display:block;width:100%;background:${cores.bege};color:${cores.rosa};border:0;font-weight:700;font-size:14px;padding:4px 0;cursor:pointer;margin-top:8px;
  &:first-of-type{margin-top:24px}&:hover{opacity:.9}&:disabled{opacity:.6;cursor:wait}`
const Erro = styled.p`background:${cores.bege};color:${cores.rosa};padding:8px;font-weight:700;font-size:14px;margin:16px 0 0 !important`

const so = (v: string) => v.replace(/\D/g, '')

export default function Checkout() {
  const itens = useSelector((s: RootState) => s.cart.itens)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = itens.reduce((soma, i) => soma + i.preco, 0)

  const [etapa, setEtapa] = useState<Etapa>('entrega')
  const [entrega, setEntrega] = useState<Entrega>({ receiver: '', description: '', city: '', zipCode: '', number: '', complement: '' })
  const [pagamento, setPagamento] = useState<Pagamento>({ name: '', number: '', code: '', month: '', year: '' })
  const [invalidos, setInvalidos] = useState<string[]>([])
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [pedido, setPedido] = useState('')

  if (itens.length === 0 && etapa !== 'confirmacao') return <Navigate to="/carrinho" replace />

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
    navigate('/')
  }

  const inv = (n: string) => invalidos.includes(n)
  const ent = (k: keyof Entrega) => ({ value: entrega[k], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEntrega({ ...entrega, [k]: e.target.value }) })
  const pag = (k: keyof Pagamento) => ({ value: pagamento[k], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPagamento({ ...pagamento, [k]: e.target.value }) })

  return (<>
    <Topo><Container style={{ width: '100%' }}><div className="in"><Link to="/" style={{ color: cores.rosa }}>Restaurantes</Link><span className="logo">efood</span><Link to="/carrinho" style={{ color: cores.rosa }}>{itens.length} produto(s) no carrinho</Link></div></Container></Topo>
    <Container>
      <Painel>
        {etapa === 'entrega' && (
          <form onSubmit={irParaPagamento} noValidate>
            <h2>Entrega</h2>
            <Campo>Quem irá receber<input {...ent('receiver')} aria-invalid={inv('receiver')} autoComplete="name" /></Campo>
            <Campo>Endereço<input {...ent('description')} aria-invalid={inv('description')} autoComplete="street-address" /></Campo>
            <Campo>Cidade<input {...ent('city')} aria-invalid={inv('city')} autoComplete="address-level2" /></Campo>
            <Linha>
              <Campo>CEP<input {...ent('zipCode')} aria-invalid={inv('zipCode')} inputMode="numeric" placeholder="00000-000" maxLength={9} autoComplete="postal-code" /></Campo>
              <Campo>Número<input {...ent('number')} aria-invalid={inv('number')} inputMode="numeric" /></Campo>
            </Linha>
            <Campo>Complemento (opcional)<input {...ent('complement')} /></Campo>
            {invalidos.length > 0 && <Erro role="alert">Confira os campos destacados.</Erro>}
            <Acao type="submit">Continuar com o pagamento</Acao>
            <Acao type="button" onClick={() => navigate('/carrinho')}>Voltar para o carrinho</Acao>
          </form>
        )}

        {etapa === 'pagamento' && (
          <form onSubmit={finalizar} noValidate>
            <h2>Pagamento - Valor a pagar {brl(total)}</h2>
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
            <Acao type="submit" disabled={enviando}>{enviando ? 'Enviando pedido...' : 'Finalizar pagamento'}</Acao>
            <Acao type="button" onClick={() => { setInvalidos([]); setEtapa('entrega') }}>Voltar para a edição de endereço</Acao>
          </form>
        )}

        {etapa === 'confirmacao' && (
          <div>
            <h2>Pedido realizado - {pedido}</h2>
            <p>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue para {entrega.receiver.trim()} em {entrega.description.trim()}, {so(entrega.number)}{entrega.complement.trim() ? ` (${entrega.complement.trim()})` : ''} - {entrega.city.trim()}.</p>
            <p>Lembre-se de que nossos entregadores não estão autorizados a realizar cobranças extras.</p>
            <p>Para garantir a segurança e a qualidade do seu pedido, higienize as mãos antes de recebê-lo.</p>
            <p>Esperamos que tenha uma ótima refeição. Bom apetite!</p>
            <Acao type="button" onClick={concluir}>Concluir</Acao>
          </div>
        )}
      </Painel>
    </Container>
  </>)
}
