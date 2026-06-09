export interface Brand {
    id: number;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    brandId: number;
    categoryId: number;
    isActive: boolean;
    createdAt: string;
}

export const brands: Brand[] = [
    {
        id: 1,
        name: 'Duracell',
        slug: 'duracell',
        description: 'Long-lasting consumer batteries for everyday electronics.',
        isActive: true,
    },
    {
        id: 2,
        name: 'Energizer',
        slug: 'energizer',
        description: 'Portable power products for household and professional use.',
        isActive: true,
    },
    {
        id: 3,
        name: 'Panasonic',
        slug: 'panasonic',
        description: 'Reliable rechargeable and specialty battery solutions.',
        isActive: true,
    },
];

export const categories: Category[] = [
    {
        id: 1,
        name: 'Alkaline Batteries',
        slug: 'alkaline-batteries',
        description: 'Single-use batteries for remotes, toys, torches, and clocks.',
        isActive: true,
    },
    {
        id: 2,
        name: 'Rechargeable Batteries',
        slug: 'rechargeable-batteries',
        description: 'Reusable batteries for high-drain devices and regular use.',
        isActive: true,
    },
    {
        id: 3,
        name: 'Specialty Batteries',
        slug: 'specialty-batteries',
        description: 'Coin, 9V, and compact batteries for specialized devices.',
        isActive: true,
    },
];

export const products: Product[] = [
    {
        id: 1,
        name: 'Duracell AA Alkaline 4 Pack',
        slug: 'duracell-aa-alkaline-4-pack',
        description: 'AA alkaline batteries for everyday devices.',
        price: 5.99,
        stock: 120,
        brandId: 1,
        categoryId: 1,
        isActive: true,
        createdAt: '2026-01-12T09:00:00.000Z',
    },
    {
        id: 2,
        name: 'Energizer AAA Alkaline 8 Pack',
        slug: 'energizer-aaa-alkaline-8-pack',
        description: 'AAA alkaline batteries for compact electronics.',
        price: 7.49,
        stock: 95,
        brandId: 2,
        categoryId: 1,
        isActive: true,
        createdAt: '2026-01-18T09:00:00.000Z',
    },
    {
        id: 3,
        name: 'Panasonic Eneloop AA Rechargeable 4 Pack',
        slug: 'panasonic-eneloop-aa-rechargeable-4-pack',
        description: 'Rechargeable NiMH AA batteries with low self-discharge.',
        price: 16.99,
        stock: 42,
        brandId: 3,
        categoryId: 2,
        isActive: true,
        createdAt: '2026-02-02T09:00:00.000Z',
    },
    {
        id: 4,
        name: 'Duracell 9V Specialty Battery',
        slug: 'duracell-9v-specialty-battery',
        description: '9V battery for smoke alarms, radios, and test equipment.',
        price: 4.99,
        stock: 64,
        brandId: 1,
        categoryId: 3,
        isActive: true,
        createdAt: '2026-02-09T09:00:00.000Z',
    },
    {
        id: 5,
        name: 'Energizer CR2032 Coin Cell 2 Pack',
        slug: 'energizer-cr2032-coin-cell-2-pack',
        description: 'Lithium coin batteries for key fobs, scales, and watches.',
        price: 3.99,
        stock: 0,
        brandId: 2,
        categoryId: 3,
        isActive: true,
        createdAt: '2026-02-15T09:00:00.000Z',
    },
    {
        id: 6,
        name: 'Panasonic AAA Rechargeable 4 Pack',
        slug: 'panasonic-aaa-rechargeable-4-pack',
        description: 'Rechargeable AAA batteries for wireless devices.',
        price: 13.99,
        stock: 38,
        brandId: 3,
        categoryId: 2,
        isActive: true,
        createdAt: '2026-03-01T09:00:00.000Z',
    },
];
