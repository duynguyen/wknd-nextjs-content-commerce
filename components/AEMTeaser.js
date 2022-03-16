import { withMappable } from '@adobe/aem-react-editable-components';
import React, { Component } from 'react';

import { Image } from './AEMImage';

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const resourceType = `${NEXT_PUBLIC_AEM_SITE}/components/teaser`;

export const TeaserEditConfig = {

    resourceType,
    emptyLabel: 'Teaser',

    isEmpty: function (props) {
        const hasContent = props.imageResource || props.pretitle || props.title || props.description || (props.actions && props.actions.length);
        return !hasContent;
    }
}

export class Teaser extends Component {

    get teaserImage() {
        const { imageLinkHidden, linkURL, imagePath } = this.props;

        if (!imagePath) {
            return <></>;
        }

        const imageProps = { src: imagePath };
        if (!imageLinkHidden) {
            imageProps['link'] = linkURL;
        }
        return <Image {...imageProps} withoutDecoration={true}></Image>
    }


    render() {
        if (TeaserEditConfig.isEmpty(this.props)) {
            return null;
        }

        const { id, isInEditor, imagePath, appliedCssClassNames = '' } = this.props;

        return (
            <div className={`teaser ${appliedCssClassNames}`}>
                <div id={id} className={`cmp-teaser${isInEditor && imagePath ? ' cq-dd-image' : ''}`}>
                    <div className='cmp-teaser__image'>{this.teaserImage}</div>
                    <div className='cmp-teaser__content'>   
                    </div>
                </div>
            </div>
        );
    }

}

export const AEMTeaser = withMappable(Teaser, TeaserEditConfig);

export default AEMTeaser;

/*


<div data-sly-use.teaser="com.adobe.cq.wcm.core.components.models.Teaser"
     data-sly-use.templates="core/wcm/components/commons/v1/templates.html"
     data-sly-use.imageTemplate="image.html"
     data-sly-use.pretitleTemplate="pretitle.html"
     data-sly-use.titleTemplate="title.html"
     data-sly-use.descriptionTemplate="description.html"
     data-sly-use.actionsTemplate="actions.html"
     data-sly-test.hasContent="${teaser.imageResource || teaser.pretitle || teaser.title || teaser.description || teaser.actions.size > 0}"
     id="${teaser.id}"
     class="cmp-teaser${!wcmmode.disabled && teaser.imageResource ? ' cq-dd-image' : ''}"
     data-cmp-data-layer="${teaser.data.json}">
    <sly data-sly-call="${imageTemplate.image @ teaser=teaser}"></sly>
    <div class="cmp-teaser__content">
        <sly data-sly-call="${pretitleTemplate.pretitle @ teaser=teaser}"></sly>
        <sly data-sly-call="${titleTemplate.title @ teaser=teaser}"></sly>
        <sly data-sly-call="${descriptionTemplate.description @ teaser=teaser}"></sly>
        <sly data-sly-call="${actionsTemplate.actions @ teaser=teaser}"></sly>
    </div>
</div>
<sly data-sly-call="${templates.placeholder @ isEmpty=!hasContent, classAppend='cmp-teaser'}"></sly>
*/