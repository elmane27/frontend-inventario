import { axiosIntance } from '../helpers/axios-config';

const getInventario = () => {
    return axiosIntance.get('inventario', {
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

const editInventario = ( invntarioid, data ) => {
    return axiosIntance.put(`inventario/${invntarioid }`,  data, {
        headers: {
            'content-type': 'aplicacion/json'
        }
    });
}

const getInventarioporId = (inventarioId) => {
    return axiosIntance.get(`inventario/${inventarioId}`,{
        headers: {
            'content-type': 'aplicacion/json'
        }
    });
}

export {
    getInventario, crearInventario, editInventario, getInventarioporId
}

