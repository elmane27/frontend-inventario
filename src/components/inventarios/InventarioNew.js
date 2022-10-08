import React, { useState, useEffect } from "react";
import { getUsuarios } from "../../services/usuarioService";
import { getMarcas } from "../../services/marcaService";
import { getTiposEquipos } from "../../services/tipoEquipoService";
import { getEstados } from "../../services/estadoEquipoService";
import { createInventario } from "../../services/inventarioService";
import Swal from "sweetalert2";

export const InventarioNew = ({ handleOpenModal, listarInventarios }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [inventario, setInventario] = useState({
        serial: "",
        modelo: "",
        descripcion: "",
        foto: "",
        fechaCompra: "",
        precio: 0,
        usuario: "",
        marca: "",
        tipoEquipo: "",
        estadoEquipo: "",
    });

    const listarUsuario = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);
        } catch (eror) {
            console.log(eror);
        }
    };

    useEffect(() => {
        listarUsuario();
    }, []);

    const listarMarcas = async () => {
        try {
            const { data } = await getMarcas();
            setMarcas(data);
        } catch (eror) {
            console.log(eror);
        }
    };

    useEffect(() => {
        listarMarcas();
    }, []);

    const listarTipos = async () => {
        try {
            const { data } = await getTiposEquipos();
            setTipos(data);
        } catch (eror) {
            console.log(eror);
        }
    };

    useEffect(() => {
        listarTipos();
    }, []);

    const listarEstados = async () => {
        try {
            const { data } = await getEstados();
            setEstados(data);
        } catch (eror) {
            console.log(eror);
        }
    };

    useEffect(() => {
        listarEstados();
    }, []);

    const handleOnChange = (event) => {        
        setInventario({
            ...inventario,
            [event.target.name]: event.target.value,
        });
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createInventario(inventario);
            if (response.status === 200) {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Inventario creado",
                    showConfirmButton: false,
                    timer: 1500,
                });
                handleOpenModal();
                listarInventarios();                
            } else {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error al crear inventario",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sidebar new">
            <div className="container-fluid">
                <div className="sidebar-header">
                    <div className="row">                        
                        <div className="col-md-6 text-left">
                            <h3>Nuevo inventario</h3>
                        </div>
                        <div className="col-md-6 text-end">
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleOpenModal}
                            ></button>
                        </div>                        
                    </div>                    
                </div>
                <div className="row">
                    <div className="col">
                        <hr />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input
                                    type="text"
                                    name="serial"
                                    value={inventario.serial}
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Modelo</label>
                                <input
                                    type="text"
                                    name="modelo"
                                    value={inventario.modelo}
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">
                                    Descripcion
                                </label>
                                <input
                                    type="text"
                                    name="descripcion"
                                    value={inventario.descripcion}
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <select
                                    name="color"
                                    value={inventario.color}
                                    onChange={handleOnChange}
                                    className="form-select"
                                    required
                                >
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
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Foto</label>
                                <input
                                    type="url"
                                    name="foto"
                                    value={inventario.foto}
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">
                                    Fecha Compra
                                </label>
                                <input
                                    type="date"
                                    name="fechaCompra"
                                    value={inventario.fechaCompra}
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={inventario.precio}
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={handleOnChange}
                                    name="usuario"
                                    value={inventario.usuario._id}
                                    required
                                >
                                    <option value="">--SELECCIONAR USUARIO--</option>
                                    {usuarios.map((usuario) => (
                                        <option key={usuario._id} value={usuario._id}>
                                            {usuario.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Marca</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={handleOnChange}
                                    name="marca"
                                    value={inventario.marca._id}
                                    required
                                >
                                    <option value="">--SELECCIONAR MARCA--</option>
                                    {marcas.map((marca) => (
                                        <option key={marca._id} value={marca._id}>
                                            {marca.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">
                                    Tipo Equipo
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={handleOnChange}
                                    name="tipoEquipo"
                                    value={inventario.tipoEquipo._id}
                                    required
                                >
                                    <option value="">--SELECCIONAR TIPO EQUIPO--</option>
                                    {tipos.map((tipo) => (
                                        <option key={tipo._id} value={tipo._id}>
                                            {tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">
                                    Estado equipo
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={handleOnChange}
                                    name="estadoEquipo"
                                    value={inventario.estadoEquipo._id}
                                    required
                                >
                                    <option value="">--SELECCIONAR ESTADO EQUIPO--</option>
                                    {estados.map((estado) => (
                                        <option key={estado._id} value={estado._id}>
                                            {estado.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
