import React from "react";
import { Link } from "react-router-dom";

export const Privacy = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card bg-transparent border-0 shadow-lg">
                        <div className="card-header bg-info text-white text-center py-4">
                            <h1 className="mb-0">
                                <i className="fa-solid fa-shield-alt me-2"></i>
                                Política de Privacidad
                            </h1>
                            <p className="mb-0 mt-2">Última actualización: 27 de Mayo, 2025</p>
                        </div>
                        <div className="card-body p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>

                            <div className="alert alert-info bg-transparent border-info" style={{ backgroundColor: 'rgba(23, 162, 184, 0.1) !important' }}>
                                <div className="d-flex">
                                    <div className="flex-shrink-0">
                                        <i className="fa-solid fa-info-circle fa-2x text-info"></i>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="text-info">Compromiso con tu Privacidad</h5>
                                        <p className="mb-0 text-white-50">
                                            En Mi Biblioteca Personal, tu privacidad es nuestra prioridad.
                                            Esta política explica claramente qué información recopilamos,
                                            cómo la usamos y cómo la protegemos.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">1. Información que Recopilamos</h2>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="card bg-transparent border-primary h-100">
                                            <div className="card-header bg-primary text-white">
                                                <h5 className="mb-0">
                                                    <i className="fa-solid fa-user me-2"></i>
                                                    Información Personal
                                                </h5>
                                            </div>
                                            <div className="card-body" style={{ backgroundColor: 'rgba(11, 28, 43, 0.1)' }}>
                                                <ul className="list-unstyled">
                                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white-50">Dirección de correo electrónico</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white-50">Contraseña encriptada</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white-50">Fecha de registro</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white-50">Preferencias de usuario</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="card bg-transparent border-success h-100">
                                            <div className="card-header bg-success text-white">
                                                <h5 className="mb-0">
                                                    <i className="fa-solid fa-book me-2"></i>
                                                    Información de Uso
                                                </h5>
                                            </div>
                                            <div className="card-body" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
                                                <ul className="list-unstyled">
                                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white-50">Libros agregados a tu biblioteca</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white-50">Reseñas y calificaciones</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white-50">Lista de favoritos</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white-50">Actividad de navegación</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">2. Cómo Usamos tu Información</h2>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <div className="text-center">
                                            <div className="bg-transparent border border-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                                                style={{ width: '80px', height: '80px', backgroundColor: 'rgba(11, 28, 43, 0.1)' }}>
                                                <i className="fa-solid fa-cogs fa-2x text-primary"></i>
                                            </div>
                                            <h5 className="text-white">Funcionalidad del Servicio</h5>
                                            <p className="text-white-50 small">
                                                Para proporcionar y mantener las funciones de la plataforma
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="text-center">
                                            <div className="bg-transparent border border-success rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                                                style={{ width: '80px', height: '80px', backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
                                                <i className="fa-solid fa-chart-line fa-2x text-success"></i>
                                            </div>
                                            <h5 className="text-white">Mejora del Servicio</h5>
                                            <p className="text-white-50 small">
                                                Para analizar el uso y mejorar la experiencia del usuario
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="text-center">
                                            <div className="bg-transparent border border-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                                                style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                                                <i className="fa-solid fa-envelope fa-2x text-warning"></i>
                                            </div>
                                            <h5 className="text-white">Comunicación</h5>
                                            <p className="text-white-50 small">
                                                Para enviarte actualizaciones importantes del servicio
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">3. Protección de Datos</h2>
                                <div className="card bg-transparent border-warning">
                                    <div className="card-header bg-warning text-dark">
                                        <h4 className="mb-0">
                                            <i className="fa-solid fa-shield-alt me-2"></i>
                                            Medidas de Seguridad Implementadas
                                        </h4>
                                    </div>
                                    <div className="card-body" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="text-white"><i className="fa-solid fa-lock text-success me-2"></i>Encriptación</h6>
                                                <ul className="text-white-50">
                                                    <li>Conexiones HTTPS en todo el sitio</li>
                                                    <li>Contraseñas encriptadas con algoritmos seguros</li>
                                                    <li>Tokens JWT para sesiones seguras</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="text-white"><i className="fa-solid fa-server text-primary me-2"></i>Infraestructura</h6>
                                                <ul className="text-white-50">
                                                    <li>Servidores seguros en AWS</li>
                                                    <li>Copias de seguridad automáticas</li>
                                                    <li>Acceso restringido a datos</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">4. Compartición de Información</h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card bg-transparent border-success h-100">
                                            <div className="card-header bg-success text-white text-center">
                                                <h5 className="mb-0">✅ Lo que SÍ compartimos</h5>
                                            </div>
                                            <div className="card-body" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
                                                <ul className="list-unstyled">
                                                    <li className="mb-2"><i className="fa-solid fa-eye text-success me-2"></i><span className="text-white-50">Libros que marcas como públicos</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-star text-success me-2"></i><span className="text-white-50">Reseñas que escribes</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-users text-success me-2"></i><span className="text-white-50">Tu nombre de usuario público</span></li>
                                                </ul>
                                                <small className="text-white-50">Solo información que eliges hacer pública</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card bg-transparent border-danger h-100">
                                            <div className="card-header bg-danger text-white text-center">
                                                <h5 className="mb-0">❌ Lo que NO compartimos</h5>
                                            </div>
                                            <div className="card-body" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                                                <ul className="list-unstyled">
                                                    <li className="mb-2"><i className="fa-solid fa-times text-danger me-2"></i><span className="text-white-50">Tu dirección de correo electrónico</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-times text-danger me-2"></i><span className="text-white-50">Tu biblioteca personal privada</span></li>
                                                    <li className="mb-2"><i className="fa-solid fa-times text-danger me-2"></i><span className="text-white-50">Información personal con terceros</span></li>
                                                </ul>
                                                <small className="text-white-50">Nunca vendemos ni alquilamos tus datos</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">5. Tus Derechos</h2>
                                <div className="card bg-transparent border-secondary" style={{ backgroundColor: 'rgba(108, 117, 125, 0.1)' }}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-3 text-center mb-3">
                                                <i className="fa-solid fa-download fa-2x text-primary mb-2"></i>
                                                <h6 className="text-white">Acceso</h6>
                                                <small className="text-white-50">Solicitar una copia de tus datos</small>
                                            </div>
                                            <div className="col-md-3 text-center mb-3">
                                                <i className="fa-solid fa-edit fa-2x text-success mb-2"></i>
                                                <h6 className="text-white">Corrección</h6>
                                                <small className="text-white-50">Actualizar información incorrecta</small>
                                            </div>
                                            <div className="col-md-3 text-center mb-3">
                                                <i className="fa-solid fa-trash fa-2x text-warning mb-2"></i>
                                                <h6 className="text-white">Eliminación</h6>
                                                <small className="text-white-50">Solicitar eliminar tu cuenta</small>
                                            </div>
                                            <div className="col-md-3 text-center mb-3">
                                                <i className="fa-solid fa-ban fa-2x text-danger mb-2"></i>
                                                <h6 className="text-white">Restricción</h6>
                                                <small className="text-white-50">Limitar el procesamiento</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">6. Cookies y Tecnologías Similares</h2>
                                <p className="text-white-50">Utilizamos cookies y tecnologías similares para:</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card bg-transparent border-info h-100">
                                            <div className="card-body">
                                                <h6 className="text-info">Cookies Esenciales</h6>
                                                <ul className="small text-white-50">
                                                    <li>Mantener tu sesión activa</li>
                                                    <li>Recordar tus preferencias</li>
                                                    <li>Funcionalidad básica del sitio</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card bg-transparent border-secondary h-100">
                                            <div className="card-body">
                                                <h6 className="text-secondary">Cookies de Análisis</h6>
                                                <ul className="small text-white-50">
                                                    <li>Entender cómo usas el sitio</li>
                                                    <li>Mejorar el rendimiento</li>
                                                    <li>Estadísticas anónimas</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">7. Retención de Datos</h2>
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped">
                                        <thead className="table-info">
                                            <tr>
                                                <th>Tipo de Datos</th>
                                                <th>Período de Retención</th>
                                                <th>Razón</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-white-50">Información de cuenta</td>
                                                <td className="text-white-50">Mientras la cuenta esté activa</td>
                                                <td className="text-white-50">Proporcionar servicios</td>
                                            </tr>
                                            <tr>
                                                <td className="text-white-50">Biblioteca personal</td>
                                                <td className="text-white-50">Mientras la cuenta esté activa</td>
                                                <td className="text-white-50">Funcionalidad principal</td>
                                            </tr>
                                            <tr>
                                                <td className="text-white-50">Reseñas públicas</td>
                                                <td className="text-white-50">Permanente (anonimizadas tras eliminar cuenta)</td>
                                                <td className="text-white-50">Valor para la comunidad</td>
                                            </tr>
                                            <tr>
                                                <td className="text-white-50">Datos de uso</td>
                                                <td className="text-white-50">2 años</td>
                                                <td className="text-white-50">Análisis y mejoras</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">8. Transferencias Internacionales</h2>
                                <div className="alert alert-warning bg-transparent border-warning" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1) !important' }}>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <i className="fa-solid fa-globe fa-2x text-warning"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="text-warning">Ubicación de Datos</h6>
                                            <p className="mb-0 text-white-50">
                                                Tus datos se almacenan en servidores seguros ubicados en Estados Unidos (AWS).
                                                Implementamos medidas de seguridad adecuadas para proteger tu información
                                                durante cualquier transferencia internacional.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">9. Cambios en esta Política</h2>
                                <p className="text-white-50">
                                    Podemos actualizar esta política de privacidad ocasionalmente. Cuando lo hagamos:
                                </p>
                                <ul className="text-white-50">
                                    <li>Actualizaremos la fecha de "última actualización" en la parte superior</li>
                                    <li>Te notificaremos sobre cambios significativos</li>
                                    <li>Publicaremos la nueva política en nuestro sitio web</li>
                                </ul>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-info mb-3">10. Menores de Edad</h2>
                                <div className="alert alert-info bg-transparent border-info" style={{ backgroundColor: 'rgba(23, 162, 184, 0.1) !important' }}>
                                    <p className="mb-0 text-white-50">
                                        <strong className="text-info">Importante:</strong> Nuestro servicio está dirigido a usuarios mayores de 13 años.
                                        No recopilamos conscientemente información personal de menores de 13 años.
                                        Si descubrimos que hemos recopilado información de un menor de 13 años,
                                        eliminaremos esa información inmediatamente.
                                    </p>
                                </div>
                            </section>

                            <div className="text-center mt-5 pt-4 border-top border-secondary">
                                <p className="text-white-50">
                                    Si tienes preguntas sobre esta política de privacidad, puedes contactarnos
                                    a través de nuestro centro de ayuda.
                                </p>
                                <Link to="/help" className="btn btn-info btn-lg">
                                    <i className="fa-solid fa-question-circle me-2"></i>
                                    Centro de Ayuda
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sección adicional de garantías */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="card bg-info text-white">
                                <div className="card-body text-center py-4">
                                    <h4 className="mb-3">Nuestras Garantías de Privacidad</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <div className="h-100">
                                                <i className="fa-solid fa-shield-alt fa-2x mb-2"></i>
                                                <h6>Datos Seguros</h6>
                                                <small>Encriptación de extremo a extremo</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="h-100">
                                                <i className="fa-solid fa-user-shield fa-2x mb-2"></i>
                                                <h6>Control Total</h6>
                                                <small>Tú decides qué compartir</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="h-100">
                                                <i className="fa-solid fa-eye-slash fa-2x mb-2"></i>
                                                <h6>Sin Venta de Datos</h6>
                                                <small>Nunca comercializamos tu información</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link to="/terms" className="btn btn-outline-light me-3">
                                            <i className="fa-solid fa-file-contract me-2"></i>
                                            Términos y Condiciones
                                        </Link>
                                        <Link to="/help" className="btn btn-outline-light">
                                            <i className="fa-solid fa-question-circle me-2"></i>
                                            Centro de Ayuda
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};