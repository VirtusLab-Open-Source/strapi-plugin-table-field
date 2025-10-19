import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'table',
    plugin: 'table-field',
    type: 'json',
  });
};

export default register;
