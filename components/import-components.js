import { MapTo } from '@adobe/aem-react-editable-components'
import { Text, TextEditConfig } from './AEMText'
import { Title, TitleEditConfig } from './AEMTitle'
import Image, { ImageEditConfig } from './AEMImage'

MapTo('wknd-app/components/title')(Title, TitleEditConfig)
MapTo('wknd-app/components/text')(Text, TextEditConfig)
MapTo('wknd-app/components/image')(Image, ImageEditConfig)