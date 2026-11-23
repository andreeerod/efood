import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { restaurantes } from '../data'
import { Botao, Container, cores } from '../styles'

const Hero = styled.header`
  background:${cores.bege};height:384px;text-align:center;padding-top:64px;
  h1{font-size:36px;font-weight:900;max-width:540px;margin:140px auto 0;line-height:42px}
  .logo{font-size:42px;font-weight:900;letter-spacing:-2px}
  @media(max-width:600px){h1{font-size:24px;margin-top:100px}}
`
const Lista = styled.ul`display:grid;grid-template-columns:repeat(auto-fill,minmax(440px,1fr));gap:48px 80px;padding:80px 0;
  @media(max-width:600px){grid-template-columns:1fr}`
const Card = styled.li`position:relative;background:${cores.branco};border:1px solid ${cores.rosa};
  img{width:100%;height:217px;object-fit:cover;display:block}
  .tags{position:absolute;top:16px;right:16px;display:flex;gap:8px}
  .tag{background:${cores.rosa};color:${cores.creme};font-weight:700;font-size:12px;padding:6px 4px}
  .info{padding:8px}
  .linha{display:flex;justify-content:space-between;font-weight:700;font-size:18px;margin-bottom:16px}
  p{color:${cores.rosa};font-size:14px;line-height:22px;margin-bottom:16px}
  a button{padding:6px 8px}`
const Rodape = styled.footer`background:${cores.bege};text-align:center;padding:40px 16px;font-size:10px;
  .logo{font-size:32px;font-weight:900;margin-bottom:32px}`

export default function Home() {
  return (<>
    <Hero><div className="logo">efood</div><h1>Viva experiências gastronômicas no conforto da sua casa</h1></Hero>
    <Container><Lista>{restaurantes.map(r => (
      <Card key={r.id}>
        <img src={r.capa} alt={r.titulo} />
        <div className="tags">{r.destaque && <span className="tag">Destaque da semana</span>}<span className="tag">{r.tipo}</span></div>
        <div className="info">
          <div className="linha"><span>{r.titulo}</span><span>{r.avaliacao} ★</span></div>
          <p>{r.descricao}</p>
          <Link to={`/restaurante/${r.id}`}><Botao style={{ background: cores.rosa, color: cores.bege }}>Saiba mais</Botao></Link>
        </div>
      </Card>))}</Lista></Container>
    <Rodape><div className="logo">efood</div><p>A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.</p></Rodape>
  </>)
}
