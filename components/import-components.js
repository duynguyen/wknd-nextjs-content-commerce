import { MapTo } from '@adobe/aem-react-editable-components'
import { Text, TextEditConfig } from './AEMText'
import { Title, TitleEditConfig } from './AEMTitle'
import Image, { ImageEditConfig } from './AEMImage'
import ResponsiveGrid from './AEMResponsiveGrid'

const { NEXT_PUBLIC_AEM_SITE } = process.env;

MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/title`)(Title, TitleEditConfig)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/text`)(Text, TextEditConfig)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/image`)(Image, ImageEditConfig)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/container`)(ResponsiveGrid)