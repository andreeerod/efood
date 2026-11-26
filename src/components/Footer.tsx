import styled from 'styled-components'
import { cores } from '../styles'
import LogoEfood from './LogoEfood'
import instagram from '../assets/instagram.svg'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'

// Rodapé do Figma: 298px, logo a 40px, redes a 130px, texto a 40px do fim
const Rodape = styled.footer`
  background: ${cores.bege};
  min-height: 298px;
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    max-width: 480px;
    margin-top: auto;
    font-size: 10px;
    line-height: 12px;
  }
`

const Redes = styled.ul`
  display: flex;
  gap: 8px;
  margin: 32.5px 0 80px;

  a, img { display: block; width: 24px; height: 24px }
`

const redes = [
  { nome: 'Instagram', url: 'https://instagram.com', icone: instagram },
  { nome: 'Facebook', url: 'https://facebook.com', icone: facebook },
  { nome: 'Twitter', url: 'https://twitter.com', icone: twitter }
]

export default function Footer() {
  return (
    <Rodape>
      <LogoEfood />
      <Redes>
        {redes.map(r => (
          <li key={r.nome}>
            <a href={r.url} target="_blank" rel="noreferrer" aria-label={r.nome}>
              <img src={r.icone} alt="" />
            </a>
          </li>
        ))}
      </Redes>
      <p>
        A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos
        produtos é toda do estabelecimento contratado.
      </p>
    </Rodape>
  )
}
