import { prefixPluginTranslations, flattenObject } from '@sensinum/strapi-utils';

import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { getTranslation } from './utils/getTranslation';
import { TableIcon } from './components/TableIcon';

export default {
  register(app: any) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: 'Table Field',
    });

    app.customFields.register({
      name: 'table',
      pluginId: PLUGIN_ID,
      type: 'json',
      intlLabel: {
        id: getTranslation('plugin.label'),
        defaultMessage: 'Table',
      },
      intlDescription: {
        id: getTranslation('plugin.description'),
        defaultMessage: 'Build a table structured data set with dynamic columns and rows',
      },
      components: {
        Input: async () => import('./components/Input'),
      },
      icon: TableIcon,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data: prefixPluginTranslations(flattenObject(data), PLUGIN_ID), locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
