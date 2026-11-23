import { useEffect, useState } from 'react'
import type { Restaurante } from './data'

const URL = 'https://api-ebac.vercel.app/api/efood/restaurantes'

export function useRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    fetch(URL)
      .then(res => {
        if (!res.ok) throw new Error(`Erro ${res.status}`)
        return res.json()
      })
      .then(setRestaurantes)
      .catch(() => setErro('Não foi possível carregar os restaurantes.'))
      .finally(() => setCarregando(false))
  }, [])

  return { restaurantes, carregando, erro }
}
