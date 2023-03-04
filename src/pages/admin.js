import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "@/layout/AdminLayout"
import Orden from '@/components/Orden'

export default function Admin() {

    //extraes desde api/ordenes tu servidor local ordenes.js
    const fetcher = () => axios.get('/api/ordenes').then(res => res.data)
    //todos estos valores son del hook de useSWR
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100})

    
    return (
        <AdminLayout
            pagina={'Admin'}
        >
            <h1 className="text-4xl font-bold"><span className="underline decoration-amber-400">Panel</span> de Administración</h1>
            <p className="my-10 text-2xl underline decoration-amber-400">
                Administra tus Ordenes
            </p>

            {data && data.length ? data.map(orden =>
                <Orden
                    key={orden.id}
                    orden={orden}
                />
            ) : <p>No hay Ordenes Pendientes</p>}
        </AdminLayout>
    )
}