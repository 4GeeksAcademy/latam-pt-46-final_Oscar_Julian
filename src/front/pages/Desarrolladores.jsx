export const Desarrolladores = () => {
    const desarrolladores = [
        {
            id: 1,
            nombre: "Oscar Bolaños",
            pais: "Costa Rica",
            edad: 22,
            foto: "https://avatars.githubusercontent.com/u/192293537?s=400&u=2c3ea49098f051d8070a9e64f6757126a7a4a815&v=4",
            habilidades: [
                "JavaScript",
                "React.js",
                "Next.js",
                "Python",
                "HTML",
                "CSS",
                "Bootstrap",
                "Flask",
                "PostgreSQL",
                "SQL",
                "Photoshop",
                "Illustrator",
                "IA Generativa",
            ],
            metas: [
                "Convertirme en Full Stack Senior",
                "Contribuir a proyectos Open Source",
                "Aprender Ciencia de Datos",
                "Liderar un equipo de desarrollo",
                "Formar mi propia empresa de desarrollo"
            ],
            resumenPersonal: "Soy un joven desarrollador junior con una gran pasión por la tecnología y el fascinante mundo de los datos. Actualmente, me encuentro en mi etapa de estudiante, lo que me permite sumergirme de lleno en el aprendizaje y la experimentación constante. Me encanta desentrañar problemas, optimizar procesos y transformar ideas en soluciones funcionales y experiencias digitales innovadoras."
        },
        {
            id: 2,
            nombre: "Carlos Rodríguez",
            pais: "Argentina",
            edad: 29,
            foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            habilidades: [
                "JavaScript",
                "TypeScript",
                "Vue.js",
                "Express.js",
                "MongoDB",
                "Firebase"
            ],
            metas: [
                "Especializarme en arquitectura de software",
                "Crear mi propia startup tecnológica",
                "Mentorear a nuevos desarrolladores",
                "Obtener certificaciones en Cloud Computing"
            ],
            resumenPersonal: "Programador autodidacta con gran pasión por la tecnología y la innovación. Me fascina resolver problemas complejos y crear aplicaciones escalables. Cuando no estoy programando, me gusta tocar guitarra y practicar deportes al aire libre."
        }
    ];

    return (
        <div className="desarrolladores-container">
            <div className="container py-5">
                {/* Header de la página */}
                <div className="text-center mb-5">
                    <h1 className="display-4 text-primary fw-bold mb-3">
                        <i className="fa-solid fa-code me-3"></i>
                        Nuestro Equipo de Desarrollo
                    </h1>
                    <p className="lead text-white-50 mx-auto" style={{ maxWidth: "600px" }}>
                        Conoce a los desarrolladores apasionados que hacen posible esta plataforma
                    </p>
                    <div className="decorative-line mx-auto my-4" style={{
                        width: "100px",
                        height: "3px",
                        background: "linear-gradient(90deg, var(--primary), var(--accent))",
                        borderRadius: "2px"
                    }}></div>
                </div>

                {/* Cards de desarrolladores */}
                <div className="row g-4 justify-content-center">
                    {desarrolladores.map((dev, index) => (
                        <div key={dev.id} className="col-lg-6 col-xl-5">
                            <div className="developer-card h-100">
                                <div className="card border-0 shadow-lg h-100" style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px"
                                }}>
                                    {/* Header con foto y datos básicos */}
                                    <div className="card-header bg-transparent border-0 text-center pt-4">
                                        <div className="position-relative d-inline-block mb-3">
                                            <img
                                                src={dev.foto}
                                                alt={`Foto de ${dev.nombre}`}
                                                className="rounded-circle shadow-lg"
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    objectFit: "cover",
                                                    border: "4px solid rgba(255, 255, 255, 0.2)"
                                                }}
                                            />
                                            <div className="position-absolute bottom-0 end-0">
                                                <span className="badge bg-success rounded-circle p-2">
                                                    <i className="fa-solid fa-check" style={{ fontSize: "0.8rem" }}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-primary fw-bold mb-1">{dev.nombre}</h3>
                                        <p className="text-white-50 mb-2">
                                            <i className="fa-solid fa-map-marker-alt me-1"></i>
                                            {dev.pais}
                                            <span className="mx-2">•</span>
                                            <i className="fa-solid fa-calendar-alt me-1"></i>
                                            {dev.edad} años
                                        </p>
                                    </div>

                                    <div className="card-body px-4">
                                        {/* Habilidades */}
                                        <div className="mb-4">
                                            <h5 className="text-primary mb-3">
                                                <i className="fa-solid fa-tools me-2"></i>
                                                Habilidades Técnicas
                                            </h5>
                                            <div className="d-flex flex-wrap gap-2">
                                                {dev.habilidades.map((habilidad, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="badge bg-secondary px-3 py-2"
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            borderRadius: "15px",
                                                            background: "linear-gradient(45deg, #6c757d, #495057)"
                                                        }}
                                                    >
                                                        {habilidad}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Metas */}
                                        <div className="mb-4">
                                            <h5 className="text-primary mb-3">
                                                <i className="fa-solid fa-target me-2"></i>
                                                Metas Profesionales
                                            </h5>
                                            <ul className="list-unstyled">
                                                {dev.metas.map((meta, idx) => (
                                                    <li key={idx} className="mb-2 text-white-50">
                                                        <i className="fa-solid fa-chevron-right text-success me-2" style={{ fontSize: "0.8rem" }}></i>
                                                        {meta}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Resumen personal */}
                                        <div className="mb-3">
                                            <h5 className="text-primary mb-3">
                                                <i className="fa-solid fa-user me-2"></i>
                                                Sobre mí
                                            </h5>
                                            <p className="text-white-50 mb-0" style={{ lineHeight: "1.6" }}>
                                                {dev.resumenPersonal}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sección adicional */}
                <div className="text-center mt-5 pt-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="p-4 rounded-3" style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)"
                            }}>
                                <h4 className="text-primary mb-3">
                                    <i className="fa-solid fa-lightbulb me-2"></i>
                                    Nuestra Filosofía
                                </h4>
                                <p className="text-white-50 mb-0">
                                    Creemos en el poder de la tecnología para transformar la manera en que las personas
                                    interactúan con los libros y el conocimiento. Nuestro objetivo es crear experiencias
                                    digitales excepcionales que fomenten el amor por la lectura.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estilos adicionales */}
            <style jsx>{`
                .desarrolladores-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, var(--background) 0%, #1a2332 100%);
                    padding-top: 2rem;
                }

                .developer-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .developer-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
                }

                .developer-card .card {
                    transition: all 0.3s ease;
                }

                .developer-card:hover .card {
                    background: rgba(255, 255, 255, 0.08) !important;
                }

                .badge {
                    transition: all 0.3s ease;
                }

                .badge:hover {
                    transform: scale(1.05);
                }

                @media (max-width: 991.98px) {
                    .developer-card {
                        margin-bottom: 2rem;
                    }
                }

                @media (max-width: 767.98px) {
                    .desenvolvedor-container {
                        padding-top: 1rem;
                    }
                    
                    .card-body {
                        padding: 1.5rem !important;
                    }
                    
                    .display-4 {
                        font-size: 2rem !important;
                    }
                }
            `}</style>
        </div>
    );
};