import { useIntl } from 'react-intl';
import { PLUGIN_ID } from '../pluginId';

const getMessage = (id: string) => {
  const { formatMessage } = useIntl();
  return formatMessage({ id: `${PLUGIN_ID}.${id}` });
};

export { getMessage };
