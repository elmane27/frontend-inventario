import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipoService';
import { crearInventario } from '../../services/inventarioService'
import Swal from 'sweetalert2';

export const InventarioNew = ({ handleopenModal, listarInventarios }) => {

    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ estados, setEstados ] = useState([]);
    const [ valoresForma, setValoresForm ] = useState({});
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
     console.log(inventario);
        try {
          Swal.fire({
               allowOutsideClick: false,
               text:'Cargando...'  
          });
          Swal.showLoading();
          const { data } = await crearInventario(inventario);
          console.log(data);
          Swal.close();
          handleopenModal();
          listarInventarios();
     } catch (eror) {
           console.log(eror);
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
     <div className='sidebar new'>
     <div className='container-fluid'>
         <div className='row'>
             <div className='col'>
                 <div className='sidebar-header'>
                     <h3>Nuevo inventario</h3>
                     <i className="fa-sharp fa-solid fa-xmark pointer-modal"  onClick={ handleopenModal }></i>
                 </div>
             </div>
         </div>
         <div className='row'>
             <div className='col'>
                 <hr/>
             </div>
         </div>
             <form onSubmit={(e) => handleOnSubmit(e)}>
                 <div className='row'>
                     <div className='col'>
                         <div className="mb-3">
                             <label className="form-label">Serial</label>
                             <input type="text" name="serial" value={serial} onChange={ (e) => handleOnChange(e) } className="form-control" required/>
                             
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
                             <input type="text" name="color" value={color} onChange={ (e) => handleOnChange(e) } className="form-control" required/>
                             
                         </div>
                     </div> 
                 </div>
                 <div className='row'>
                     <div className='col'>
                         <div className="mb-3">
                             <label className="form-label">Foto</label>
                             <input type="url"  name="foto" value={foto}  onChange={ (e) => handleOnChange(e) } className="form-control" required/>
                             
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
                                 <option value="">--SELECCIONAR MARCA-</option>

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

  )
}

 