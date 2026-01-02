import { Module } from '@medusajs/framework/utils';
import ContactPersonModuleService from 'modules/contact-person/services/service';

export const CONTACT_PERSON_MODULE = 'contact_person';

export default Module(CONTACT_PERSON_MODULE, {
    service: ContactPersonModuleService,
});
