import React, { useEffect, useState } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const UserAdminModal = () => {
	const { store, actions } = useGlobalReducer();
	const [users, setUsers] = useState([]);
	const [editing, setEditing] = useState(null);

	const fetchUsers = async () => {
		const response = await fetch(`${store.apiUrl}/api/users`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		});
		const data = await response.json();
		setUsers(data);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleDelete = async (id) => {
		if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
		await fetch(`${store.apiUrl}/api/users/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		});
		fetchUsers();
	};

	const handleUpdate = async (user) => {
		await fetch(`${store.apiUrl}/api/users/${user.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
			body: JSON.stringify(user),
		});
		setEditing(null);
		fetchUsers();
	};

	return (
		<div className="modal fade" id="userAdminModal" tabIndex="-1" aria-hidden="true">
			<div className="modal-dialog modal-lg modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Administrar Usuarios</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
					</div>
					<div className="modal-body">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>ID</th>
									<th>Email</th>
									<th>Activo</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user.id}>
										<td>{user.id}</td>
										<td>
											{editing === user.id ? (
												<input
													type="text"
													defaultValue={user.email}
													onChange={(e) => user.email = e.target.value}
												/>
											) : (
												user.email
											)}
										</td>
										<td>{user.is_active ? "Sí" : "No"}</td>
										<td>
											{editing === user.id ? (
												<button className="btn btn-sm btn-success me-1" onClick={() => handleUpdate(user)}>
													Guardar
												</button>
											) : (
												<button className="btn btn-sm btn-primary me-1" onClick={() => setEditing(user.id)}>
													Editar
												</button>
											)}
											<button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
												Eliminar
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
					</div>
				</div>
			</div>
		</div>
	);
};
