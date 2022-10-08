import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import {
    getTiposEquipos,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo,
} from "../../services/tipoEquipoService";

export const TipoView = () => {
    const [tipos, setTipos] = useState([]);
    const [tipo, setTipo] = useState({
        _id: 0,
        nombre: "",
        estado: "Activo",
    });

    const [modo, setModo] = useState("crear");

    const getTiposFromApi = async () => {        
        const response = await getTiposEquipos();
        setTipos(response.data);
    };

    useEffect(() => {
        getTiposFromApi();        
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTipo({ ...tipo, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();        
        if (modo === "crear") {
            const response = await createTipoEquipo(tipo);
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Tipo de equipo creado",
                    showConfirmButton: false,
                    timer: 1500,
                });                
                getTiposFromApi(); 
                setTipo({
                    _id: 0,
                    nombre: "",
                    estado: "Activo",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salió mal!"
                });    
            }
        } else {
            const response = await updateTipoEquipo(tipo._id, tipo);
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Tipo de equipo actualizado",
                    showConfirmButton: false,
                    timer: 1500,
                });                
                getTiposFromApi();
                setTipo({
                    _id: 0,
                    nombre: "",
                    estado: "Activo",
                });
                setModo("crear");
            }                    
        }
    };

    const eliminar = async (id) => {        
        Swal.fire({
            title: "¿Está seguro?",
            text: "Se eliminará el registro",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTipoEquipo(id).then((res) => {                    
                    if (res.status === 200) {
                        Swal.fire(
                            "Eliminado",
                            "El registro ha sido eliminado",
                            "success"
                        );
                        getTiposFromApi();
                    } else {
                        Swal.fire(
                            "Error",
                            "El registro no ha sido eliminado",
                            "error"
                        );
                    }  
                });
            }
        });
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Tipos</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">                            
                            {modo === "crear" ? (
                                <h3>Crear tipo de equipo</h3>
                            ) : (
                                <h3>Editar tipo de equipo</h3>
                            )}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={tipo.nombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="estado">Tipo</label>
                                    <select
                                        className="form-control"
                                        id="estado"
                                        name="estado"
                                        value={tipo.estado}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>                                
                            </div>                            
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                        >
                            Guardar
                        </button>                            
                    </form>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Lista de Tipos</h3>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Creación</th>
                                    <th>Actualización</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tipos.map((tipo, index) => (
                                    <tr key={tipo._id}>
                                        <td>{index + 1}</td>
                                        <td>{tipo.nombre}</td>
                                        <td>{tipo.estado}</td>
                                        <td>
                                            {dayjs(tipo.fechaCreacion).format("DD/MM/YYYY")}
                                        </td>
                                        <td>
                                            {dayjs(tipo.fechaActualizacion).format("DD/MM/YYYY")}
                                        </td>
                                        <td>
                                            <button className="btn btn-primary mx-2" onClick={() => {
                                                setModo("editar");
                                                setTipo(tipo);
                                            }}>
                                                Editar
                                            </button>                                 
                                            <button className="btn btn-danger mx-2" onClick={() => {
                                                eliminar(tipo._id);
                                            }}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
