import React from 'react';
import { withMappable } from '@adobe/aem-react-editable-components';

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const TextEditConfig = {
    emptyLabel: 'Text',
    isEmpty: function (props) {
        return !props || !props.text || props.text.trim().length < 1;
    },
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/text`
};

export const Text = ({ cqPath, richText, text }) => {
    const richTextContent = () => (
        <div className='cmp-text'
            id={cqPath.substr(cqPath.lastIndexOf('/') + 1)}
            data-rte-editelement
            dangerouslySetInnerHTML={{ __html: text }} />
    );
    return richText ? richTextContent() : (<div className="cmp-text"><p className='cmp-text__paragraph'>{text}</p></div>);
};

export const AEMText = withMappable(Text, TextEditConfig);