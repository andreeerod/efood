import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { brl, restaurantes, type Prato } from '../data'
import { Botao, Container, cores } from '../styles'

const Topo = styled.header`background:${cores.bege};height:186px;display:flex;align-items:center;
  .in{display:flex;justify-content:space-between;align-items:center;width:100%;font-weight:900;font-size:18px}
  .logo{font-size:36px;letter-spacing:-2px}`
const Banner = styled.div<{ $img: string }>`height:280px;background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url(${p => p.$img}) center/cover;color:#fff;
  .in{height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:24px 16px;font-size:32px;font-weight:900}
  .tipo{font-weight:100;font-size:32px}`
const Grade = styled.ul`display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:32px;padding:56px 0 120px`
const Item = styled.li`background:${cores.rosa};color:${cores.bege};padding:8px;
  img{width:100%;height:167px;object-fit:cover;display:block}
  h3{margin:8px 0;font-size:16px}p{font-size:14px;line-height:22px;margin-bottom:8px}
  button{width:100%;padding:4px 0}`
const Fundo = styled.div`position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;padding:16px;z-index:10`
const Modal = styled.div`background:${cores.rosa};color:#fff;display:flex;gap:24px;padding:32px;max-width:1024px;width:100%;position:relative;
  img{width:280px;height:280px;object-fit:cover}
  h3{font-size:18px;margin-bottom:16px}p{font-size:14px;line-height:22px;margin-bottom:16px}
  .x{position:absolute;top:8px;right:8px;background:none;border:0;color:#fff;font-size:20px;cursor:pointer}
  @media(max-width:700px){flex-direction:column;img{width:100%}}`

export default function Perfil() {
  const { id } = useParams()
  const r = restaurantes.find(x => x.id === Number(id))
  const [sel, setSel] = useState<Prato | null>(null)
  if (!r) return <Container><p style={{ padding: 40 }}>Restaurante não encontrado. <Link to="/">Voltar</Link></p></Container>
  return (<>
    <Topo><Container style={{ width: '100%' }}><div className="in"><Link to="/" style={{ color: cores.rosa }}>Restaurantes</Link><span className="logo" style={{ color: cores.rosa }}>efood</span><span>0 produto(s) no carrinho</span></div></Container></Topo>
    <Banner $img={r.capa}><Container style={{ height: '100%' }}><div className="in"><span className="tipo">{r.tipo}</span><span>{r.titulo}</span></div></Container></Banner>
    <Container><Grade>{r.cardapio.map(p => (
      <Item key={p.id}><img src={p.foto} alt={p.nome} /><h3>{p.nome}</h3><p>{p.descricao.slice(0, 120)}...</p><Botao onClick={() => setSel(p)}>Adicionar ao carrinho</Botao></Item>))}</Grade></Container>
    {sel && <Fundo onClick={() => setSel(null)}><Modal onClick={e => e.stopPropagation()}>
      <button className="x" onClick={() => setSel(null)} aria-label="Fechar">✕</button>
      <img src={sel.foto} alt={sel.nome} />
      <div><h3>{sel.nome}</h3><p>{sel.descricao}</p><p>Serve: {sel.porcao}</p><Botao>Adicionar ao carrinho - {brl(sel.preco)}</Botao></div>
    </Modal></Fundo>}
  </>)
}
