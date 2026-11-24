import { Route, Routes } from 'react-router-dom'
import { Global } from './styles'
import Home from './pages/Home'
import Perfil from './pages/Perfil'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
export default function App() {
  return (<><Global />
    <Routes><Route path="/" element={<Home />} /><Route path="/restaurante/:id" element={<Perfil />} /><Route path="/carrinho" element={<Carrinho />} /><Route path="/checkout" element={<Checkout />} /></Routes></>)
}
