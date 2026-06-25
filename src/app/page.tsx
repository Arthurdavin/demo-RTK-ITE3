// app/page.tsx
'use client'

import CounterComponent from "@/components/CounterComponent"
import { ProductList } from "@/components/ProductList"
import ProductTest from "@/components/ProductTest"

export default function Home() {

  return (
    <div>
        {/* <CounterComponent /> */}
        <ProductList/>
        <ProductTest/>
    </div>
  )
  
}