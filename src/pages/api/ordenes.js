import { PrismaClient } from "@prisma/client"



export default async function handler(req, res) {
    const prisma = new PrismaClient()

    //Obtener Ordenes
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    })

    res.status(200).json(ordenes)

    //Crar Ordenes
    if(req.method === "POST") {
        const orden = await prisma.orden.create({
            //debes espeficicar con data (los datos que vas a ingresar)
            //nombre deben coincidir(escritos igual) a la columna con el squema de prima que vas a inserta los datos
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha,
            },
        })
        res.status(200).json(orden)
    }
}