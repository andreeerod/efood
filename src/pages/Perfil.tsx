import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { brl, capitalizar, type Prato } from '../data'
import { useRestaurantes } from '../hooks/useRestaurantes'
import { breakpoints, Botao, Container, cores, Mensagem } from '../styles'
import { abrir, adicionar } from '../store/cart'
import { useAppDispatch } from '../store'

// Banner do Figma: 280px, sombra de 50%, tipo em 32px thin e nome em 32px black
const Banner = styled.div<{ $img: string }>`
  height: 280px;
  background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${p => p.$img}) center / cover;
  color: ${cores.branco};

  .in { height: 100%; margin-left: -1px; display: flex; flex-direction: column; justify-content: space-between; padding: 25px 0 27px }
  .tipo { font-weight: 100; font-size: 32px; line-height: 38px }
  h1 { font-size: 32px; line-height: 38px; font-weight: 900 }

  @media (max-width: ${breakpoints.celular}) {
    height: 200px;
    .tipo { font-size: 22px; line-height: 26px }
    h1 { font-size: 26px; line-height: 30px }
  }
`

const Grade = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 56px 0 120px;

  @media (max-width: ${breakpoints.tablet}) { grid-template-columns: repeat(2, 1fr); gap: 24px }
  @media (max-width: ${breakpoints.celular}) { grid-template-columns: 1fr; padding: 32px 0 64px }
`

// Card do prato no Figma: 320 x 338, imagem 304 x 167, espaços de 8px
const Item = styled.li`
  background: ${cores.rosa};
  color: ${cores.bege};
  padding: 8px;
  display: flex;
  flex-direction: column;

  img { width: 100%; height: 167px; object-fit: cover; display: block }
  h3 { font-size: 16px; line-height: 19px; font-weight: 900; margin: 8px 0 }
  p {
    font-size: 14px;
    line-height: 22px;
    height: 88px;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  button { margin-top: auto }
`

const Fundo = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 10;
  overflow-y: auto;
`

// Modal do Figma: 1024 x 344, padding 32, foto 280 x 280 e 24px até o texto
const Modal = styled.div`
  background: ${cores.rosa};
  color: ${cores.branco};
  display: flex;
  gap: 24px;
  padding: 32px;
  max-width: 1024px;
  width: 100%;
  position: relative;
  margin: auto;

  > img { width: 280px; height: 280px; object-fit: cover; flex-shrink: 0 }
  .texto { display: flex; flex-direction: column; align-items: flex-start }
  h3 { font-size: 18px; line-height: 21px; font-weight: 900; margin-bottom: 16px }
  p { font-size: 14px; line-height: 22px }
  p + p { margin-top: 22px }
  .texto > button { margin-top: 16px }
  .x { position: absolute; top: 8px; right: 8px; width: 16px; height: 16px; padding: 0; background: none; border: 0; cursor: pointer }
  .x svg { display: block; width: 16px; height: 16px }

  @media (max-width: 700px) {
    flex-direction: column;
    padding: 40px 16px 16px;
    > img { width: 100%; height: 220px }
    .texto > button { width: 100% }
  }
`

export default function Perfil() {
  const { id } = useParams()
  const { restaurantes, carregando, erro } = useRestaurantes()
  const dispatch = useAppDispatch()
  const [sel, setSel] = useState<Prato | null>(null)

  // Fecha o modal com Esc e trava a rolagem da página enquanto ele está aberto
  useEffect(() => {
    if (!sel) return
    const fechar = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null)
    document.addEventListener('keydown', fechar)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fechar)
      document.body.style.overflow = ''
    }
  }, [sel])


  const r = restaurantes.find(x => x.id === Number(id))

  const comprar = (prato: Prato) => {
    if (!r) return
    dispatch(adicionar({ prato, restaurante: r.id }))
    setSel(null)
    dispatch(abrir())
  }

  let conteudo
  if (carregando) conteudo = <Container><Mensagem>Carregando cardápio...</Mensagem></Container>
  else if (erro) conteudo = <Container><Mensagem role="alert">{erro} <Link to="/">Voltar</Link></Mensagem></Container>
  else if (!r) conteudo = <Container><Mensagem>Restaurante não encontrado. <Link to="/">Voltar</Link></Mensagem></Container>
  else
    conteudo = (
      <>
        <Banner $img={r.capa}>
          <Container style={{ height: '100%' }}>
            <div className="in">
              <span className="tipo">{capitalizar(r.tipo)}</span>
              <h1>{r.titulo}</h1>
            </div>
          </Container>
        </Banner>
        <Container>
          <Grade>
            {r.cardapio.map(p => (
              <Item key={p.id}>
                <img src={p.foto} alt={p.nome} loading="lazy" />
                <h3>{p.nome}</h3>
                <p>{p.descricao}</p>
                <Botao $cheio onClick={() => setSel(p)}>
                  Adicionar ao carrinho
                </Botao>
              </Item>
            ))}
          </Grade>
        </Container>
      </>
    )

  return (
    <>
      <Header />
      {conteudo}
      {sel && (
        <Fundo onClick={() => setSel(null)}>
          <Modal role="dialog" aria-modal="true" aria-label={sel.nome} onClick={e => e.stopPropagation()}>
            <button className="x" onClick={() => setSel(null)} aria-label="Fechar">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <img src={sel.foto} alt={sel.nome} />
            <div className="texto">
              <h3>{sel.nome}</h3>
              <p>{sel.descricao}</p>
              <p>Serve: {/^de /i.test(sel.porcao) ? sel.porcao : `de ${sel.porcao}`}</p>
              <Botao onClick={() => comprar(sel)} autoFocus>
                Adicionar ao carrinho - {brl(sel.preco)}
              </Botao>
            </div>
          </Modal>
        </Fundo>
      )}
    </>
  )
}
