import Image from "next/image"
import axios from "axios"
import {toast} from "react-toastify"
import { formatearDinero } from "@/helpers"

export default function Orden({orden}) {
    const {id, nombre, total, pedido} = orden

    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden Lista')
        } catch (error) {
            toast.error('Hubo un Error')
        }
    }
    
  return (
    <div className="p-10 space-y-5 border">
        <h1 className="text-2xl font-bold">Orden: {id}</h1>
        <p className="my-10 text-lg font-bold">
            Cliente: {nombre}
        </p>

        <div>
            {pedido.map(platillo => (
                <div
                    key={platillo.id}
                    className="flex items-center py-3 border-b last-of-type:border-0"
                >
                    <div className="w-32">
                        <Image
                            width={400}
                            height={500}
                            src={`/assets/img/${platillo.imagen}.jpg`}
                            alt={`imagen ${platillo.nombre}`}
                        />
                    </div>

                    <div className="p-5 space-y-2">
                        <h4 className="text-xl font-bold text-amber-500">{platillo.nombre}</h4>
                        <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="my-10 md:flex md:items-center md:justify-between">
            <p className="mt-5 text-2xl font-black text-amber-400">
                Total a Pagar: {formatearDinero(total)}
            </p>

            <button 
                className="px-10 py-3 mt-5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 md:mt-0"
                type="button"
                onClick={completarOrden}
            >
                Completar Orden
            </button>
        </div>
    </div>
  )
}

