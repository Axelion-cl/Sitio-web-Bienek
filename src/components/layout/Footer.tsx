import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-16 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-gray-600 font-sans">

                {/* Columna 1: Casa Matriz */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Image src="/assets/icons/casa-matriz.svg" alt="Casa Matriz" width={24} height={24} />
                        <h3 className="font-bold text-black text-base">Casa Matriz</h3>
                    </div>
                    <div className="pl-8 space-y-1">
                        <p>Juan Sebastián Elcano 1910,</p>
                        <p>Parque Industrial San Andrés</p>
                        <p>Hualpén / Concepción / Chile</p>
                    </div>
                </div>

                {/* Columna 2: Contacto */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Image src="/assets/icons/telefono.svg" alt="Contacto" width={24} height={24} />
                        <h3 className="font-bold text-black text-base">Contacto</h3>
                    </div>
                    <div className="pl-8 space-y-2">
                        <p><span className="font-medium text-black">Teléfono:</span> +56 41-2635500</p>
                        <p><span className="font-medium text-black">Horario:</span> Lunes A Viernes De 8:00 A 18:00.</p>
                        <p><span className="font-medium text-black">Correo:</span> <a href="mailto:ventas@bienek.cl" className="hover:underline">ventas@bienek.cl</a></p>
                    </div>
                </div>

                {/* Columna 3: Información Útil */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Image src="/assets/icons/informacion-util.svg" alt="Información Útil" width={24} height={24} />
                        <h3 className="font-bold text-black text-base">Información útil</h3>
                    </div>
                    <nav className="pl-8 flex flex-col gap-2">
                        <Link href="#" className="hover:text-primary transition-colors">Blog</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Empresa</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Trabaja Con Nosotros</Link>
                    </nav>
                </div>

            </div>
        </footer>
    );
}
