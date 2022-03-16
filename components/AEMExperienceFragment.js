import { EditorContext, withMappable } from '@adobe/aem-react-editable-components';
import React, { Component } from 'react';
import ResponsiveGrid from './AEMResponsiveGrid';

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const resourceType = `${NEXT_PUBLIC_AEM_SITE}/components/experiencefragment`;

export const ExperienceFragmentEditConfig = {
    resourceType,
    emptyLabel: 'Experience Fragment',
    isEmpty: function (props) {
        return !props || !props.configured;
    }
};

export class ExperienceFragment extends Component {

    render() {
        if (ExperienceFragmentEditConfig.isEmpty(this.props)) {
            return null;
        }

        // TODO: name not exported in json cmp-experiencefragment--${this.props.name}
        const { cqItems, cqItemsOrder, localizedFragmentVariationPath } = this.props;
        // remove the /jcr:content at the end, if needed
        const jcrContent = '/jcr:content';
        const jcrContentLength = jcrContent.length;
        const path = localizedFragmentVariationPath.substr(-1 * jcrContentLength) === '/jcr:content'
            ? localizedFragmentVariationPath.substr(0, localizedFragmentVariationPath.length - jcrContentLength)
            : localizedFragmentVariationPath;
        
        return (
            <EditorContext.Provider value={false}>
                <div className={`experiencefragment cmp-experiencefragment ${this.props.appliedCssClassNames}`}>
                    <div className='xf-content-height'>
                        <ResponsiveGrid
                            cqItems={cqItems}
                            cqItemsOrder={cqItemsOrder}
                            model={this.model}
                            itemPath='root'/>
                    </div>
                </div>
            </EditorContext.Provider>
        );
    }

}

export const AEMExperienceFragment = withMappable(ExperienceFragment, ExperienceFragmentEditConfig);

export default AEMExperienceFragment;