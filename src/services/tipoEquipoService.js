import { axiosIntance } from '../helpers/axios-config';

const getTiposEquipos = () => {
    return axiosIntance.get('tipo-equipo', {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const getTipoEquipo = (id) => {
    return axiosIntance.get(`tipo-equipo/${id}`, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const createTipoEquipo = async (data) => {
    return axiosIntance.post('tipo-equipo', data, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const updateTipoEquipo = async (id, data) => {
    return axiosIntance.put(`tipo-equipo/${id}`, data, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const deleteTipoEquipo = (id) => {
    return axiosIntance.delete(`tipo-equipo/${id}`, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

export {
    getTiposEquipos,
    getTipoEquipo,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo
}