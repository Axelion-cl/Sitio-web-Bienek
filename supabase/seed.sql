-- =====================================================
-- SEED DATA: Bienek Web - Sectores y Familias
-- Ejecutar en Supabase SQL Editor
-- =====================================================

-- 1. SECTORES
INSERT INTO public.sectors (id, slug, title, description, full_description, icon, image) VALUES
('higiene', 'soluciones-generales-de-higiene', 'Soluciones Generales de Higiene', 'Productos esenciales para la limpieza diaria.', 'En Bienek entendemos que la higiene fundamental es la base de cualquier operación segura y eficiente. Nuestra línea de soluciones generales abarca desde detergentes de alto rendimiento hasta implementos de limpieza ergonómicos, diseñados para maximizar la productividad y garantizar espacios impecables.', '/assets/icons/higiene.svg', '/assets/images/solutions/jardines.png'),
('industrial', 'soluciones-especializadas-sector-industrial-y-almacenaje', 'Soluciones Especializadas sector Industrial y Almacenaje', 'Limpieza profunda para entornos exigentes.', 'El sector industrial requiere soluciones robustas que puedan enfrentar grasa, aceites y suciedad pesada. Ofrecemos productos químicos especializados y maquinaria de última generación para mantener sus plantas y almacenes operativos y seguros.', '/assets/icons/industrial.svg', '/assets/images/solutions/industria.png'),
('salud', 'soluciones-especializadas-sector-salud', 'Soluciones Especializadas sector Salud', 'Higiene crítica para clínicas y hospitales.', 'En el sector salud, la limpieza salva vidas. Nuestras soluciones cumplen con los más altos estándares de desinfección y esterilización, ayudando a prevenir infecciones asociadas a la atención de salud (IAAS) y protegiendo tanto a pacientes como a personal médico.', '/assets/icons/salud.svg', '/assets/images/solutions/salud.png'),
('institucional', 'soluciones-especializadas-sector-institucional', 'Soluciones Especializadas sector Institucional', 'Limpieza para oficinas y edificios públicos.', 'Mantenemos la imagen corporativa y el bienestar de los empleados con soluciones discretas y efectivas para oficinas, bancos y edificios gubernamentales. Aromatización, limpieza de alfombras y gestión de residuos.', '/assets/icons/institucional.svg', '/assets/images/solutions/oficinas.png'),
('educacion', 'soluciones-especializadas-sector-educacion', 'Soluciones Especializadas sector Educación', 'Ambientes seguros para el aprendizaje.', 'Desde jardines infantiles hasta universidades, garantizamos espacios limpios que promueven la salud y reducen el ausentismo. Productos seguros, no tóxicos y sistemas de higiene para baños de alto tráfico.', '/assets/icons/educacion.svg', '/assets/images/solutions/educacion.png'),
('adulto-mayor', 'soluciones-para-centros-adulto-mayor', 'Soluciones para Centros Adulto Mayor', 'Cuidado delicado para espacios residenciales.', 'Soluciones enfocadas en la desinfección suave pero efectiva, control de olores y productos para el cuidado personal, creando un ambiente digno, limpio y acogedor para los residentes.', '/assets/icons/adulto-mayor.svg', '/assets/images/solutions/adulto-mayor.png'),
('horeca', 'soluciones-especializadas-sector-horeca', 'Soluciones Especializadas sector HORECA', 'Impecabilidad para Hoteles, Restaurantes y Catering.', 'La limpieza es la carta de presentación en la hospitalidad. Ofrecemos soluciones integrales para cocina, housekeeping y lavandería, garantizando la seguridad alimentaria y la satisfacción total del huésped.', '/assets/icons/horeca.svg', '/assets/images/solutions/horeca.png'),
('veterinario', 'soluciones-especializadas-sector-veterinario', 'Soluciones Especializadas sector Veterinario', 'Desinfección segura para clínicas veterinarias.', 'Productos específicos que eliminan patógenos animales (parvovirus, distemper) sin dañar a las mascotas. Control de olores potente y desinfección de quirófanos y caniles.', '/assets/icons/veterinario.svg', '/assets/images/solutions/veterinaria.png'),
('accesorios', 'equipamiento-accesorios', 'Equipamiento Accesorios', 'Herramientas manuales de alto rendimiento.', 'Desde carros de limpieza ergonómicos hasta paños de microfibra de última tecnología. Proveemos todas las herramientas necesarias para facilitar el trabajo del personal de limpieza.', '/assets/icons/accesorios.svg', '/assets/images/solutions/limpieza-general.png'),
('maquinaria', 'equipamientos-de-maquinaria', 'Equipamientos de Maquinaria', 'Tecnología para grandes superficies.', 'Venta y arriendo de aspiradoras industriales, restregadoras, barredoras e hidrolavadoras top de línea para maximizar la eficiencia en grandes áreas.', '/assets/icons/maquinaria.svg', '/assets/images/solutions/maquinaria.png'),
('aguas', 'tratamiento-de-agua', 'Tratamiento de Agua', 'Soluciones químicas para calidad del agua.', 'Polímeros, coagulantes y desinfectantes para el tratamiento de aguas industriales y potables, asegurando el cumplimiento normativo y la sostenibilidad.', '/assets/icons/aguas.svg', '/assets/images/solutions/aguas.png'),
('embarcaciones', 'soluciones-para-embarcaciones', 'Soluciones para Embarcaciones', 'Limpieza especializada marítima.', 'Productos biodegradables certificados para uso marítimo. Limpieza de sentinas, cubiertas y camarotes, cumpliendo con las estrictas normas ambientales del sector.', '/assets/icons/embarcaciones.svg', '/assets/images/solutions/embarcaciones.png')
ON CONFLICT (id) DO NOTHING;

-- 2. FAMILIAS
INSERT INTO public.families (id, name) VALUES
('papeles', 'Papeles Higiénicos'),
('jabones', 'Jabones y Sanitizantes'),
('dispensadores', 'Dispensadores'),
('desengrasantes', 'Desengrasantes Industriales'),
('epp', 'Equipos de Protección (EPP)'),
('desinfectantes-hosp', 'Desinfectantes Grado Hospitalario'),
('insumos-medicos', 'Insumos Médicos Desechables'),
('cafe', 'Insumos de Cafetería'),
('vajilla', 'Vajilla Desechable')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- SEED DATA: Productos (20 de muestra)
-- Para la demo inicial. El catálogo completo se puede 
-- cargar después desde el importador del Admin.
-- =====================================================

-- 3. PRODUCTOS DE MUESTRA
INSERT INTO public.products (id, name, brand, brand_logo, description, price, sku, images, specs, badges, created_at) VALUES
('PROD-1000', 'Detergente Industrial 3M 100', '3M', '/assets/images/brands/3m.png', 'Producto de alto rendimiento diseñado para entornos exigentes. Su fórmula avanzada garantiza una limpieza profunda y duradera, cumpliendo con los estándares más altos de higiene industrial.', 5000, 'SKU-50000', ARRAY['/assets/images/solutions/limpieza-general.png', '/assets/images/solutions/industria.png'], '{"Formato": "Envase 5L", "Presentación": "Caja 4 unidades", "Dilución": "1:20", "Certificación": "ISO 9001", "Origen": "Chile"}', ARRAY['En Promoción'], NOW()),
('PROD-1001', 'Desinfectante Concentrado Kimberly-Clark 101', 'Kimberly-Clark', '/assets/images/brands/kimberly.png', 'Solución especializada para el mantenimiento profesional. Ofrece una excelente relación costo-beneficio y es ideal para uso frecuente en oficinas, hospitales y centros educativos.', 5150, 'SKU-50001', ARRAY['/assets/images/solutions/salud.png'], '{"Formato": "Envase 5L", "Presentación": "Caja 4 unidades", "Dilución": "1:20", "Certificación": "ISO 9001", "Origen": "Chile"}', ARRAY[]::text[], NOW()),
('PROD-1002', 'Papel Higiénico Jumbo Tork 102', 'Tork', '/assets/images/brands/tork.png', 'Insumo esencial para la higiene diaria. Fabricado con materiales de primera calidad que aseguran resistencia y absorción superior, reduciendo el consumo y los residuos.', 5300, 'SKU-50002', ARRAY['/assets/images/solutions/oficinas.png'], '{"Formato": "Envase 5L", "Presentación": "Caja 4 unidades", "Dilución": "1:20", "Certificación": "ISO 9001", "Origen": "Chile"}', ARRAY[]::text[], NOW()),
('PROD-1003', 'Toalla de Manos Interfoliada Diversey 103', 'Diversey', '/assets/images/brands/diversey.png', 'Producto de alto rendimiento diseñado para entornos exigentes.', 5450, 'SKU-50003', ARRAY['/assets/images/solutions/jardines.png'], '{"Formato": "Envase 5L", "Presentación": "Caja 4 unidades"}', ARRAY[]::text[], NOW()),
('PROD-1004', 'Jabón Líquido Ecolab 104', 'Ecolab', '/assets/images/brands/ecolab.png', 'Solución especializada para el mantenimiento profesional.', 5600, 'SKU-50004', ARRAY['/assets/images/solutions/salud.png'], '{"Formato": "Envase 5L", "Presentación": "Caja 4 unidades"}', ARRAY[]::text[], NOW()),
('PROD-1005', 'Cera Autobrillo 3M 105', '3M', '/assets/images/brands/3m.png', 'Insumo esencial para la higiene diaria.', 5750, 'SKU-50005', ARRAY['/assets/images/solutions/industria.png'], '{"Formato": "Envase 5L"}', ARRAY['En Promoción'], NOW()),
('PROD-1006', 'Limpiador Multiuso Kimberly-Clark 106', 'Kimberly-Clark', '/assets/images/brands/kimberly.png', 'Producto de alto rendimiento.', 5900, 'SKU-50006', ARRAY['/assets/images/solutions/oficinas.png'], '{"Formato": "Envase 5L"}', ARRAY[]::text[], NOW()),
('PROD-1007', 'Paños de Microfibra Tork 107', 'Tork', '/assets/images/brands/tork.png', 'Solución especializada.', 6050, 'SKU-50007', ARRAY['/assets/images/solutions/limpieza-general.png'], '{"Formato": "Pack 10 unidades"}', ARRAY['Más Vendidos'], NOW()),
('PROD-1008', 'Mopa Húmeda Diversey 108', 'Diversey', '/assets/images/brands/diversey.png', 'Insumo esencial.', 6200, 'SKU-50008', ARRAY['/assets/images/solutions/educacion.png'], '{"Formato": "Unidad"}', ARRAY[]::text[], NOW()),
('PROD-1009', 'Carro de Limpieza Ecolab 109', 'Ecolab', '/assets/images/brands/ecolab.png', 'Producto de alto rendimiento.', 6350, 'SKU-50009', ARRAY['/assets/images/solutions/horeca.png'], '{"Formato": "Unidad"}', ARRAY[]::text[], NOW()),
('PROD-1010', 'Guantes de Nitrilo 3M 110', '3M', '/assets/images/brands/3m.png', 'EPP de calidad superior.', 6500, 'SKU-50010', ARRAY['/assets/images/solutions/salud.png'], '{"Formato": "Caja 100 unidades"}', ARRAY['En Promoción'], NOW()),
('PROD-1011', 'Mascarilla Desechable Kimberly-Clark 111', 'Kimberly-Clark', '/assets/images/brands/kimberly.png', 'Protección respiratoria.', 6650, 'SKU-50011', ARRAY['/assets/images/solutions/salud.png'], '{"Formato": "Caja 50 unidades"}', ARRAY['Nuevo'], NOW())
ON CONFLICT (id) DO NOTHING;

-- 4. RELACIONES PRODUCTO-SECTOR
INSERT INTO public.product_sectors (product_id, sector_id) VALUES
('PROD-1000', 'higiene'),
('PROD-1000', 'industrial'),
('PROD-1001', 'industrial'),
('PROD-1002', 'salud'),
('PROD-1003', 'salud'),
('PROD-1003', 'institucional'),
('PROD-1004', 'institucional'),
('PROD-1005', 'educacion'),
('PROD-1006', 'educacion'),
('PROD-1006', 'adulto-mayor'),
('PROD-1007', 'adulto-mayor'),
('PROD-1008', 'horeca'),
('PROD-1009', 'horeca'),
('PROD-1009', 'veterinario'),
('PROD-1010', 'veterinario'),
('PROD-1011', 'salud')
ON CONFLICT DO NOTHING;

-- 5. RELACIONES PRODUCTO-FAMILIA
INSERT INTO public.product_families (product_id, family_id) VALUES
('PROD-1000', 'desengrasantes'),
('PROD-1001', 'desinfectantes-hosp'),
('PROD-1002', 'papeles'),
('PROD-1003', 'papeles'),
('PROD-1004', 'jabones'),
('PROD-1005', 'desengrasantes'),
('PROD-1006', 'dispensadores'),
('PROD-1007', 'epp'),
('PROD-1008', 'epp'),
('PROD-1009', 'cafe'),
('PROD-1010', 'epp'),
('PROD-1011', 'insumos-medicos')
ON CONFLICT DO NOTHING;

-- =====================================================
-- ¡LISTO! Ahora tienes datos base para probar el sitio.
-- =====================================================
