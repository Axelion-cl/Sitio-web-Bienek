export interface Solution {
    title: string;
    slug: string;
    image: string;
    subcategories: string[];
}

export const solutions: Solution[] = [
    {
        title: "Soluciones Generales de Higiene",
        slug: "soluciones-generales-de-higiene",
        image: "/assets/images/solutions/jardines.webp",
        subcategories: ["Limpieza de Pisos", "Desinfección", "Baños", "Aromas"]
    },
    {
        title: "Soluciones Especializadas sector Industrial y Almacenaje",
        slug: "soluciones-especializadas-sector-industrial-y-almacenaje",
        image: "/assets/images/solutions/industria.webp",
        subcategories: ["Desengrasantes", "Limpiadores Industriales", "Absorbentes", "Protección Personal"]
    },
    {
        title: "Soluciones Especializadas sector Institucional",
        slug: "soluciones-especializadas-sector-institucional",
        image: "/assets/images/solutions/oficinas.webp",
        subcategories: ["Limpieza General", "Papelería", "Baños Públicos", "Alfombras"]
    },
    {
        title: "Soluciones Especializadas sector Educación",
        slug: "soluciones-especializadas-sector-educacion",
        image: "/assets/images/solutions/educacion.webp",
        subcategories: ["Aulas", "Baños y Vestidores", "Patios", "Comedores"]
    },
    {
        title: "Soluciones Generales para sector Salud",
        slug: "soluciones-especializadas-sector-salud",
        image: "/assets/images/solutions/salud.webp",
        subcategories: ["Desinfección Hospitalaria", "Esterilización", "Cuidado de Pacientes", "Áreas Críticas"]
    },
    {
        title: "Soluciones Generales para sector HORECA",
        slug: "soluciones-especializadas-sector-horeca",
        image: "/assets/images/solutions/horeca.webp",
        subcategories: ["Cocina", "Limpieza de Mesas", "Lavandería", "Baños"]
    },
    {
        title: "Soluciones Especializadas sector Veterinario",
        slug: "soluciones-especializadas-sector-veterinario",
        image: "/assets/images/solutions/veterinaria.webp",
        subcategories: ["Desinfección de Jaulas", "Quirófanos", "Salas de Espera", "Control de Olores"]
    },
    {
        title: "Equipamiento Accesorios",
        slug: "equipamiento-accesorios",
        image: "/assets/images/solutions/limpieza-general.webp",
        subcategories: ["Mopas y Carros", "Paños", "Escobas", "Señalética"]
    },
    {
        title: "Artículos de Oficina",
        slug: "articulos-de-oficina",
        image: "/assets/images/solutions/articulos-oficina.webp",
        subcategories: ["Papelería", "Escritorio", "Archivado", "Tecnología"] // Added subcategories to match interface
    },
    {
        title: "Equipamientos de Maquinaria",
        slug: "equipamientos-de-maquinaria",
        image: "/assets/images/solutions/maquinaria.webp",
        subcategories: ["Aspiradoras", "Abrillantadoras", "Barredoras", "Hidrolavadoras"]
    },
    {
        title: "Tratamiento de Aguas",
        slug: "tratamiento-de-agua",
        image: "/assets/images/solutions/aguas.webp",
        subcategories: ["Cloración", "Filtración", "Medición", "Bombas"]
    },
    {
        title: "Soluciones para Embarcaciones",
        slug: "soluciones-para-embarcaciones",
        image: "/assets/images/solutions/embarcaciones.webp",
        subcategories: ["Limpieza de Cascos", "Interiores", "Motores", "Desengrasantes"]
    },
];
