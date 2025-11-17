import { Module } from '@medusajs/framework/utils';
import LocationModuleService from 'modules/location/services/service';

export const LOCATION_MODULE = 'location';

export default Module(LOCATION_MODULE, {
    service: LocationModuleService,
});
