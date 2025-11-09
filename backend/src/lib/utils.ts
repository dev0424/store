import { documentTypes } from '../admin/widgets/product-document/constants';

export function toArray<T>(input: T | T[] | null | undefined): T[] {
    if (input == null) {
        return [];
    }
    return Array.isArray(input) ? input : [input];
}

export const findDocument = (type: string) =>
    documentTypes.find(document => document.type === type);
