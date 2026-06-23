// app/page.tsx
'use client'

import CounterComponent from "@/components/CounterComponent"
import { ProductList } from "@/components/ProductList"

export default function Home() {

  return (
    <div>
        <CounterComponent />
        <ProductList/>
    </div>
  )
  
}