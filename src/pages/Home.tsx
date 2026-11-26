import { Link } from 'react-router-dom'
import LogoEfood from '../components/LogoEfood'
import styled from 'styled-components'
import { useRestaurantes } from '../hooks/useRestaurantes'
import { breakpoints, Container, cores, Mensagem } from '../styles'
import { texturaTalheres } from '../styles'

const Hero = styled.header`
  ${texturaTalheres}
  text-align: center;
  padding: 64px 16px 40px;
  min-height: 384px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 48px;

  .logo { display: flex; justify-content: center }
  h1 { font-size: 36px; font-weight: 900; max-width: 540px; line-height: 1.2 }

  @media (max-width: ${breakpoints.celular}) {
    min-height: 0;
    padding: 40px 16px;
    h1 { font-size: 24px }
  }
`

const Lista = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 80px;
  padding: 80px 0 120px;

  @media (max-width: ${breakpoints.tablet}) { gap: 32px }
  @media (max-width: ${breakpoints.celular}) { grid-template-columns: 1fr; padding: 32px 0 64px }
`

const Card = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${cores.branco};
  border: 1px solid ${cores.rosa};
  transition: transform .2s, box-shadow .2s;

  &:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(230, 103, 103, .18) }

  img { width: 100%; height: 217px; object-fit: cover; display: block }
  .tags { position: absolute; top: 16px; right: 16px; left: 16px; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px }
  .tag { background: ${cores.rosa}; color: ${cores.creme}; font-weight: 700; font-size: 12px; padding: 6px 8px }
  .info { padding: 8px; display: flex; flex-direction: column; flex: 1 }
  .linha { display: flex; justify-content: space-between; gap: 16px; font-weight: 700; font-size: 18px; margin-bottom: 16px }
  h2 { font: inherit }
  p { font-size: 14px; line-height: 22px; margin-bottom: 16px; flex: 1 }
`

const SaibaMais = styled(Link)`
  align-self: flex-start;
  background: ${cores.rosa};
  color: ${cores.bege};
  font-weight: 700;
  font-size: 14px;
  padding: 8px 12px;
  transition: background .15s;

  &:hover { background: ${cores.rosaEscuro} }
`

export default function Home() {
  const { restaurantes, carregando, erro } = useRestaurantes()

  return (
    <>
      <Hero>
        <div className="logo"><LogoEfood /></div>
        <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
      </Hero>
      <Container>
        {carregando && <Mensagem>Carregando restaurantes...</Mensagem>}
        {erro && <Mensagem role="alert">{erro}</Mensagem>}
        <Lista>
          {restaurantes.map(r => (
            <Card key={r.id}>
              <img src={r.capa} alt={r.titulo} loading="lazy" />
              <div className="tags">
                {r.destacado && <span className="tag">Destaque da semana</span>}
                <span className="tag">{r.tipo}</span>
              </div>
              <div className="info">
                <div className="linha">
                  <h2>{r.titulo}</h2>
                  <span aria-label={`Nota ${r.avaliacao}`}>{r.avaliacao} ★</span>
                </div>
                <p>{r.descricao}</p>
                <SaibaMais to={`/restaurante/${r.id}`}>Saiba mais</SaibaMais>
              </div>
            </Card>
          ))}
        </Lista>
      </Container>
    </>
  )
}
