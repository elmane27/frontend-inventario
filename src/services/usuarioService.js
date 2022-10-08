import { axiosIntance } from '../helpers/axios-config';

const getUsuarios = () => {
    return axiosIntance.get('usuario', {
        headers: {
            'content-type': 'application/json'
        }
    })
}

const getUsuario = (id) => {
    return axiosIntance.get(`usuario/${id}`, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

const createUsuario = async (data) => {
    return axiosIntance.post('usuario', data, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const updateUsuario = async (id, data) => {
    return axiosIntance.put(`usuario/${id}`, data, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const deleteUsuario = (id) => {
    return axiosIntance.delete(`usuario/${id}`, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}