import { MapTo } from '@adobe/aem-react-editable-components'
import { Text, TextEditConfig } from './AEMText'
import { Title, TitleEditConfig } from './AEMTitle'
import Image, { ImageEditConfig } from './AEMImage'

MapTo(`editorxpdevelopment/components/content/title`)(Title, TitleEditConfig)
MapTo(`editorxpdevelopment/components/content/text`)(Text, TextEditConfig)
MapTo(`editorxpdevelopment/components/content/image`)(Image, ImageEditConfig)