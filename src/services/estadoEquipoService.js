import { axiosIntance } from '../helpers/axios-config';

//http://localhost:4000/tipo-equipo
const getEstadosEquipos = () => {
    return axiosIntance.get('estado-equipo', {
        headers: {
            'content-type': 'application/json'
        }
    })
}

//todo: crear, actualizar, listar po id

export {
    getEstadosEquipos
}