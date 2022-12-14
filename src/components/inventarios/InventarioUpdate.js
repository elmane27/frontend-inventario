import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {    
    getInventario,
    updateInventario
} from '../../services/inventarioService';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstados } from '../../services/estadoEquipoService';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {

    const { id } = useParams();       
    const [ inventario, setInventario ] = useState({
        serial: "",
        modelo: "",
        descripcion: "",
        foto: "",
        color: "",
        fechaCompra: "",
        precio: 0,
        usuario: "",
        marca: "",
        tipoEquipo: "",
        estadoEquipo: ""
    });

    //const [ valoresForma, setValoresForm ] = useState({});
    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ estados, setEstados ] = useState([]);    

    const no_image = "https://www.colombianosune.com/sites/default/files/asociaciones/NO_disponible-43_7.jpg";

    const listarUsuario = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);
        } catch (eror) {
            console.log(eror);
        }
    }
    
    useEffect(() => {
        listarUsuario();
    },[]);   
    
    const listarMarcas = async () => {
        try {
            const { data } = await getMarcas();
            setMarcas(data);
        } catch (eror) {
            console.log(eror);
        }
    }
    
    useEffect( () => {
        listarMarcas();
    },[]);
             
    const listarTipos = async () => {
        try {
            const { data } = await getTiposEquipos();
            setTipos(data);
        } catch (eror) {
            console.log(eror);
        } 
    }
    
    useEffect(() => {
        listarTipos();
    },[]);
             
    const listarEstados = async () => {
        try {
            const { data } = await getEstados();
            setEstados(data);
        } catch (eror) {
            console.log(eror);
        }
    }
    
    useEffect(() => {
        listarEstados();
    },[]);
    
    const getInventarioFromApi = async () => {
        const response = await getInventario(id);
        console.log(response.data);
        setInventario(response.data);
    }

    useEffect(() => {
        getInventarioFromApi();
    }, [id]);

    const handleOnChange = ( event ) => {                        
        const { name, value } = event.target;        
        setInventario({ ...inventario, [name]: value });
    }

    const handleOnSubmit = async ( event ) => {
        event.preventDefault();        
        try {
            Swal.fire({
                allowOutsideClick: false,
                text:'Actulizando...'  
            });
            Swal.showLoading();            
            const response = await updateInventario(id, inventario);
            if (response.status === 200 && response.data.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Actualizaci??n exitosa',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.href = "/inventarios";
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al actualizar',
                    showConfirmButton: true,
                    
                });
            }
        } catch (eror) {
            console.log(eror);
            Swal.fire('Error', eror.response.data.mensaje, 'error');
        }
    }

    return (
        <div className='container-fluidmt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle activo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>                        
                        <div className='col-md-3'>
                            <img src={ inventario.foto || no_image } className='img-fluid' alt='...' />             
                        </div>

                        <div className='col-md-9'>
                            <form onSubmit={handleOnSubmit}>                                
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input type="text"  name="serial" value={inventario.serial} onChange={ handleOnChange} className="form-control" required/>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Modelo</label>
                                            <input type="text" name="modelo" value={inventario.modelo}  onChange={ handleOnChange} className="form-control" required/>
                                        </div>                        
                                    </div> 

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Descripcion</label>
                                            <input type="text" name="descripcion"  value={inventario.descripcion} onChange={ handleOnChange} className="form-control" required/>                                            
                                        </div>
                                    </div> 
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Color</label>
                                            <select name="color" value={inventario.color} onChange={ handleOnChange} className="form-select" required>
                                                <option value="">Seleccione un color</option>
                                                <option value="Rojo">&#x1F534; Rojo</option>
                                                <option value="Verde">&#x1F7E2; Verde</option>
                                                <option value="Amarillo">&#x1F7E1; Amarillo</option>
                                                <option value="Azul">&#x1F535; Azul</option>
                                                <option value="Morado">&#x1F7E3; Morado</option>
                                                <option value="Naranja">&#x1F7E0; Naranja</option>
                                                <option value="Marron">&#x1F7E4; Marron</option>                                                
                                                <option value="Blanco">&#9898; Blanco</option>
                                                <option value="Negro">&#9899; Negro</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                    </div> 
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Url Foto</label>
                                            <input type="url"  name="foto" value={inventario.foto}  onChange={ handleOnChange}className="form-control" required/>                                            
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Compra</label> 
                                            <input type="date" name="fechaCompra" value={ dayjs(inventario.fechaCompra).format('YYYY-MM-DD') } onChange={ handleOnChange} className="form-control" required/>
                                        </div>
                                    </div> 

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Precio</label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">$</span>
                                                <input type="number" name="precio" value={inventario.precio} onChange={ handleOnChange} className="form-control" required/>
                                            </div>
                                        </div>
                                    </div> 
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Usuario</label>
                                            <select className="form-select" aria-label="Default select example" onChange={ handleOnChange} name="usuario" value={inventario.usuario._id} required>
                                                <option value="">--SELECCIONAR USUARIO--</option>
                                                { usuarios.map( usuario => (
                                                    <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                                                )) }
                                            </select>
                                        </div>
                                    </div> 
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Marca</label>
                                            <select className="form-select" aria-label="Default select example" onChange={ handleOnChange} name="marca" value={inventario.marca._id} required>
                                                <option value="">--SELECCIONAR MARCA--</option>
                                                { marcas.map( marca => (
                                                    <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Tipo Equipo</label>
                                            <select className="form-select" aria-label="Default select example" onChange={ handleOnChange} name="tipoEquipo" value={inventario.tipoEquipo._id} required>
                                                <option  value="">--SELECCIONAR TIPO EQUIPO--</option>
                                                { tipos.map( tipo => (
                                                    <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
                                                ))}
                                            </select>                                            
                                        </div>
                                    </div> 

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Estado equipo</label>
                                            <select className="form-select" aria-label="Default select example" onChange={ handleOnChange} name="estadoEquipo" value={inventario.estadoEquipo._id} required>
                                                <option  value="">--SELECCIONAR ESTADO EQUIPO--</option>
                                                { estados.map( estado => (
                                                    <option key={estado._id} value={estado._id}>{estado.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div> 
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <button type="submit" className='btn btn-primary'>
                                            Actualizar
                                        </button>          
                                    </div>
                                </div>
                            </form>        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
