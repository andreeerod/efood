import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { brl } from '../data'
import { Botao, Container, cores } from '../styles'
import { limpar, remover } from '../store/cart'
import type { RootState } from '../store'

const Topo = styled.header`background:${cores.bege};height:186px;display:flex;align-items:center;
  .in{display:flex;justify-content:space-between;align-items:center;width:100%;font-weight:900;font-size:18px}
  .logo{font-size:36px;letter-spacing:-2px}`
const Lista = styled.ul`display:flex;flex-direction:column;gap:16px;padding:56px 0 24px`
const Linha = styled.li`background:${cores.rosa};color:${cores.bege};padding:8px;display:flex;gap:16px;align-items:center;position:relative;
  img{width:80px;height:80px;object-fit:cover}
  h3{font-size:18px}p{font-size:14px}
  .rm{margin-left:auto;background:none;border:0;color:${cores.bege};font-size:18px;cursor:pointer}`
const Total = styled.div`display:flex;justify-content:space-between;font-weight:700;font-size:18px;padding:16px 0 120px;
  .acoes{display:flex;gap:8px}button{padding:8px 16px}`

export default function Carrinho() {
  const itens = useSelector((s: RootState) => s.cart.itens)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = itens.reduce((soma, i) => soma + i.preco, 0)
  return (<>
    <Topo><Container style={{ width: '100%' }}><div className="in"><Link to="/" style={{ color: cores.rosa }}>Restaurantes</Link><span className="logo" style={{ color: cores.rosa }}>efood</span><span>{itens.length} produto(s) no carrinho</span></div></Container></Topo>
    <Container>
      {itens.length === 0
        ? <p style={{ padding: '56px 0 120px' }}>Seu carrinho está vazio. <Link to="/" style={{ textDecoration: 'underline' }}>Escolha um restaurante</Link></p>
        : <>
          <Lista>{itens.map(i => (
            <Linha key={i.uid}><img src={i.foto} alt={i.nome} /><div><h3>{i.nome}</h3><p>{brl(i.preco)}</p></div>
              <button className="rm" aria-label={`Remover ${i.nome}`} onClick={() => dispatch(remover(i.uid))}>🗑</button></Linha>))}</Lista>
          <Total><span>Valor total: {brl(total)}</span>
            <div className="acoes"><Botao onClick={() => dispatch(limpar())}>Esvaziar carrinho</Botao><Botao onClick={() => navigate('/checkout')}>Continuar com a entrega</Botao></div></Total>
        </>}
    </Container>
  </>)
}
