// src/app/StoreProvider.tsx
'use client'


import { Provider } from 'react-redux'
// import { makeStore, AppStore } from '../lib/store'
import { useRef } from 'react'
import { AppStore, makeStore } from '@/redux/store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}