import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { CustomPaymentMethod } from '../../lib/types';

const useCustomPaymentMethods = () => {
    const { data: customPaymentMethods, isLoading } = useQuery({
        queryFn: () =>
            sdk.client
                .fetch<{
                    customPaymentMethods: CustomPaymentMethod[];
                }>('/admin/custom-payment-methods')
                .then(response =>
                    response.customPaymentMethods.map(paymentMethod => ({
                        key: paymentMethod.name,
                        label: paymentMethod.name,
                    })),
                ),
        queryKey: [['customPaymentMethods']],
    });

    return { customPaymentMethods, isLoading };
};

export default useCustomPaymentMethods;
