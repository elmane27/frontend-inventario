import { axiosIntance } from '../helpers/axios-config';

const getInventarios = () => {
    return axiosIntance.get('/inventario', {
        headers: {
            'content-type': 'aplicacion/json; charset=utf-8'
        }
    });
}

const getInventario = (id) => {
    return axiosIntance.get(`/inventario/${id}`, {
        headers: {
            'content-type': 'aplicacion/json; charset=utf-8'
        }
    });
}

const createInventario = async (inventario) => {
    return axiosIntance.post('/inventario', inventario, {
        headers: {
            'Content-Type': "application/json; charset=utf-8",           
        }
    });
}

const updateInventario = async (id, inventario) => {
    return axiosIntance.put(`/inventario/${id}`, inventario, {
        headers: {
            'Content-Type': "application/json; charset=utf-8",
        }
    });
}

const deleteInventario = (id) => {
    return axiosIntance.delete(`inventario/${id}`,{
        headers: {
            'content-type': 'aplicacion/json'
        }
    });
}

export {
    getInventarios, getInventario, createInventario, updateInventario, deleteInventario
}

