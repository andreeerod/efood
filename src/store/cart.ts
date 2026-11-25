import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Prato } from '../data'

export type ItemCarrinho = Prato & { restaurante: number; uid: string }

type CartState = { itens: ItemCarrinho[] }

export function carregarCarrinho(chave: string): ItemCarrinho[] {
  try {
    const salvo = localStorage.getItem(chave)
    const itens = salvo ? JSON.parse(salvo) : []
    return Array.isArray(itens) ? itens : []
  } catch {
    return []
  }
}

const initialState: CartState = { itens: [] }

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<{ prato: Prato; restaurante: number }>) => {
      const { prato, restaurante } = action.payload
      state.itens.push({ ...prato, restaurante, uid: `${restaurante}-${prato.id}-${Date.now()}-${state.itens.length}` })
    },
    remover: (state, action: PayloadAction<string>) => {
      state.itens = state.itens.filter(i => i.uid !== action.payload)
    },
    limpar: state => {
      state.itens = []
    }
  }
})

export const { adicionar, remover, limpar } = slice.actions
export default slice.reducer
