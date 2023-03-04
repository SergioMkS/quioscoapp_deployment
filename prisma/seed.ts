import {categorias} from './data/categorias'
import {productos} from './data/productos'
//este siempre lo usaras para interactuar con la DB
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
//con todo esto agregamos todo los datos a la base de datos con prisma
//ese .categoria es el modelo de Categoria pero se pone en minus, prima lo mapea
//data: ese lo requiere prisma
const main = async () : Promise<void> => {
    try {
        //dentro del modelo de categorias
        await prisma.categoria.createMany({
            //agrega todas las categorias que creamos
            data: categorias
        })

        //dentro del modelo de productos
        await prisma.producto.createMany({
            //agrega todas los productos que creamos
            data: productos
        })
    } catch (error) {
        console.log(error)
    }
}

main()