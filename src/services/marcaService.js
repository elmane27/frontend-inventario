import { axiosIntance } from '../helpers/axios-config';

const getMarcas = () => {
    return axiosIntance.get('marca', {
        headers: {
            'content-type': 'application/json'
        }
    })
}

//todo: crear, actualizar, listar po id

export {
    getMarcas
}