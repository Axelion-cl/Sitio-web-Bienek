import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-[100px] pb-12 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-sans text-sm">

                {/* 1. Logo Column - Aligned left */}
                <div className="flex flex-col justify-start">
                    <Link href="/" className="inline-block">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="Bienek Logo"
                            width={200}
                            height={70}
                            className="h-16 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* 2. Casa Matriz */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/casa-matriz.svg" alt="" width={24} height={24} />
                        <h3 className="font-bold text-base">Casa Matriz</h3>
                    </div>
                    <div className="space-y-1.5 text-black leading-relaxed">
                        <p>Juan Sebastián Elcano 1910,</p>
                        <p>Parque Industrial San Andrés</p>
                        <p>Hualpén / Concepción / Chile</p>
                    </div>
                </div>

                {/* 3. Contacto */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/telefono.svg" alt="" width={24} height={24} />
                        <h3 className="font-bold text-base">Contacto</h3>
                    </div>
                    <div className="space-y-2.5 text-black leading-relaxed">
                        <p>Teléfono: +56 41-2635500</p>
                        <div className="flex flex-col">
                            <p>Horario De Atención:</p>
                            <p>Lunes A Viernes De 8:00 A 18:00.</p>
                        </div>
                        <p>Correo: Ventas@Bienek.Cl</p>
                    </div>
                </div>

                {/* 4. Información Útil */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/informacion-util.svg" alt="" width={24} height={24} />
                        <h3 className="font-bold text-base">Información útil</h3>
                    </div>
                    <nav className="flex flex-col gap-2.5 text-black font-medium">
                        <Link href="#" className="hover:text-primary transition-colors">Blog</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Empresa</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Trabaja Con Nosotros</Link>
                    </nav>
                </div>

            </div>

            {/* Copyright */}
            <div className="container mx-auto px-4 mt-20 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Bienek. Todos los derechos reservados.
            </div>
        </footer>
    );
}
