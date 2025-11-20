import React from 'react';
import { defineRouteConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { SectionRow } from '../../../components/SectionRow';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../../../lib/config';
import { SystemFlag } from 'lib/types';
import UpdateSystemFlag from './components/update-system-flag';
import CreateSystemFlag from './components/create-system-flag';

const SystemFlagsPage = () => {
    const {
        data: systemFlags,
        isLoading,
        refetch: refreshSystemFlags,
    } = useQuery({
        queryFn: () =>
            sdk.client.fetch('/admin/system-flag') as Promise<{ system_flags: SystemFlag[] }>,
        queryKey: [['system-flags']],
    });

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="flex flex-col divide-y">
                    <Heading level="h2" className="px-6 py-4">
                        System flags
                    </Heading>
                    <Text className="px-6 py-4">Loading...</Text>
                </div>
            </Container>
        );
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h1">System flags</Heading>
                <CreateSystemFlag onSuccess={refreshSystemFlags} />
            </div>
            {systemFlags.system_flags.length ? (
                systemFlags.system_flags.map(systemFlag => (
                    <SectionRow
                        key={systemFlag.id}
                        title={systemFlag.name}
                        value={systemFlag.value}
                        actions={
                            <UpdateSystemFlag
                                systemFlag={systemFlag}
                                onSuccess={refreshSystemFlags}
                            />
                        }
                    />
                ))
            ) : (
                <div className="p-4">
                    <Text size="small" weight="plus" leading="compact">
                        The list is empty
                    </Text>
                </div>
            )}
        </Container>
    );
};

export const config = defineRouteConfig({
    label: 'System flags',
});

export default SystemFlagsPage;
