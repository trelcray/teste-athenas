import { configureStore } from '@reduxjs/toolkit'
import dataTableReducer from './dataTable.slice'

export const store = configureStore({
  reducer: {
    datas: dataTableReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch