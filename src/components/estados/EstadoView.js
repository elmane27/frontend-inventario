import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import {
    getEstados,
    createEstado,
    updateEstado,
    deleteEstado,
} from "../../services/estadoEquipoService";

export const EstadoView = () => {
    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState({
        _id: 0,
        nombre: "",
        estado: "Activo",
    });

    const [modo, setModo] = useState("crear");

    const getEstadosFromApi = async () => {        
        const response = await getEstados();
        setEstados(response.data);
    };

    useEffect(() => {
        getEstadosFromApi();        
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEstado({ ...estado, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();        
        if (modo === "crear") {
            const response = await createEstado(estado);
            console.log(response.status)
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Estado de equipo creado",
                    showConfirmButton: false,
                    timer: 1500,
                });                
                getEstadosFromApi();                
                setEstado({
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
            const response = await updateEstado(estado._id, estado);
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Estado de equipo actualizado",
                    showConfirmButton: false,
                    timer: 1500,
                });
                getEstadosFromApi();
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
                deleteEstado(id).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        Swal.fire(
                            "Eliminado",
                            "El registro ha sido eliminado",
                            "success"
                        );
                        getEstadosFromApi();
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
                    <h3 className="card-title">Estados</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">                            
                            {modo === "crear" ? (
                                <h3>Crear estado</h3>
                            ) : (
                                <h3>Editar estado</h3>
                            )}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={estado.nombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="estado">Estado</label>
                                    <select
                                        className="form-control"
                                        id="estado"
                                        name="estado"
                                        value={estado.estado}
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
                    <h3 className="card-title">Lista de Estados</h3>
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
                                {estados.map((estado, index) => (
                                    <tr key={estado._id}>
                                        <td>{index + 1}</td>
                                        <td>{estado.nombre}</td>
                                        <td>{estado.estado}</td>
                                        <td>
                                            {dayjs(estado.fechaCreacion).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>
                                            {dayjs(
                                                estado.fechaActualizacion
                                            ).format("DD/MM/YYYY")}
                                        </td>
                                        <td>
                                            <button className="btn btn-primary mx-2" onClick={() => {
                                                setModo("editar");
                                                setEstado(estado);
                                            }}>
                                                Editar
                                            </button>                                 
                                            <button className="btn btn-danger mx-2" onClick={() => {
                                                eliminar(estado._id);
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
