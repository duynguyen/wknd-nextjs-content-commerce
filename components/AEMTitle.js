import React from 'react'
import { withMappable } from '@adobe/aem-react-editable-components'
import { TitleV2IsEmptyFn } from '@adobe/aem-core-components-react-base'

export const TitleEditConfig = {
    emptyLabel: 'Title',
    isEmpty: TitleV2IsEmptyFn,
    resourceType: 's504-wknd-app/components/title'
};

export const Title = ({ text }) => {
    return (<h1>{text}</h1>)
};

export const AEMTitle = withMappable(Title, TitleEditConfig);