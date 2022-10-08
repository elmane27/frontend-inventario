import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import {
    getMarcas,
    createMarca,
    updateMarca,
    deleteMarca,
} from "../../services/marcaService";

export const MarcaView = () => {
    const [marcas, setMarcas] = useState([]);
    const [marca, setMarca] = useState({
        _id: 0,
        nombre: "",
        estado: "Activo",
    });

    const [modo, setModo] = useState("crear");

    const getMarcasFromApi = async () => {        
        const response = await getMarcas();
        setMarcas(response.data);
    };

    useEffect(() => {
        getMarcasFromApi();        
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMarca({ ...marca, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();        
        if (modo == "crear") {
            const response = await createMarca(marca);            
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Marca creada correctamente",
                    showConfirmButton: false,
                    timer: 1500,
                });                
                getMarcasFromApi();                
                setMarca({
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
            const response = await updateMarca(marca._id, marca);
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Marca actualizada correctamente",
                    showConfirmButton: false,
                    timer: 1500,
                });
                getMarcasFromApi();
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
                deleteMarca(id).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        Swal.fire(
                            "Eliminado",
                            "El registro ha sido eliminado",
                            "success"
                        );
                        getMarcasFromApi();
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
                    <h3 className="card-title">Marcas</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">                            
                            {modo === "crear" ? (
                                <h3>Crear marca</h3>
                            ) : (
                                <h3>Editar marca</h3>
                            )}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={marca.nombre}
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
                                        value={marca.estado}
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
                                {marcas.map((marca, index) => (
                                    <tr key={marca._id}>
                                        <td>{index + 1}</td>
                                        <td>{marca.nombre}</td>
                                        <td>{marca.estado}</td>
                                        <td>
                                            {dayjs(marca.fechaCreacion).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>
                                            {dayjs(
                                                marca.fechaActualizacion
                                            ).format("DD/MM/YYYY")}
                                        </td>
                                        <td>
                                            <button className="btn btn-primary mx-2" onClick={() => {
                                                setModo("editar");
                                                setMarca(marca);
                                            }}>
                                                Editar
                                            </button>                                 
                                            <button className="btn btn-danger mx-2" onClick={() => {
                                                eliminar(marca._id);
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
