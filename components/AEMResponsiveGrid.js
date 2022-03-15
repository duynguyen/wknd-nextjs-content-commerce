import { ResponsiveGrid, withMappable } from '@adobe/aem-react-editable-components';

export { ResponsiveGrid } from '@adobe/aem-react-editable-components';

export const AEMResponsiveGrid = withMappable(ResponsiveGrid, {
    resourceType: 'wknd/components/container'
});

export default AEMResponsiveGrid;
