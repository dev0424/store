import { DOCUMENT_TYPE_METADATA } from '../admin/widgets/constants';

export function toArray<T>(input: T | T[] | null | undefined): T[] {
    if (input == null) {
        return [];
    }
    return Array.isArray(input) ? input : [input];
}

export const findDocument = (type: string) =>
    DOCUMENT_TYPE_METADATA.find(document => document.type === type);
