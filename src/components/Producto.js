import Image from "next/image"
import {formatearDinero} from '@/helpers'
import useQuiosco from "@/hooks/useQuiosco"

const Producto = ({producto}) => {

    const { handleClickProducto, handleChangeModal } = useQuiosco()

    //recuerda que este producto lo extraiste de la categoria actual y en el archivo Api include: true hiciste esa magia
    const {nombre, imagen, precio} = producto
  return (
    <div className="flex flex-col items-center justify-center p-2 border shadow-sm md:p-3 border-slate-100">
        <Image 
            src={`/assets/img/${imagen}.jpg`} 
            width={200} 
            height={200} 
            alt={`imagen de ${nombre}`}
        />

        <div className="w-full p-4 md:p-5">
            <h3 className="text-xs font-semibold sm:text-sm md:text-xl">{nombre}</h3>
            <p className="mt-5 text-sm font-black md:text-4xl text-amber-500">
                {formatearDinero(precio)}
            </p>


            <button
                className="w-full p-2 mt-5 text-xs font-semibold text-white bg-indigo-600 sm:text-sm md:text-base hover:bg-indigo-700 hover:text-slate-100"
                type="button"
                onClick={() => {
                        handleChangeModal();
                        handleClickProducto(producto);
                    }
                }
            >
                Agregar
            </button>
        </div>
    </div>
  )
}

export default Producto