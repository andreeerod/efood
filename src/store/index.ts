import { configureStore } from '@reduxjs/toolkit'
import cart from './cart'

export const store = configureStore({ reducer: { cart } })
export type RootState = ReturnType<typeof store.getState>
