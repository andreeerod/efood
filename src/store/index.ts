import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import cart, { carregarCarrinho, type ItemCarrinho } from './cart'

const CHAVE = 'efood:carrinho'

export const store = configureStore({
  reducer: { cart },
  preloadedState: { cart: { itens: carregarCarrinho(CHAVE) } }
})

// Mantém o carrinho salvo ao recarregar a página
store.subscribe(() => {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(store.getState().cart.itens))
  } catch {
    /* armazenamento indisponível: o carrinho continua só em memória */
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const selecionarItens = (s: RootState): ItemCarrinho[] => s.cart.itens
export const selecionarTotal = (s: RootState) => s.cart.itens.reduce((soma, i) => soma + i.preco, 0)
