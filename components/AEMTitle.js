import React from 'react'
import { withMappable } from '@adobe/aem-react-editable-components'
import { TitleV2IsEmptyFn } from '@adobe/aem-core-components-react-base'

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const TitleEditConfig = {
    emptyLabel: 'Title',
    isEmpty: TitleV2IsEmptyFn,
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/title`
};

export const Title = ({ type, text, appliedCssClassNames }) => {
    const getContent = () => {
        const className = 'cmp-title__text';

        switch (type) {
            case 'h1': return <h1 className={className}>{text}</h1>;
            case 'h2': return <h2 className={className}>{text}</h2>;
            case 'h3': return <h3 className={className}>{text}</h3>;
            case 'h4': return <h4 className={className}>{text}</h4>;
            case 'h5': return <h5 className={className}>{text}</h5>;
            case 'h6': return <h6 className={className}>{text}</h6>;
            default: return <span className={className}>{text}</span>;
        }
    }
    
    return (
        <div className={`title ${appliedCssClassNames}`}>
            <div className='cmp-title'>
                {getContent()}
            </div>
        </div>
    )
};

export const AEMTitle = withMappable(Title, TitleEditConfig);