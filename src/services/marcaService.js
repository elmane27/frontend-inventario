import { axiosIntance } from '../helpers/axios-config';

const getMarcas = () => {
    return axiosIntance.get('marca', {
        headers: {
            'content-type': 'application/json'
        }
    })
}

const getMarca = (id) => {
    return axiosIntance.get(`marca/${id}`, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

const createMarca = async (data) => {
    return axiosIntance.post('marca', data, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const updateMarca = async (id, data) => {
    return axiosIntance.put(`marca/${id}`, data, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

const deleteMarca = (id) => {
    return axiosIntance.delete(`marca/${id}`, {
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

export {
    getMarcas,
    getMarca,
    createMarca,
    updateMarca,
    deleteMarca
}