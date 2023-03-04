import { useEffect, useState, createContext } from "react"
import axios from "axios"
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    //este es cuando le das agregar al producto
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()
    
    //prisma no tiene algo para traer los datos del  servidor a la interfaz de usuario
    //o sea una manera de consultar los datos en el frontend
    //para eso usaremos axios, para traer esos datos que ya consultamos en api
    const obtenerCategorias = async () => {
        try {
            //accedemos a la ruta /api/categorias default method:GET
            //esa la creamos en la carpeta api y esa solo accede a las categorias desde el modelo de categorias
            const {data} = await axios('/api/categorias')
            setCategorias(data)
            //console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    //recuerda los effect se ejecutan en el orden que los defines
    useEffect(() => {
        obtenerCategorias()
    },[])


    //esta categoria se va a marcar por default
    useEffect(() => {
        setCategoriaActual(categorias[0])
    },[categorias])

    //para total
    useEffect(() => {
        //precio y cantidad estan dentro del obj de pedido
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

        setTotal(nuevoTotal)
    },[pedido])

    const handleClickCategoria = (id) => {
        //categorias es el arreglo de las categorias
        const categoria = categorias.filter(catg => catg.id === id )
        //sin [0] te crea un array con un obj, y el state original es un obj
        setCategoriaActual(categoria[0])

        //redirigir al usuario cuando de click en una categoria, y si esta en resumen por ejemplo, le da click en hamburguesas y lo lleve a la pag principal porque alli estan las variedades para escoger
        router.push('/')
    }

    const handleClickProducto = (producto) => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        //sera lo contrario de lo que haya en el modal
        setModal(!modal)
    }

    //categoriaId, las sacas del obj porque no las quieres y haes la copia
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)) {
            //actualizar la cantidad del producto existente

            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)

            setPedido(pedidoActualizado)

            toast.success('♥ Guardado Correctamente ♥', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else {
            setPedido([...pedido, producto])
            toast.success('♣ Añadido Correctamente ♣', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        setModal(false)
    }

    const handleEditarCantidades = (id) => {
        const actualizarCantidad = pedido.filter(producto => producto.id === id)
        //[0], porque el metodo nos crea un nuevo arreglo
        setProducto(actualizarCantidad[0])
        setModal(!modal);
    }

    const handleEliminarProducto = (id) => {
        //iteras todos los produc por su id y sacamos !== id que yo le pase y los demas se quedan
        const eliminarPedido = pedido.filter(producto => producto.id !== id)
        setPedido(eliminarPedido)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();
        //nota: en los datos de axios, esos datos debe corresponder a tu squema de de base de datos, este caso prisma debe coincidir con ese squema tanto llave y valor(con su tipo de dato)
        try {
            //method: POST, ('url', data)
           await axios.post('/api/ordenes', {
            pedido,
            nombre,
            total,
            fecha: Date.now().toString()
           })

           //retear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            },2000)
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <QuioscoContext.Provider
        value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleClickProducto,
            modal,
            handleChangeModal,
            pedido,
            handleAgregarPedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total

        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export {
    QuioscoProvider
}

export default QuioscoContext