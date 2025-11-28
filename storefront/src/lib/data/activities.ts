import { sdk } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import { Activity } from "@types/activity";

export const getActivities = async () => {
  return sdk.client
    .fetch<{ activities: Activity[] }>("/store/activities")
    .catch(medusaError)
    .then(({ activities }) => activities);
};
