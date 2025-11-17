import { MedusaService } from '@medusajs/framework/utils';
import { Location } from 'modules/location/models/location';

class LocationModuleService extends MedusaService({
    Location,
}) {}

export default LocationModuleService;
