import styled from 'styled-components'
import { cores } from '../styles'

const Rodape = styled.footer`
  background: ${cores.bege};
  text-align: center;
  padding: 40px 16px;
  font-size: 10px;

  .logo { font-size: 32px; font-weight: 900; letter-spacing: -2px; margin-bottom: 32px }
  p { max-width: 480px; margin: 0 auto; line-height: 1.4 }
`

export default function Footer() {
  return (
    <Rodape>
      <div className="logo">efood</div>
      <p>
        A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos
        produtos é toda do estabelecimento contratado.
      </p>
    </Rodape>
  )
}
