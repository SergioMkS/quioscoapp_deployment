import Head from "next/head"
import Image from "next/image"
import Layout from "@/layout/Layout"
import Producto from "@/components/Producto"
import useQuiosco from "@/hooks/useQuiosco"

//Manera 1 de Consultar tu DB con getServerSideProps con prisma
// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient()

//   //consultamos las categorias
//   const categorias = await prisma.categoria.findMany()

//   return {
//     props: {
//       categorias
//     }
//   }
// }

export default function Home() {
  const {categoriaActual} = useQuiosco()
  //console.log(categoriaActual)
  return (
    <>
      <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
        <h1 className="text-4xl font-black underline decoration-amber-400">{categoriaActual?.nombre}</h1>
        <p className="my-10 text-2xl">
          <span className="underline decoration-amber-400">
            Elige
          </span> y {''}
          <span className="underline decoration-amber-400">
            Personaliza {''}
          </span> 
            tu Pedido
        </p>
        
        {/*grid de Productos*/}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {categoriaActual?.productos?.map(producto => (
            <Producto
              key={producto?.id}
              producto={producto}
            />
          ))}
        </div>

      </Layout>
    </>
  )
}
