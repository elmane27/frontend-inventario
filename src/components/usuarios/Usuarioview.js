import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} from "../../services/usuarioService";

export const UsuarioView = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({
        _id: 0,
        nombre: "",
        email: "",
        estado: "Activo",
    });

    const limpiarFormulario = () => {
        setUsuario({
            _id: 0,
            nombre: "",
            email: "",
            estado: "Activo",
        });
    }

    const [modo, setModo] = useState("crear");

    const getUsuariosFromApi = async () => {        
        const response = await getUsuarios();
        setUsuarios(response.data);
    };

    useEffect(() => {
        getUsuariosFromApi();        
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();        
        if (modo == "crear") {
            const response = await createUsuario(usuario);
            console.log(response.status)
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario creado",
                    showConfirmButton: false,
                    timer: 1500,
                });                
                limpiarFormulario();
                getUsuariosFromApi();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salió mal!"
                });    
            }
        } else {
            const response = await updateUsuario(usuario._id, usuario);
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario actualizado",
                    showConfirmButton: false,
                    timer: 1500,
                });
                limpiarFormulario();
                getUsuariosFromApi();
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
                deleteUsuario(id).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        Swal.fire(
                            "Eliminado",
                            "El registro ha sido eliminado",
                            "success"
                        );
                        getUsuariosFromApi();
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
                    <h3 className="card-title">Usuarios</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">                            
                            {modo === "crear" ? (
                                <h3>Crear usuario</h3>
                            ) : (
                                <h3>Editar usuario</h3>
                            )}
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={usuario.nombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={usuario.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="estado">Estado</label>
                                    <select
                                        className="form-control"
                                        id="estado"
                                        name="estado"
                                        value={usuario.estado}
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
                                {usuarios.map((usuario, index) => (
                                    <tr key={usuario._id}>
                                        <td>{index + 1}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.estado}</td>
                                        <td>
                                            {dayjs(usuario.fechaCreacion).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>
                                            {dayjs(
                                                usuario.fechaActualizacion
                                            ).format("DD/MM/YYYY")}
                                        </td>
                                        <td>
                                            <button className="btn btn-primary mx-2" onClick={() => {
                                                setModo("editar");
                                                setUsuario(usuario);
                                            }}>
                                                Editar
                                            </button>                                 
                                            <button className="btn btn-danger mx-2" onClick={() => {
                                                eliminar(usuario._id);
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
