import { useEffect, useState } from 'react'
import type { Restaurante } from '../data'

const URL = 'https://api-ebac.vercel.app/api/efood/restaurantes'

export function useRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const controle = new AbortController()
    fetch(URL, { signal: controle.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Erro ${res.status}`)
        return res.json() as Promise<Restaurante[]>
      })
      .then(dados => {
        setRestaurantes(dados)
        setCarregando(false)
      })
      .catch(e => {
        if (controle.signal.aborted) return
        console.error(e)
        setErro('Não foi possível carregar os restaurantes.')
        setCarregando(false)
      })
    return () => controle.abort()
  }, [])

  return { restaurantes, carregando, erro }
}
