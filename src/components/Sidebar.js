import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"
import Categoria from "./Categoria"
const Sidebar = () => {

    const {categorias} = useQuiosco()
  return (
    <>
        <div className="p-5">
            <Image src='/assets/img/logo.svg' width={300} height={100} alt='logo'/>
        

            <nav className="mt-10">
                {categorias.map(categoria => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </nav>
        </div>
    </>
  )
}

export default Sidebar