import React, { Component } from 'react';
import { withMappable, AllowedComponentsContainer, ResponsiveGrid } from '@adobe/aem-react-editable-components';

export const resourceType = 'wknd/components/container';

export const ContainerEditConfig = {
    resourceType,
    emptyLabel: 'Layout Container',
    isEmpty: function (props) {
        return !props || !props.cqItems || props.cqItems.length === 0;
    }
}

export class Container extends Component {

    get simpleLayout() {
        const { id, ...containerProps } = this.props;
        return (
            <div id={id} className='cmp-container'>
                <AllowedComponentsContainer {...containerProps} />
            </div>
        )
    }

    get responsiveGridLayout() {
        const { id, ...containerProps } = this.props;
        return (
            <div id={id} className='cmp-container'>
                <ResponsiveGrid {...containerProps} />
            </div>
        )
    }

    render() {
        const { layout } = this.props;

        switch (layout) {
            case 'RESPONSIVE_GRID':
                return this.responsiveGridLayout;
            case 'SIMPLE':
            default:
                return this.simpleLayout;
        }

    }
}


export const AEMContainer = withMappable(Container, ContainerEditConfig);

export default AEMContainer;
