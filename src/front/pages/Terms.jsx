import React from "react";
import { Link } from "react-router-dom";

export const Terms = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card bg-transparent border-0 shadow-lg">
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h1 className="mb-0">
                                <i className="fa-solid fa-file-contract me-2"></i>
                                Términos y Condiciones
                            </h1>
                            <p className="mb-0 mt-2">Última actualización: 27 de Mayo, 2025</p>
                        </div>
                        <div className="card-body p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <section className="mb-5">
                                <h2 className="text-primary mb-3">1. Aceptación de los Términos</h2>
                                <p className="text-white-50">
                                    Al acceder y utilizar Mi Biblioteca Personal, usted acepta estar sujeto a estos
                                    términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos
                                    términos, no debe utilizar nuestro servicio.
                                </p>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">2. Descripción del Servicio</h2>
                                <p className="text-white-50">
                                    Mi Biblioteca Personal es una plataforma digital que permite a los usuarios:
                                </p>
                                <ul className="list-unstyled ms-3">
                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white">Organizar su colección personal de libros</span></li>
                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white">Explorar libros de dominio público</span></li>
                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white">Escribir y leer reseñas de libros</span></li>
                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white">Crear listas de favoritos</span></li>
                                    <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i><span className="text-white">Compartir su biblioteca con otros usuarios</span></li>
                                </ul>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">3. Registro de Cuenta</h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card bg-transparent border-info h-100">
                                            <div className="card-header bg-info text-white">
                                                <h5 className="mb-0">Responsabilidades del Usuario:</h5>
                                            </div>
                                            <div className="card-body" style={{ backgroundColor: 'rgba(23, 162, 184, 0.1)' }}>
                                                <ul className="text-white-50">
                                                    <li>Proporcionar información veraz y actualizada</li>
                                                    <li>Mantener la confidencialidad de su contraseña</li>
                                                    <li>Ser responsable de toda actividad en su cuenta</li>
                                                    <li>Notificar inmediatamente cualquier uso no autorizado</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card bg-transparent border-success h-100">
                                            <div className="card-header bg-success text-white">
                                                <h5 className="mb-0">Compromisos de la Plataforma:</h5>
                                            </div>
                                            <div className="card-body" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
                                                <ul className="text-white-50">
                                                    <li>Proteger su información personal</li>
                                                    <li>Mantener la seguridad de nuestros servidores</li>
                                                    <li>Proporcionar acceso continuo al servicio</li>
                                                    <li>Respetar sus derechos de privacidad</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">4. Uso Aceptable</h2>
                                <div className="alert alert-success bg-transparent border-success" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1) !important' }}>
                                    <h5 className="text-success"><i className="fa-solid fa-info-circle me-2"></i>Está Permitido:</h5>
                                    <ul className="mb-0 text-white-50">
                                        <li>Agregar libros de su propiedad personal</li>
                                        <li>Escribir reseñas honestas y constructivas</li>
                                        <li>Compartir su biblioteca de forma pública</li>
                                        <li>Explorar y descargar libros de dominio público</li>
                                    </ul>
                                </div>
                                <div className="alert alert-danger bg-transparent border-danger mt-3" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1) !important' }}>
                                    <h5 className="text-danger"><i className="fa-solid fa-exclamation-triangle me-2"></i>Está Prohibido:</h5>
                                    <ul className="mb-0 text-white-50">
                                        <li>Subir contenido protegido por derechos de autor sin autorización</li>
                                        <li>Usar el servicio para actividades ilegales</li>
                                        <li>Crear múltiples cuentas para evadir restricciones</li>
                                        <li>Interferir con el funcionamiento del servicio</li>
                                        <li>Publicar contenido ofensivo, discriminatorio o spam</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">5. Propiedad Intelectual</h2>
                                <p className="text-white-50">
                                    Respetamos los derechos de propiedad intelectual. Los usuarios son responsables
                                    de asegurar que tienen los derechos necesarios para cualquier contenido que suban
                                    a la plataforma.
                                </p>
                                <div className="bg-transparent border border-warning p-3 rounded" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                                    <strong className="text-warning">Nota Importante:</strong>
                                    <span className="text-white-50"> Los libros disponibles en nuestra sección de
                                        exploración son de dominio público y pueden descargarse libremente. Para libros
                                        personales, usted mantiene todos los derechos sobre su contenido.</span>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">6. Privacidad y Datos</h2>
                                <p className="text-white-50">
                                    Su privacidad es importante para nosotros. Recopilamos únicamente la información
                                    necesaria para proporcionar nuestros servicios:
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card bg-transparent border-primary h-100">
                                            <div className="card-body">
                                                <h6 className="card-title text-primary">Datos que Recopilamos:</h6>
                                                <ul className="small text-white-50">
                                                    <li>Dirección de correo electrónico</li>
                                                    <li>Información de libros agregados</li>
                                                    <li>Reseñas y calificaciones</li>
                                                    <li>Preferencias de usuario</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card bg-transparent border-success h-100">
                                            <div className="card-body">
                                                <h6 className="card-title text-success">Cómo los Usamos:</h6>
                                                <ul className="small text-white-50">
                                                    <li>Proporcionar funcionalidad del servicio</li>
                                                    <li>Mejorar la experiencia del usuario</li>
                                                    <li>Comunicaciones importantes del servicio</li>
                                                    <li>Análisis estadísticos anónimos</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">7. Limitación de Responsabilidad</h2>
                                <p className="text-white-50">
                                    Mi Biblioteca Personal se proporciona "tal como está". No garantizamos que el
                                    servicio será ininterrumpido o libre de errores. No seremos responsables por
                                    daños indirectos, incidentales o consecuentes.
                                </p>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">8. Terminación del Servicio</h2>
                                <p className="text-white-50">
                                    Podemos suspender o terminar su acceso al servicio en caso de violación de estos
                                    términos. Usted puede eliminar su cuenta en cualquier momento desde la configuración
                                    de su perfil.
                                </p>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">9. Modificaciones</h2>
                                <p className="text-white-50">
                                    Nos reservamos el derecho de modificar estos términos en cualquier momento.
                                    Los cambios importantes serán notificados a los usuarios con al menos 30 días
                                    de anticipación.
                                </p>
                            </section>

                            <section className="mb-5">
                                <h2 className="text-primary mb-3">10. Ley Aplicable</h2>
                                <p className="text-white-50">
                                    Estos términos se rigen por las leyes de Costa Rica. Cualquier disputa será
                                    resuelta en los tribunales competentes de Heredia, Costa Rica.
                                </p>
                            </section>

                            <div className="text-center mt-5 pt-4 border-top border-secondary">
                                <p className="text-white-50">
                                    Si tiene preguntas sobre estos términos, puede revisarlos nuevamente o
                                    consultar nuestra sección de ayuda.
                                </p>
                                <Link to="/" className="btn btn-primary btn-lg">
                                    <i className="fa-solid fa-home me-2"></i>
                                    Volver al Inicio
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sección adicional de resumen */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="card bg-primary text-white">
                                <div className="card-body text-center py-4">
                                    <h4 className="mb-3">Resumen de Términos Clave</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <div className="h-100">
                                                <i className="fa-solid fa-shield-alt fa-2x mb-2"></i>
                                                <h6>Protección de Datos</h6>
                                                <small>Tu información está segura y protegida</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="h-100">
                                                <i className="fa-solid fa-handshake fa-2x mb-2"></i>
                                                <h6>Uso Responsable</h6>
                                                <small>Compromiso mutuo para una experiencia positiva</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="h-100">
                                                <i className="fa-solid fa-book-open fa-2x mb-2"></i>
                                                <h6>Acceso Libre</h6>
                                                <small>Miles de libros gratuitos a tu disposición</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link to="/privacy" className="btn btn-outline-light me-3">
                                            <i className="fa-solid fa-shield-alt me-2"></i>
                                            Política de Privacidad
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