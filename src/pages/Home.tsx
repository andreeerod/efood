import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LogoEfood from '../components/LogoEfood'
import { capitalizar } from '../data'
import { useRestaurantes } from '../hooks/useRestaurantes'
import { breakpoints, Container, cores, Mensagem, texturaTalheres } from '../styles'

// Hero do Figma: 360px, logo a 40px, título 36/42 black com 539px de largura
const Hero = styled.header`
  ${texturaTalheres}
  height: 360px;
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  h1 { max-width: 539px; font-size: 36px; line-height: 42px; font-weight: 900 }

  @media (max-width: ${breakpoints.celular}) {
    height: auto;
    gap: 48px;
    h1 { font-size: 24px; line-height: 28px }
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

// Card do Figma: 472 x 398, imagem de 217px e borda só na parte branca
const Card = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${cores.branco};

  > img { width: 100%; height: 217px; object-fit: cover; display: block }

  .tags { position: absolute; top: 16px; right: 16px; left: 16px; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px }
  .tag { background: ${cores.rosa}; color: ${cores.bege}; font-weight: 700; font-size: 12px; line-height: 14px; padding: 6px 4px }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 7px 7px;
    border: 1px solid ${cores.rosa};
    border-top: 0;
  }
  .linha { align-self: stretch; display: flex; justify-content: space-between; gap: 16px; font-weight: 700; font-size: 18px; line-height: 21px }
  h2 { font: inherit; margin-left: -1px }
  .nota { display: flex; align-items: center; gap: 8px }
  .nota svg { width: 21px; height: 21px; display: block }

  p {
    margin: 16px 0;
    font-size: 14px;
    line-height: 22px;
    height: 88px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const SaibaMais = styled(Link)`
  background: ${cores.rosa};
  color: ${cores.bege};
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  padding: 4px 6px;
`

function Estrela() {
  return (
    <svg viewBox="0 0 21 21" aria-hidden="true">
      <path
        fill={cores.alerta}
        d="M10.5.5l3.09 6.26 6.91 1-5 4.87 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.87 6.91-1L10.5.5z"
      />
    </svg>
  )
}

export default function Home() {
  const { restaurantes, carregando, erro } = useRestaurantes()

  return (
    <>
      <Hero>
        <LogoEfood />
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
                <span className="tag">{capitalizar(r.tipo)}</span>
              </div>
              <div className="info">
                <div className="linha">
                  <h2>{r.titulo}</h2>
                  <span className="nota" aria-label={`Nota ${r.avaliacao}`}>
                    {r.avaliacao}
                    <Estrela />
                  </span>
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
