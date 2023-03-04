import { useState, useEffect } from "react"
import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"
import { formatearDinero } from "@/helpers"

const ModalProducto = () => {
    const {producto, handleChangeModal, handleAgregarPedido, pedido} = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)
    
    useEffect(() => {

        //Comprobar si en el modal actual/seleccionado esta en el pedido
        if(pedido.some((pedidoState) => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
        }
    },[producto, pedido])
    
  return (
    <div className="gap-10 md:flex">
        <div className="md:w-1/3">
            <Image 
                src={`/assets/img/${producto.imagen}.jpg`} 
                width={300} 
                height={400} 
                alt={`Imagen producto ${producto.nombre}`} 
            />
        </div>

        <div className="w-2/3">

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleChangeModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <h1 className="mt-5 text-2xl font-bold">{producto.nombre}</h1>

            <p className="mt-5 text-4xl font-black text-amber-500">
                {formatearDinero(producto.precio)}
            </p>

            <div className="flex gap-4 mt-5">
                <button
                    type="button"
                    onClick={() => {
                        if(cantidad <= 1) return
                        setCantidad(cantidad - 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <p className="text-2xl">
                    {cantidad}
                </p>

                <button
                    type="button"
                    onClick={() => {
                        if(cantidad >= 10) return
                        setCantidad(cantidad + 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <button 
                type="button"
                className="px-5 py-2 mt-5 font-semibold rounded bg-slate-300 hover:bg-slate-400 text-slate-800 hover:text-slate-100"
                onClick={() => handleAgregarPedido({...producto, cantidad}) }
            >
                {edicion ? 'Guardar Cambios' : 'Añadir pedido'}
            </button>
        </div>
    </div>
  )
}

export default ModalProducto