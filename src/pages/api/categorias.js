//como nombres este archivo en Api se creara la ruta
// = /api/categorias     para este caso
//manera 2 de consultar tu base de datos con prisma
//este simpre lo vas a importar cuando vayas a interactuar con la base de datos
//desde Api siempre se ejecutara del lado del servidor
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true
    }
  })

  res.status(200).json(categorias)
}
