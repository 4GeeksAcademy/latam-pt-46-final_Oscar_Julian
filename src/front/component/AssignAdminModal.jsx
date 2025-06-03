import { useEffect, useState } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const AssignAdminModal = () => {
    const { store, actions } = useGlobalReducer();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${store.apiUrl}/api/users`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            
            if (!response.ok) {
                throw new Error("Error al cargar usuarios");
            }
            
            const data = await response.json();
            console.log(data);
            
            setUsers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const assignAdmin = async (userId) => {
        if (!window.confirm("¿Estás seguro de asignar a este usuario como administrador?")) return;
        
        try {
            setLoading(true);
            
            // Actualizar el rol del usuario usando la ruta PUT /users/:id
            const response = await fetch(`${store.apiUrl}/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify({ rol: 1 })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al asignar administrador");
            }
            
            setSuccessMessage("¡Administrador asignado exitosamente!");
            setTimeout(() => {
                document.getElementById('closeAssignAdminModal').click();
                window.location.reload(); // Recargar para actualizar el estado
            }, 1500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar usuarios que no son administradores (rol !== 1)
    const nonAdminUsers = users.filter(user => user.rol !== 1);

    return (
        <div className="modal fade" id="assignAdminModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Asignar Administrador</h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            data-bs-dismiss="modal" 
                            aria-label="Cerrar"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {successMessage ? (
                            <div className="alert alert-success text-center">
                                <i className="fa-solid fa-check-circle me-2"></i>
                                {successMessage}
                            </div>
                        ) : error ? (
                            <div className="alert alert-danger text-center">
                                <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                {error}
                            </div>
                        ) : loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando usuarios...</span>
                                </div>
                                <p className="mt-2">Cargando lista de usuarios...</p>
                            </div>
                        ) : nonAdminUsers.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                <i className="fa-solid fa-exclamation-triangle me-2"></i>
                                No hay usuarios disponibles para asignar como administradores
                            </div>
                        ) : (
                            <>
                                <div className="alert alert-info">
                                    <i className="fa-solid fa-info-circle me-2"></i>
                                    Por favor, seleccione un usuario para asignar como administrador.
                                </div>
                                
                                <table className="table table-striped table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>Fecha de Registro</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nonAdminUsers.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => assignAdmin(user.id)}
                                                        disabled={loading}
                                                    >
                                                        <i className="fa-solid fa-crown me-1"></i>
                                                        Asignar Admin
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            data-bs-dismiss="modal"
                            id="closeAssignAdminModal"
                        >
                            <i className="fa-solid fa-xmark me-1"></i>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};