import { axiosIntance } from '../helpers/axios-config';

const getInventarios = () => {
    return axiosIntance.get('inventario', {
        headers: {
            'content-type': 'aplicacion/json'
        }
    });
}

const getInventario = (id) => {
    return axiosIntance.get(`inventario/${id}`, {
        headers: {
            'content-type': 'aplicacion/json'
        }
    });
}

const crearInventario = (data) => {
    return axiosIntance.post('inventario',  data, {
        headers: {
            'content-type': 'aplicacion/json'
        }
    });
}

const updateInventario = (id, data) => {
    return axiosIntance.put(`inventario/${id}`, data, {
        headers: {
            'content-type': 'aplicacion/json'
        }
    });
}

const deleteInventario = (inventarioId) => {
    return axiosIntance.delete(`inventario/${inventarioId}`,{
        headers: {
            'content-type': 'aplicacion/json'
        }
    });
}

export {
    getInventarios, getInventario, crearInventario, updateInventario, deleteInventario
}

