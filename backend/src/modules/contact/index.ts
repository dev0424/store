import { Module } from '@medusajs/framework/utils';
import ContactModuleService from 'modules/contact/services/service';

export const CONTACT_MODULE = 'contact';

export default Module(CONTACT_MODULE, {
    service: ContactModuleService,
});
