import { useRouter } from "next/router"

const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'},
]
const Pasos = () => {
    const router = useRouter()

    const calcularProgreso = () => {
        let valor;

        if(router.pathname === '/') {
            valor = 2;
        }else if(router.pathname === '/resumen') {
            valor = 50;
        }else {
            valor = 100;
        }
        
        return valor
    }
    
  return (
    <>
        <div className="flex justify-between mb-6">
            {pasos.map((paso) => (
                <button
                    onClick={() => {
                       router.push(paso.url)
                    }}
                    className="p-2 text-sm font-bold border sm:text-xl md:text-2xl drop-shadow-md hover:drop-shadow-2xl hover:text-amber-400 hover:border-amber-500"
                    key={paso.paso}
                >
                    {paso.nombre}
                </button>
            ))}
        </div>

        <div className="mb-10 bg-gray-100">
            <div 
                className="h-2 text-xs leading-none text-center text-white rounded-full bg-amber-400"
                style={{width: `${calcularProgreso()}%`}}
            >
                
            </div>
        </div>
    </>
  )
}

export default Pasos