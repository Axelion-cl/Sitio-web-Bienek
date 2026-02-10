'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { createProduct, updateProduct, uploadProductImage } from '@/services/admin/products';
import { MultiSelect } from '@/components/ui/MultiSelect';

interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Options from Supabase
    const [sectors, setSectors] = useState<any[]>([]);
    const [families, setFamilies] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [badges, setBadges] = useState<any[]>([]);
    const [loadingOptions, setLoadingOptions] = useState(true);

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        sku: initialData?.sku || '',

        brand: initialData?.brand || '',
        sectorIds: initialData?.sectorIds || [],
        familyIds: initialData?.familyIds || [],
        badges: initialData?.badges || [],
        description: initialData?.description || '',
        images: initialData?.images || ['/assets/images/solutions/limpieza-general.webp'],
        specs: initialData?.specs || {},
        brand_logo: initialData?.brand_logo || ''
    });

    // Fetch options from Supabase on mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [sectorsRes, familiesRes, brandsRes, badgesRes] = await Promise.all([
                    supabase.from('sectors').select('id, title').order('title'),
                    supabase.from('families').select('id, name').order('name'),
                    supabase.from('brands').select('id, name, logo').order('name'),
                    supabase.from('badges').select('id, name').order('name')
                ]);
                setSectors(sectorsRes.data || []);
                setFamilies(familiesRes.data || []);
                setBrands(brandsRes.data || []);
                setBadges(badgesRes.data || []);
            } catch (err) {
                console.error('Error fetching options:', err);
            } finally {
                setLoadingOptions(false);
            }
        };
        fetchOptions();

        // If editing, also fetch existing relations
        if (isEditing && initialData?.id) {
            fetchProductRelations(initialData.id);
        }
    }, [isEditing, initialData?.id]);

    const fetchProductRelations = async (productId: string) => {
        const [sectorsRel, familiesRel] = await Promise.all([
            supabase.from('product_sectors').select('sector_id').eq('product_id', productId),
            supabase.from('product_families').select('family_id').eq('product_id', productId)
        ]);

        if (sectorsRel.data) {
            setFormData(prev => ({ ...prev, sectorIds: sectorsRel.data!.map(r => r.sector_id) }));
        }
        if (familiesRel.data) {
            setFormData(prev => ({ ...prev, familyIds: familiesRel.data!.map(r => r.family_id) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const productData = {
                id: initialData?.id,
                name: formData.name,
                sku: formData.sku,

                brand: formData.brand,
                brand_logo: formData.brand_logo,
                description: formData.description,
                images: formData.images,
                specs: formData.specs,
                badges: formData.badges,
                sectorIds: formData.sectorIds,
                familyIds: formData.familyIds
            };

            let result;
            if (isEditing && initialData?.id) {
                result = await updateProduct(initialData.id, productData);
            } else {
                result = await createProduct(productData);
            }

            if (result.success) {
                router.push('/admin/products');
            } else {
                alert('Error: ' + result.error);
            }
        } finally {
            setSaving(false);
        }
    };

    // Options mapping
    const sectorOptions = sectors.map(s => ({ label: s.title, value: s.id }));
    const familyOptions = families.map(f => ({ label: f.name, value: f.id }));
    const brandOptions = brands.map(b => ({ label: b.name, value: b.name }));
    const badgeOptions = badges.map(b => ({ label: b.name, value: b.name }));

    const handleBrandChange = (vals: string[]) => {
        // Take the last selected value to simulate single select behavior in MultiSelect
        const selectedBrand = vals.length > 0 ? vals[vals.length - 1] : '';

        const brandData = brands.find(b => b.name === selectedBrand);
        setFormData({
            ...formData,
            brand: selectedBrand,
            brand_logo: brandData?.logo || ''
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const result = await uploadProductImage(file);

            if (!result.success) {
                throw new Error(result.error);
            }

            setFormData(prev => ({
                ...prev,
                images: [result.url!] // Currently handling single image principal
            }));

        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert('Error al subir imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loadingOptions) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Details */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="Ej: Detergente Industrial 5L"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                            <input
                                type="text"
                                required
                                value={formData.sku}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="SKU-12345"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Etiquetas y Clasificación</h3>

                        <MultiSelect
                            label="Sectores (Categorías)"
                            options={sectorOptions}
                            selected={formData.sectorIds}
                            onChange={(vals) => setFormData({ ...formData, sectorIds: vals })}
                            placeholder="Selecciona uno o más sectores..."
                        />

                        <MultiSelect
                            label="Familias"
                            options={familyOptions}
                            selected={formData.familyIds}
                            onChange={(vals) => setFormData({ ...formData, familyIds: vals })}
                            placeholder="Selecciona familias..."
                        />

                        <MultiSelect
                            label="Marca"
                            options={brandOptions}
                            selected={formData.brand ? [formData.brand] : []}
                            onChange={handleBrandChange}
                            placeholder="Selecciona marca..."
                        />

                        <MultiSelect
                            label="Distintivos (Badges)"
                            options={badgeOptions}
                            selected={formData.badges}
                            onChange={(vals) => setFormData({ ...formData, badges: vals })}
                            placeholder="Selecciona distintivos..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                            placeholder="Descripción detallada del producto..."
                        />
                    </div>

                    {/* Technical Specs Editor */}
                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-semibold text-gray-900">Especificaciones Técnicas</label>
                            <span className={`text-xs font-medium ${Object.keys(formData.specs || {}).length >= 10 ? 'text-red-500' : 'text-gray-500'}`}>
                                {Object.keys(formData.specs || {}).length}/10
                            </span>
                        </div>

                        <div className="space-y-3 mb-3">
                            {Object.entries(formData.specs || {}).map(([key, value]) => (
                                <div key={key} className="flex gap-2 items-center">
                                    <div className="flex-1 bg-gray-50 px-3 py-2 rounded border border-gray-200 text-sm font-medium text-gray-700">{key}</div>
                                    <div className="flex-1 bg-white px-3 py-2 rounded border border-gray-200 text-sm text-gray-600">{value as string}</div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSpecs = { ...formData.specs };
                                            delete newSpecs[key];
                                            setFormData({ ...formData, specs: newSpecs });
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {Object.keys(formData.specs || {}).length < 10 ? (
                            <div className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
                                <input
                                    type="text"
                                    id="newSpecKey"
                                    placeholder="Nombre (Ej: Material)"
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary outline-none"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            document.getElementById('addSpecBtn')?.click();
                                        }
                                    }}
                                />
                                <input
                                    type="text"
                                    id="newSpecValue"
                                    placeholder="Valor (Ej: Acero Inox)"
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary outline-none"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            document.getElementById('addSpecBtn')?.click();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    id="addSpecBtn"
                                    onClick={() => {
                                        const keyInput = document.getElementById('newSpecKey') as HTMLInputElement;
                                        const valueInput = document.getElementById('newSpecValue') as HTMLInputElement;
                                        const key = keyInput.value.trim();
                                        const value = valueInput.value.trim();

                                        if (key && value) {
                                            setFormData({
                                                ...formData,
                                                specs: { ...formData.specs, [key]: value }
                                            });
                                            keyInput.value = '';
                                            valueInput.value = '';
                                            keyInput.focus();
                                        }
                                    }}
                                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors"
                                >
                                    Agregar
                                </button>
                            </div>
                        ) : (
                            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500 italic">
                                Has alcanzado el límite máximo de 10 especificaciones.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Images */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700">Imágenes del Producto</label>
                        <span className={`text-xs font-medium ${formData.images.length >= 2 ? 'text-red-500' : 'text-gray-500'}`}>
                            {formData.images.length}/2
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* Existing Images Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {formData.images.map((imgUrl: string, index: number) => (
                                <div key={index} className="relative group border border-gray-200 rounded-xl overflow-hidden h-48 bg-gray-50">
                                    <Image
                                        src={imgUrl}
                                        alt={`Product image ${index + 1}`}
                                        fill
                                        className="object-contain p-2"
                                    />
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newImages = formData.images.filter((_: string, i: number) => i !== index);
                                                setFormData({ ...formData, images: newImages });
                                            }}
                                            className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50"
                                            title="Eliminar imagen"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                        {index === 0 ? 'Principal' : 'Secundaria'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Image Button (if less than 2) */}
                        {formData.images.length < 2 && (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <div className="text-gray-400 flex flex-col items-center gap-2">
                                    {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
                                    <span className="text-sm font-medium">
                                        {uploading ? 'Subiendo...' : 'Agregar Imagen'}
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        if (!e.target.files || e.target.files.length === 0) return;
                                        setUploading(true);
                                        try {
                                            const result = await uploadProductImage(e.target.files[0]);
                                            if (result.success && result.url) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    images: [...prev.images, result.url!]
                                                }));
                                            } else {
                                                alert("Error al subir: " + result.error);
                                            }
                                        } catch (err: any) {
                                            console.error(err);
                                            alert("Error: " + err.message);
                                        } finally {
                                            setUploading(false);
                                        }
                                    }}
                                    disabled={uploading || saving}
                                />
                            </div>
                        )}

                        <p className="text-xs text-gray-500 mt-2 text-center">
                            PNG, JPG hasta 5MB. Máximo 2 imágenes.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                >
                    <X className="w-4 h-4" /> Cancelar
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
            </div>
        </form>
    );
}
