import { ApplicationStatus } from 'lib/types';

export const DOCUMENT_TYPE_METADATA = [
    {
        type: 'instructions',
        label: 'Instructions',
    },
    {
        type: 'certificate',
        label: 'Certificate',
    },
    {
        type: 'productSheetPrice',
        label: 'Product sheet with price',
    },
    {
        type: 'productSheetNoPrice',
        label: 'Product sheet without price',
    },
    {
        type: 'rib',
        label: 'RIB',
    },
    {
        type: 'kbis',
        label: 'KBIS',
    },
];

export const APPLICATION_STATUS_METADATA = {
    PENDING: {
        label: 'Pending',
        color: 'blue',
    },
    APPROVED: {
        label: 'Approved',
        color: 'green',
    },
    DECLINED: {
        label: 'Declined',
        color: 'red',
    },
} satisfies Record<ApplicationStatus, { label: string; color: 'green' | 'red' | 'blue' }>;
