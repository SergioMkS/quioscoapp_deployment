import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  //recuerda que ese prisma.producto es el Schema de Producto, se pone en minuscula y prisma lo mapea por ti
  const productos = await prisma.producto.findMany()

  res.status(200).json(productos)
}