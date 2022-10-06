import { axiosIntance } from '../helpers/axios-config';

const getUsuarios = () => {
    return axiosIntance.get('usuario', {
        headers: {
            'content-type': 'application/json'
        }
    })
}

//todo: crear, actualizar, listar po id

export {
    getUsuarios
}