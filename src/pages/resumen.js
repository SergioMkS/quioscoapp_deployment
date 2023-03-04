import Layout from "@/layout/Layout"
import ResumenProducto from "@/components/ResumenProducto"
import useQuiosco from "@/hooks/useQuiosco"

export default function Resumen() {
    const {pedido} = useQuiosco()


    return (
        <Layout
            pagina={'Resumen de Pedido'}
        >
            <h1 className="text-4xl font-bold"><span className="underline decoration-amber-400">Re</span>sumen</h1>
            <p className="my-10 text-2xl underline decoration-amber-400">
                Revisa tu pedido
            </p>

            {pedido.length === 0 ? (
                <p className="text-2xl text-center">
                    No Hay Elementos en tu pedido
                </p>
            ) : (
                pedido.map(producto => (
                    <ResumenProducto
                        key={producto.id}
                        producto={producto}
                    />
                ))
            )}
        </Layout>
    )
}