import { Route, Routes } from 'react-router-dom'
import { Global } from './styles'
import Home from './pages/Home'
import Perfil from './pages/Perfil'
export default function App() {
  return (<><Global />
    <Routes><Route path="/" element={<Home />} /><Route path="/restaurante/:id" element={<Perfil />} /></Routes></>)
}
