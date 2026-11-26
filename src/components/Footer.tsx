import styled from 'styled-components'
import { cores } from '../styles'
import LogoEfood from './LogoEfood'

const Rodape = styled.footer`
  background: ${cores.bege};
  text-align: center;
  padding: 40px 16px;
  font-size: 10px;

  .logo { display: flex; justify-content: center; margin-bottom: 32px }
  p { max-width: 480px; margin: 0 auto; line-height: 1.4 }
`

const Redes = styled.ul`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 80px;

  a {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${cores.rosa};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .15s;
  }
  a:hover { opacity: .8 }
  svg { width: 13px; height: 13px; fill: ${cores.bege} }
`

const redes = [
  {
    nome: 'Instagram',
    url: 'https://instagram.com',
    d: 'M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z'
  },
  {
    nome: 'Facebook',
    url: 'https://facebook.com',
    d: 'M9 8H6v4h3v12h5V12h3.6L18 8h-4V6.3c0-1 .2-1.3 1.1-1.3H18V0h-3.8C10.6 0 9 1.6 9 4.6V8z'
  },
  {
    nome: 'Twitter',
    url: 'https://twitter.com',
    d: 'M24 4.6a9.8 9.8 0 0 1-2.8.8 4.9 4.9 0 0 0 2.1-2.7 9.9 9.9 0 0 1-3.1 1.2 4.9 4.9 0 0 0-8.4 4.5A14 14 0 0 1 1.7 3.2a4.9 4.9 0 0 0 1.5 6.6 4.9 4.9 0 0 1-2.2-.6v.1a4.9 4.9 0 0 0 3.9 4.8 4.9 4.9 0 0 1-2.2.1 4.9 4.9 0 0 0 4.6 3.4A9.9 9.9 0 0 1 0 19.5a14 14 0 0 0 7.5 2.2c9.1 0 14-7.5 14-14v-.6A10 10 0 0 0 24 4.6z'
  }
]

export default function Footer() {
  return (
    <Rodape>
      <div className="logo"><LogoEfood /></div>
      <Redes>
        {redes.map(r => (
          <li key={r.nome}>
            <a href={r.url} target="_blank" rel="noreferrer" aria-label={r.nome}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={r.d} /></svg>
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
