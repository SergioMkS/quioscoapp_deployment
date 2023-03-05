import { useCallback, useEffect } from "react";
import Layout from "@/layout/Layout"
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "@/helpers";

export default function Total() {

    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco()

    const comprobarPedido = useCallback( () => {
        return pedido.length === 0 || nombre === ''
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    },[pedido, comprobarPedido])
    
    
    
    return (
        <Layout
            pagina={'Total a Pagar'}
        >
            <h1 className="text-4xl font-bold"><span className="underline decoration-amber-400">Total</span>
            
            </h1>
            <p className="my-10 text-2xl underline decoration-amber-400">Confirma tu pedido
            </p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label
                        htmlFor="nombre" 
                        className="block text-base font-bold uppercase text-slate-600"
                    >
                        Nombre:
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        className="w-full p-2 mt-3 bg-gray-100 rounded-md lg:w-1/3"
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)} 
                    />

                    <div className="mt-10">
                        <p className="text-2xl">Total a pagar: {''}<span className="font-bold">{formatearDinero(total)}</span></p>
                    </div>

                    <div className="mt-6">
                        <input
                            className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-700'} w-full px-5 py-2 font-semibold text-center text-white uppercase  rounded lg:w-auto`}
                            type="submit"
                            value="Confirmar Pedido"
                            disabled={comprobarPedido()}
                        />
                    </div>
                    
                </div>
            </form>
        </Layout>
    )
}