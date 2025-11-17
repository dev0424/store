import { ReactNode } from 'react';
import { Text, clx } from '@medusajs/ui';

export type Props = {
    title: string;
    value?: ReactNode | string | null;
    actions?: ReactNode;
};

export const SectionRow = ({ title, value, actions }: Props) => {
    const displayAsValue = typeof value === 'string' || typeof value === 'number' || !value;

    return (
        <div
            className={clx(`text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`, {
                'grid-cols-[1fr_1fr_28px]': !!actions,
            })}
        >
            <Text size="small" weight="plus" leading="compact">
                {title}
            </Text>

            {displayAsValue ? (
                <Text size="small" leading="compact" className="whitespace-pre-line text-pretty">
                    {value ?? '-'}
                </Text>
            ) : (
                <div className="flex flex-wrap gap-1">{value}</div>
            )}

            {actions && <div>{actions}</div>}
        </div>
    );
};
