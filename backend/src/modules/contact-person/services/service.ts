import { MedusaService } from '@medusajs/framework/utils';
import { ContactPerson } from 'modules/contact-person/models/contact-person';

class ContactPersonModuleService extends MedusaService({
    ContactPersons: ContactPerson, // Explicitly name pluralization to force the generation of createContactPersons
}) {}

export default ContactPersonModuleService;
