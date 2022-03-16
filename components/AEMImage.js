import React, { Component } from 'react';
import { withMappable } from '@adobe/aem-react-editable-components';

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const ImageEditConfig = {

    emptyLabel: 'Image',
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/image`,

    isEmpty: function (props) {
        return !props || !props.src || props.src.trim().length < 1;
    }
};

export class Image extends Component {

    get imageContent() {
        const { src, alt, title, displayPopupTitle, link } = this.props;
        const imageContent = <img
            src={src}
            className='cmp-image__image'
            itemProp='contentUrl'
            title={displayPopupTitle ? title : undefined}
            alt={alt || ''}
        />

        if (link) {
            return <a href={link} className='cmp-image__link'>{imageContent}</a>
        } else {
            return imageContent;
        }
    }

    get titleContent() {
        const { title, displayPopupTitle, link } = this.props;

        if (!displayPopupTitle && title) {
            return <span className='cmp-image__title' itemProp='caption'>{title}</span>
        } else if (displayPopupTitle && title) {
            return <meta itemProp='caption' content={title}></meta>
        } else {
            return <></>;
        }
    }

    render() {
        if (ImageEditConfig.isEmpty(this.props)) {
            return null;
        }

        const { isInEditor, appliedCssClassNames = '', withoutDecoration } = this.props;

        const content = (
            <div
                className={`cmp-image${isInEditor ? ' cq-dd-image' : ''}`}
                itemScope
                itemType='http://schema.org/ImageObject'>
                {this.imageContent}
                {this.titleContent}
            </div>
        );

        if (withoutDecoration) {
            return content;
        } else {
            return <div className={`image ${appliedCssClassNames}`}>{content}</div>;
        }
    }

}

export const AEMImage = withMappable(Image, ImageEditConfig);

export default AEMImage;
