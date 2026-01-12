import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { BillingCycle } from '../../lib/types';

const useBillingCycles = () => {
    const { data: billingCycles, isLoading } = useQuery({
        queryFn: () =>
            sdk.client
                .fetch<{ billingCycles: BillingCycle[] }>('/admin/billing-cycles')
                .then(response =>
                    response.billingCycles.map(billingCycle => ({
                        key: billingCycle.name,
                        label: billingCycle.name,
                    })),
                ),
        queryKey: [['billingCycles']],
    });

    return { billingCycles, isLoading };
};

export default useBillingCycles;
