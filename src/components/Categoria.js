//nota ya las imagenes vienes mapeadas
import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"

const Categoria = ({categoria}) => {

    const {categoriaActual, handleClickCategoria} = useQuiosco()
    //cada icono tiene el nombre igual como lo tendria las img en assets por eso las mapea
    const {nombre, icono, id} = categoria
  return (
    <div 
        className={
            `${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center w-full gap-5 p-5 border hover:bg-amber-400`}
    >
        <Image
            width={40}
            height={40}
            src={`/assets/img/icono_${icono}.svg`}
            alt='imagen icono'
        />

        <button
            type="button"
            className="text-xl font-bold hover:cursor-pointer"
            onClick={() => handleClickCategoria(id)}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria