import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInventarioporId, editInventario } from '../../services/inventarioService';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipoService';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {

    const  { inventarioId = '' } = useParams();
    const [ inventario, setInventario ] = useState({});
    const [ valoresForma, setValoresForm ] = useState({});
    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ estados, setEstados ] = useState([]);

    const { serial = '', modelo = '', descripcion = '', color = '', foto = '', 
            fechaCompra = '', precio = '', usuario, marca, tipoEquipo, estadoEquipo } = valoresForma;

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
                   const { data } = await getEstadosEquipos();
                   setEstados(data);
               } catch (eror) {
                   console.log(eror);
               }
         }
    
    useEffect(() => {
              listarEstados();
         },[]);        

     const getInventario = async () => {
          try {
              Swal.fire({
                  allowOutsideClick: false,
                  text:'Cargando...'  
               });
               Swal.showLoading();
               const { data } = await getInventarioporId(inventarioId);
               console.log(data);
               setInventario(data);
               Swal.close();
          } catch (eror) {
               console.log(eror);
               Swal.close();
          }
}

    useEffect (() => {
        getInventario();
    },[]);

    useEffect(() => {
          setValoresForm({
               serial: inventario.serial,
               modelo: inventario.modelo,
               descripcion: inventario.descripcion,
               color: inventario.color,
               foto: inventario.foto,
               fechaCompra: inventario.fechaCompra,
               precio: inventario.precio,
               usuario: inventario.usuario,
               marca: inventario.marca,
               tipoEquipo: inventario.tipoEquipo,
               estadoEquipo: inventario.estadoEquipo,
          });         
    }, [ inventario ]);

    const handleOnChange = ({ target}) => {
      const { name, value } = target;
      setValoresForm({...valoresForma, [name]: value}); // spreed
    }

    const handleOnSubmit = async (e) => {
      e.preventDefault();
      const inventario = {
        serial, modelo, descripcion, color, foto, 
        fechaCompra, precio, 
        usuario: {
          _id: usuario
        },
        marca: {
           _id: marca
        },
        tipoEquipo: {
          _id: tipoEquipo
        },
        estadoEquipo: {
          _id: estadoEquipo
        }
   }
    
   try {
        Swal.fire({
            allowOutsideClick: false,
            text:'Cargando...'  
         });
          Swal.showLoading();
          const { data } = await editInventario( inventarioId,inventario );
          console.log(data);
          Swal.close();
     } catch (eror) {
          console.log(eror);
          console.log(eror.response.data);
          /*
          Swal.close();
          let mensaje;
          if (eror && eror.response && eror.response.data) {
              mensaje = eror.response.data;
          } else {
               mensaje = 'Ocurrio un error','Por favor verifique los datos';
          }
          Swal.fire('Error', mensaje, 'error');*/
  }
   
    }

  return (
     <div className='container-fluidmt-3 mb-2 '>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Detalle activo</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-3'>
            <img src={inventario.foto} />             
            </div>

            <div className='col-md-9'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                      <div className='row'>
                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Serial</label>
                                  <input type="text"  name="serial" value={serial} onChange={ (e) => handleOnChange(e) } className="form-control" required/>
                                  
                              </div>
                          </div>

                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Modelo</label>
                                  <input type="text" name="modelo" value={modelo}  onChange={ (e) => handleOnChange(e) } className="form-control" required/>
                                  
                              </div>                        
                         </div> 

                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Descripcion</label>
                                  <input type="text" name="descripcion"  value={descripcion} onChange={ (e) => handleOnChange(e) } className="form-control" required/>
                                  
                              </div>
                          </div> 
                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Color</label>
                                  <input type="text" name="color" value={color} onChange={ (e) => handleOnChange(e) }className="form-control" required/>
                                  
                              </div>
                          </div> 
                      </div>
                      <div className='row'>
                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Foto</label>
                                  <input type="url"  name="foto" value={foto}  onChange={ (e) => handleOnChange(e) }className="form-control" required/>
                                  
                              </div>
                          </div>

                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Fecha Compra</label>
                                  <input type="date" name="fechaCompra" value={fechaCompra} onChange={ (e) => handleOnChange(e) } className="form-control" required/>
                                  
                              </div>
                          </div> 

                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Precio</label>
                                  <input type="number" name="precio" value={precio} onChange={ (e) => handleOnChange(e) } className="form-control" required/>
                                  
                              </div>
                          </div> 
                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Usuario</label>
                                  <select className="form-select" aria-label="Default select example" onChange={ (e) => handleOnChange(e) } name="usuario" value={usuario} required>
                                      <option value="">--SELECCIONAR USUARIO-</option>

                                      {
                                          usuarios.map(({_id, nombre}) => {
                                              return(
                                                  <option key={_id} value={_id}>
                                                      {
                                                          nombre
                                                      }
                                                  </option>
                                              )
                                          })
                                      }
                                  </select>
                                  
                              </div>
                          </div> 
                      </div>
                      <div className='row'>
                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Marca</label>
                                  <select className="form-select" aria-label="Default select example" onChange={ (e) => handleOnChange(e) } name="marca" value={marca} required>
                                      <option value="">--SELECCIONAR MARCA--</option>

                                      {
                                          marcas.map(({_id, nombre}) => {
                                              return(
                                                  <option key={_id} value={_id}>
                                                      {
                                                          nombre
                                                      }
                                                  </option>
                                              )
                                          })
                                      }
                                  </select>
                              </div>
                          </div>

                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Tipo Equipo</label>
                                  <select className="form-select" aria-label="Default select example" onChange={ (e) => handleOnChange(e) } name="tipoEquipo" value={tipoEquipo} required>
                                      <option  value="">--SELECCIONAR TIPO EQUIPO-</option>

                                      {
                                          tipos.map(({_id, nombre}) => {
                                              return(
                                                  <option key={_id} value={_id}>
                                                      {
                                                          nombre
                                                      }
                                                  </option>
                                              )
                                          })
                                      }
                                  </select>
                                  
                              </div>
                          </div> 

                          <div className='col'>
                              <div className="mb-3">
                                  <label className="form-label">Estado equipo</label>
                                  <select className="form-select" aria-label="Default select example" onChange={ (e) => handleOnChange(e) } name="estadoEquipo" value={estadoEquipo} required>
                                      <option  value="">--SELECCIONAR ESTADO EQUIPO-</option>

                                      {
                                          estados.map(({_id, nombre}) => {
                                              return(
                                                  <option key={_id} value={_id}>
                                                      {
                                                          nombre
                                                      }
                                                  </option>
                                              )
                                          })
                                      }
                                  </select>
                                  
                              </div>
                          </div> 
                      </div>
                      <div className='row'>
                          <div className='col'>
                              <button className='btn btn-primary'>
                                   Guardar
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
