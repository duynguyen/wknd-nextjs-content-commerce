import React from 'react';
import { withMappable } from '@adobe/aem-react-editable-components';

export const TextEditConfig = {
    emptyLabel: 'Text',
    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    },
    resourceType: 'wknd-app/components/text'
};

export const Text = ({ cqPath, richText, text }) => {
    const richTextContent = () => (
        <div className="aem_text"
            id={cqPath.substr(cqPath.lastIndexOf('/') + 1)}
            data-rte-editelement
            dangerouslySetInnerHTML={{__html: text}} />
    );
    return richText ? richTextContent() : (<div className="aem_text">{text}</div>);
};

export const AEMText = withMappable(Text, TextEditConfig);