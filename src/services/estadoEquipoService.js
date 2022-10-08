import { axiosIntance } from '../helpers/axios-config';

const getEstados = () => {
    return axiosIntance.get('estado-equipo', {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const getEstado = (id) => {
    return axiosIntance.get(`estado-equipo/${id}`, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const createEstado = async (data) => {
    return axiosIntance.post('estado-equipo', data, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const updateEstado = async (id, data) => {
    return axiosIntance.put(`estado-equipo/${id}`, data, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const deleteEstado = (id) => {
    return axiosIntance.delete(`estado-equipo/${id}`, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

export {
    getEstados, getEstado, createEstado, updateEstado, deleteEstado
}