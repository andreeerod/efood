import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Global } from './styles'
import Footer from './components/Footer'
import Home from './pages/Home'
import Perfil from './pages/Perfil'
import Carrinho from './components/Carrinho'

const Pagina = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main { flex: 1 }
`

export default function App() {
  return (
    <Pagina>
      <Global />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurante/:id" element={<Perfil />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Carrinho />
    </Pagina>
  )
}
