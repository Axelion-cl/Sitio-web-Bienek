"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Globe, Truck, Clock, Phone, ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLElement>(null);
    const { language, setLanguage, t } = useLanguage();

    // Ensure portal is only rendered on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const headerHeight = headerRef.current?.offsetHeight || 200;

            // Only apply hide/show logic after scrolling past the header
            if (currentScrollY > headerHeight) {
                // Scrolling down - hide header
                if (currentScrollY > lastScrollY.current + 10) {
                    setIsVisible(false);
                }
                // Scrolling up - show header
                else if (currentScrollY < lastScrollY.current - 10) {
                    setIsVisible(true);
                }
            } else {
                // At or near top - always show
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLanguageSelect = (lang: 'es' | 'en') => {
        setLanguage(lang);
        setIsLangOpen(false);
    };



    const handleScrollToSolutions = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = 'soluciones';
        const target = document.getElementById(targetId);
        if (!target) return;

        const duration = 1500; // 1.5 seconds for slower scroll
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <>
            <header
                ref={headerRef}
                className={`w-full flex flex-col sticky top-0 z-[50] shadow-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
            >
                {/* 1. Utility Bar */}
                <div className="bg-black text-white py-3 hidden lg:block relative" style={{ zIndex: 30 }}>
                    <div className="container mx-auto px-4 flex justify-between items-center font-sans">
                        {/* Left: Language & Links */}
                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <div
                                    className="flex items-center gap-6 cursor-pointer group"
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                >
                                    <Globe className="w-6 h-6 text-white" />
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-sm font-normal text-white">{t.header.idioma}</span>
                                        <span className="text-sm text-white group-hover:text-primary transition-colors flex items-center gap-1">
                                            {language === 'es' ? 'Español' : 'English'} <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                                        </span>
                                    </div>
                                </div>
                                {/* Dropdown Menu */}
                                {isLangOpen && (
                                    <div
                                        className="absolute top-full left-0 mt-2 bg-black border border-gray-700 rounded-lg py-2 min-w-[140px] shadow-xl"
                                        style={{ zIndex: 50 }}
                                    >
                                        <button
                                            onClick={() => handleLanguageSelect('es')}
                                            className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-gray-800 transition-colors flex items-center justify-between"
                                        >
                                            <span>Español</span>
                                            {language === 'es' && <span className="text-primary">✓</span>}
                                        </button>
                                        <button
                                            onClick={() => handleLanguageSelect('en')}
                                            className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-gray-800 transition-colors flex items-center justify-between"
                                        >
                                            <span>English</span>
                                            {language === 'en' && <span className="text-primary">✓</span>}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-6 text-sm font-normal text-gray-300">
                                <Link href="/empresa" className="hover:text-primary transition-colors">{t.header.empresa}</Link>
                                <Link href="/trabaja-con-nosotros" className="hover:text-primary transition-colors">{t.header.bolsaTrabajo}</Link>
                            </div>
                        </div>

                        {/* Right: Info Items */}
                        <div className="flex items-center gap-12">
                            {/* Cobertura */}
                            <div className="flex items-center gap-4">
                                <Truck className="w-8 h-8 text-white" />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-xs text-gray-300">{t.header.cobertura}</span>
                                    <span className="text-sm text-white">{t.header.coberturaValue}</span>
                                </div>
                            </div>

                            {/* Horario */}
                            <div className="flex items-center gap-4">
                                <Clock className="w-8 h-8 text-white" />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-xs text-gray-300">{t.header.horario}</span>
                                    <span className="text-sm text-white">{t.header.horarioValue}</span>
                                </div>
                            </div>

                            {/* Contacto */}
                            <div className="flex items-center gap-4">
                                <Phone className="w-8 h-8 text-white" />
                                <div className="flex flex-col leading-tight">
                                    <a href="mailto:contacto.web@bienek.cl" className="text-sm text-white hover:text-primary transition-colors">
                                        contacto.web@bienek.cl
                                    </a>
                                    <span className="text-sm text-white">+56 41 - 2635500</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Main Menu */}
                <div className="bg-white py-3 pb-4 z-20 relative">
                    <div className="container mx-auto px-4 flex justify-between items-center">

                        {/* Left Side: Logo + Tagline + Nav */}
                        <div className="flex items-center gap-12">
                            {/* Logo + Tagline */}
                            <div className="flex flex-col">
                                <Link href="/" className="flex-shrink-0">
                                    <Image
                                        src="/assets/images/logo.svg"
                                        alt="Bienek Logo"
                                        width={180}
                                        height={60}
                                        className="h-8 lg:h-12 w-auto object-contain"
                                        priority
                                    />
                                </Link>
                                <p className="font-sans text-sm text-gray-800 tracking-wide mt-0.5 hidden lg:block">
                                    Soluciones Integrales de Limpieza
                                </p>
                            </div>

                            {/* Nav Links (Desktop) */}
                            <nav className="hidden lg:flex items-center gap-8 font-sans font-normal text-sm text-black">
                                <Link href="/" className="hover:text-primary transition-colors">{t.header.inicio}</Link>

                                <Link
                                    href="/#soluciones"
                                    className="hover:text-primary transition-colors"
                                    onClick={handleScrollToSolutions}
                                >
                                    {t.header.soluciones}
                                </Link>


                            </nav>
                        </div>

                        {/* Right Side: Actions */}
                        <div className="flex items-center gap-2 lg:gap-3">
                            <Link href="/contacto" className="cursor-pointer">
                                <Button className="bg-primary hover:bg-primary/90 text-black font-medium text-xs lg:text-base rounded-full px-3 py-2 lg:px-8 lg:py-6 shadow-none cursor-pointer">
                                    {t.header.contactenos}
                                </Button>
                            </Link>

                            {/* Hamburger Menu Button (Mobile Only) */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden p-2 text-black hover:text-primary transition-colors"
                                aria-label="Abrir menú"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. Search Bar & Statement */}
                <div className="bg-black text-white flex items-center" style={{ height: '60px' }}>
                    <div className="container mx-auto px-4 flex justify-between items-center h-full">



                        <div className="flex items-center justify-center w-full">
                            <div className="flex items-center gap-2 lg:gap-6">
                                <span className="font-outfit font-normal text-xs sm:text-sm lg:text-lg tracking-wide truncate max-w-[200px] sm:max-w-none">
                                    {t.header.lideresDistribucion}
                                </span>
                                <div className="flex items-center flex-shrink-0">
                                    <Image
                                        src="/assets/images/lema-bienek.png"
                                        alt="Sello Bienek"
                                        width={50}
                                        height={50}
                                        className="object-contain w-8 h-8 lg:w-[50px] lg:h-[50px]"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Menu - Rendered via Portal */}
            {
                isMounted && isMobileMenuOpen && createPortal(
                    <>
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 bg-black/50 z-[9998] lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Sidebar */}
                        <div className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gray-900 z-[9999] lg:hidden shadow-2xl overflow-y-auto">
                            {/* Header */}
                            <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                <h2 className="text-xl font-semibold text-white">Menú</h2>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-white hover:text-primary transition-colors"
                                    aria-label="Cerrar menú"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Menu Content */}
                            <div className="p-6 space-y-6">
                                {/* Language Selector */}
                                <div className="border-b border-gray-700 pb-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Globe className="w-5 h-5 text-primary" />
                                        <span className="text-sm text-gray-400">{t.header.idioma}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleLanguageSelect('es')}
                                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${language === 'es'
                                                ? 'bg-primary text-black'
                                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                                }`}
                                        >
                                            Español
                                        </button>
                                        <button
                                            onClick={() => handleLanguageSelect('en')}
                                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${language === 'en'
                                                ? 'bg-primary text-black'
                                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                                }`}
                                        >
                                            English
                                        </button>
                                    </div>
                                </div>

                                {/* Navigation Links */}
                                <nav className="space-y-2 border-b border-gray-700 pb-6">
                                    <Link
                                        href="/"
                                        className="block py-3 px-4 text-white hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t.header.inicio}
                                    </Link>
                                    <Link
                                        href="/#soluciones"
                                        className="block py-3 px-4 text-white hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                                        onClick={(e) => {
                                            setIsMobileMenuOpen(false);
                                            handleScrollToSolutions(e);
                                        }}
                                    >
                                        {t.header.soluciones}
                                    </Link>
                                    <Link
                                        href="/empresa"
                                        className="block py-3 px-4 text-white hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t.header.empresa}
                                    </Link>
                                    <Link
                                        href="/trabaja-con-nosotros"
                                        className="block py-3 px-4 text-white hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t.header.bolsaTrabajo}
                                    </Link>
                                </nav>

                                {/* Contact Info */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contacto</h3>

                                    {/* Phone */}
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-primary mt-0.5" />
                                        <div className="flex flex-col">
                                            <span className="text-sm text-white">+56 41 - 2635500</span>
                                            <a href="mailto:contacto.web@bienek.cl" className="text-sm text-gray-400 hover:text-primary transition-colors">
                                                contacto.web@bienek.cl
                                            </a>
                                        </div>
                                    </div>

                                    {/* Coverage */}
                                    <div className="flex items-start gap-3">
                                        <Truck className="w-5 h-5 text-primary mt-0.5" />
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400">{t.header.cobertura}</span>
                                            <span className="text-sm text-white">{t.header.coberturaValue}</span>
                                        </div>
                                    </div>

                                    {/* Schedule */}
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400">{t.header.horario}</span>
                                            <span className="text-sm text-white">{t.header.horarioValue}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>,
                    document.body
                )
            }
        </>
    );
}
