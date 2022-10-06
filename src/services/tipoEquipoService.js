import { axiosIntance } from '../helpers/axios-config';

//http://localhost:4000/tipo-equipo
const getTiposEquipos = () => {
    return axiosIntance.get('tipo-equipo', {
        headers: {
            'content-type': 'application/json'
        }
    })
}

//todo: crear, actualizar, listar po id

export {
    getTiposEquipos
}