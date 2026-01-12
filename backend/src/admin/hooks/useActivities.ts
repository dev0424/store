import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { Activity } from '../../lib/types';

const useActivities = () => {
    const { data: activities, isLoading } = useQuery({
        queryFn: () =>
            sdk.client.fetch<{ activities: Activity[] }>('/admin/activities').then(response =>
                response.activities.map(activity => ({
                    key: activity.name,
                    label: activity.name,
                })),
            ),
        queryKey: [['activities']],
    });

    return { activities, isLoading };
};

export default useActivities;
