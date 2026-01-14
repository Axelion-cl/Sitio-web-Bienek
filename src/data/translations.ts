// Translations for the Bienek website
// Organized by section for easy maintenance

export type Language = 'es' | 'en';

export const translations = {
    es: {
        // Header - Utility Bar
        header: {
            idioma: 'Idioma',
            empresa: 'Empresa',
            bolsaTrabajo: 'Bolsa de Trabajo',
            cobertura: 'Cobertura:',
            coberturaValue: 'RM - X Región.',
            horario: 'Horario de atención:',
            horarioValue: '8:00 a 18:00 hrs',
            // Main Menu
            inicio: 'Inicio',
            soluciones: 'Soluciones',
            promociones: 'Promociones',
            blogTecnico: 'Blog Técnico',
            accesoClientes: 'Acceso Clientes',
            contactenos: 'CONTACTENOS',
            salir: 'Salir',
            // Search
            buscar: 'Encuentra lo que estás buscando...',
            lideresDistribucion: 'Líderes en Distribución de productos de Higiene',
        },
        // Footer
        footer: {
            casaMatriz: 'Casa Matriz',
            contacto: 'Contacto',
            informacionUtil: 'Información útil',
            blog: 'Blog',
            soluciones: 'Soluciones',
            trabajaConNosotros: 'Trabaja Con Nosotros',
            derechos: '© 2024 Bienek. Todos los derechos reservados.',
        },
        // Login Page
        login: {
            titulo: 'Acceso Clientes',
            subtitulo: 'Accede a tu cuenta de Bienek',
            correo: 'Correo Electrónico',
            contrasena: 'Contraseña',
            olvidasteContrasena: '¿Olvidaste tu contraseña?',
            iniciarSesion: 'Iniciar Sesión',
            credencialesPrueba: 'Credenciales de prueba:',
        },
        // Mi Cuenta
        miCuenta: {
            titulo: 'Mi Cuenta:',
            bienvenido: 'Bienvenido de nuevo,',
            misProductos: 'Mis Productos',
            misOrdenes: 'Mis Ordenes',
            miPerfil: 'Mi Perfil',
            carritoVacio: 'Tu carrito está vacío',
            agregaProductos: 'Agrega productos para verlos aquí',
            revisaProductos: 'Revisa los productos que has agregado a tu carrito.',
            revisaOrdenes: 'Revisa el estado de tus solicitudes de cotización',
            noTienesPedidos: 'No tienes pedidos',
            tusPedidosApareceran: 'Tus pedidos aparecerán aquí',
            orden: 'Orden:',
            fecha: 'Fecha:',
            informacionPersonal: 'Información Personal',
            actualizaInfo: 'Actualiza la información donde quieres que te contactemos.',
            nombre: 'Nombre:',
            correoElectronico: 'Correo Electrónico:',
            empresaLabel: 'Empresa:',
            telefono: 'Teléfono:',
            editarInfo: 'Editar información de contacto',
            guardarCambios: 'Guardar cambios',
            cancelar: 'Cancelar',
            cambiarContrasena: 'Cambiar Contraseña',
            cambiarMiContrasena: 'Cambiar mi contraseña',
            contrasenaActual: 'Contraseña actual:',
            nuevaContrasena: 'Nueva contraseña:',
            confirmarContrasena: 'Confirmar nueva contraseña:',
            actualizarContrasena: 'Actualizar contraseña',
        },
        // Products
        productos: {
            agregar: 'Agregar',
            agregado: 'Agregado',
            masInfo: 'Mas Info',
            marca: 'MARCA:',
        },
        // Home
        home: {
            marcasDestacadas: 'Marcas Destacadas',
        },
    },
    en: {
        // Header - Utility Bar
        header: {
            idioma: 'Language',
            empresa: 'Company',
            bolsaTrabajo: 'Job Board',
            cobertura: 'Coverage:',
            coberturaValue: 'RM - X Region.',
            horario: 'Business Hours:',
            horarioValue: '8:00 AM to 6:00 PM',
            // Main Menu
            inicio: 'Home',
            soluciones: 'Solutions',
            promociones: 'Promotions',
            blogTecnico: 'Technical Blog',
            accesoClientes: 'Client Access',
            contactenos: 'CONTACT US',
            salir: 'Logout',
            // Search
            buscar: 'Find what you are looking for...',
            lideresDistribucion: 'Leaders in Hygiene Product Distribution',
        },
        // Footer
        footer: {
            casaMatriz: 'Headquarters',
            contacto: 'Contact',
            informacionUtil: 'Useful Information',
            blog: 'Blog',
            soluciones: 'Solutions',
            trabajaConNosotros: 'Work With Us',
            derechos: '© 2024 Bienek. All rights reserved.',
        },
        // Login Page
        login: {
            titulo: 'Client Access',
            subtitulo: 'Access your Bienek account',
            correo: 'Email Address',
            contrasena: 'Password',
            olvidasteContrasena: 'Forgot your password?',
            iniciarSesion: 'Log In',
            credencialesPrueba: 'Test credentials:',
        },
        // Mi Cuenta
        miCuenta: {
            titulo: 'My Account:',
            bienvenido: 'Welcome back,',
            misProductos: 'My Products',
            misOrdenes: 'My Orders',
            miPerfil: 'My Profile',
            carritoVacio: 'Your cart is empty',
            agregaProductos: 'Add products to see them here',
            revisaProductos: 'Review the products you have added to your cart.',
            revisaOrdenes: 'Check the status of your quote requests',
            noTienesPedidos: 'You have no orders',
            tusPedidosApareceran: 'Your orders will appear here',
            orden: 'Order:',
            fecha: 'Date:',
            informacionPersonal: 'Personal Information',
            actualizaInfo: 'Update the information where you want us to contact you.',
            nombre: 'Name:',
            correoElectronico: 'Email:',
            empresaLabel: 'Company:',
            telefono: 'Phone:',
            editarInfo: 'Edit contact information',
            guardarCambios: 'Save changes',
            cancelar: 'Cancel',
            cambiarContrasena: 'Change Password',
            cambiarMiContrasena: 'Change my password',
            contrasenaActual: 'Current Password:',
            nuevaContrasena: 'New Password:',
            confirmarContrasena: 'Confirm New Password:',
            actualizarContrasena: 'Update Password',
        },
        // Products
        productos: {
            agregar: 'Add',
            agregado: 'Added',
            masInfo: 'More Info',
            marca: 'BRAND:',
        },
        // Home
        home: {
            marcasDestacadas: 'Featured Brands',
        },
    },
};

export type TranslationKeys = typeof translations.es;
