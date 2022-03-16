import { withMappable } from '@adobe/aem-react-editable-components';
import React, { Component } from 'react';
import { GlobalConsumer } from '../lib/globalContext';

import { Image } from './AEMImage';

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const resourceType = `${NEXT_PUBLIC_AEM_SITE}/components/teaser`;

export const TeaserEditConfig = {

    resourceType,
    emptyLabel: 'Teaser',

    isEmpty: function(props) {
        const hasContent = props.imageResource || props.pretitle || props.title || props.description || (props.actions && props.actions.length);
        return !hasContent;
    }
}

export class Teaser extends Component {

    get image() {
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

    get pretitle() {
        const { pretitle } = this.props;

        if (pretitle) {
            return <div className='cmp-teaser__pretitle'>{pretitle}</div>
        } else {
            return <></>
        }
    }

    get title() {
        const { title, titleType, linkURL, titleLinkHidden } = this.props;

        if (!title) {
            return <></>;
        }

        const titleContent = linkURL && !titleLinkHidden
            ? <a href={linkURL} className='cmp-teaser__title-link'>{title}</a>
            : title;
        const className = 'cmp-teaser__title';

        switch (titleType) {
            case 'h1': return <h1 className={className}>{titleContent}</h1>;
            case 'h3': return <h3 className={className}>{titleContent}</h3>;
            case 'h4': return <h4 className={className}>{titleContent}</h4>;
            case 'h5': return <h5 className={className}>{titleContent}</h5>;
            case 'h6': return <h6 className={className}>{titleContent}</h6>;
            case 'h2':
            default:
                return <h2 className={className}>{titleContent}</h2>;
        }
    }

    get description() {
        const { description } = this.props;

        if (description) {
            return <div className='cmp-teaser__description' dangerouslySetInnerHTML={{ __html: description }}></div>
        } else {
            return <></>
        }
    }

    actions(rootPath) {
        const { actionsEnabled, actions } = this.props;


        if (actionsEnabled) {
            return (
                <div className='cmp-teaser__action-container'>
                    {actions.map(({ id, url, title }) => (
                        <a className='cmp-teaser__action-link'
                            href={url.replace(rootPath, '').replace(/\.html$/, '')}
                            id={id}>
                            {title}
                        </a>
                    ))}
                </div>
            );
        } else {
            return <></>;
        }
    }

    render() {
        if (TeaserEditConfig.isEmpty(this.props)) {
            return null;
        }

        const { id, isInEditor, imagePath, appliedCssClassNames = '' } = this.props;

        return (
            <GlobalConsumer>
                {({ rootPath }) => (
                    <div className={`teaser ${appliedCssClassNames}`}>
                        <div id={id} className={`cmp-teaser${isInEditor && imagePath ? ' cq-dd-image' : ''}`}>
                            <div className='cmp-teaser__image'>{this.image}</div>
                            <div className='cmp-teaser__content'>
                                {this.pretitle}
                                {this.title}
                                {this.description}
                                {this.actions(rootPath)}
                            </div>
                        </div>
                    </div>
                )}
            </GlobalConsumer>
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
