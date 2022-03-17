import { MapTo } from '@adobe/aem-react-editable-components'
import { Text, TextEditConfig } from './AEMText'
import { Title, TitleEditConfig } from './AEMTitle'
import { Image, ImageEditConfig } from './AEMImage'
import { Container, ContainerEditConfig, resourceType as containerRt } from './AEMContainer'
import { ExperienceFragment, ExperienceFragmentEditConfig, resourceType as experienceFragmentRt } from './AEMExperienceFragment'
import { Navigation, NavigationConfig, resourceType as navigationRt } from './AEMNavigation'
import { Teaser, TeaserEditConfig, resourceType as teaserRt } from './AEMTeaser';
import { Carousel, CarouselEditConfig, resourceType as carouselRt } from './AEMCarousel'
import Button, { ButtonEditConfig } from "./AEMButton";
import FeaturedCategories, {FeaturedCategoriesEditConfig} from './AEMFeaturedCategories'

const { NEXT_PUBLIC_AEM_SITE } = process.env;

MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/featuredcategories`)(FeaturedCategories, FeaturedCategoriesEditConfig);
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/button`)(Button, ButtonEditConfig);
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/title`)(Title, TitleEditConfig)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/text`)(Text, TextEditConfig)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/image`)(Image, ImageEditConfig)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/carousel`)()
MapTo(containerRt)(Container, ContainerEditConfig)
MapTo(experienceFragmentRt)(ExperienceFragment, ExperienceFragmentEditConfig)
MapTo(navigationRt)(Navigation, NavigationConfig)
MapTo(teaserRt)(Teaser, TeaserEditConfig)
MapTo(carouselRt)(Carousel, CarouselEditConfig)