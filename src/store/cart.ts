import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Prato } from '../data'

export type ItemCarrinho = Prato & { restaurante: number; uid: string }

const slice = createSlice({
  name: 'cart',
  initialState: { itens: [] as ItemCarrinho[] },
  reducers: {
    adicionar: (state, action: PayloadAction<{ prato: Prato; restaurante: number }>) => {
      const { prato, restaurante } = action.payload
      state.itens.push({ ...prato, restaurante, uid: `${restaurante}-${prato.id}-${Date.now()}-${state.itens.length}` })
    },
    remover: (state, action: PayloadAction<string>) => {
      state.itens = state.itens.filter(i => i.uid !== action.payload)
    },
    limpar: state => { state.itens = [] }
  }
})

export const { adicionar, remover, limpar } = slice.actions
export default slice.reducer
