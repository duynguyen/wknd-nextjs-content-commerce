import Head from 'next/head'
import { Utils } from '@adobe/aem-react-editable-components';
import { GlobalProvider } from '../lib/globalContext';
import { getComponentModel, getComponentsFromModel, getPageModel } from '../lib/pages';
import { getNavigationItems, NavigationProvider } from '../lib/navigation';
import {FeaturedCategoriesProvider, getFeaturedCategories} from '../lib/featuredCategories';

import ResponsiveGrid from '../components/AEMResponsiveGrid'
import { getProductTeasersData, ProductTeaserProvider } from '../lib/productTeaser';

const { NEXT_PUBLIC_AEM_PATH, NEXT_PUBLIC_AEM_HOST } = process.env;

export default function ContentPage({ aemHost, rootPath, pagePath, pageModel, commerceItems, featuredCategories, productTeasersData }) {
  const rootModel = Utils.modelToProps(getComponentModel(pageModel, 'root'));

  return (
    <GlobalProvider value={{ aemHost, rootPath }}>
      <NavigationProvider value={commerceItems}>
        <Head>
          <title>{pageModel.title}</title>
        </Head>
        <div className='root container responsivegrid'>
          <FeaturedCategoriesProvider value={{featuredCategories}}>
            <ProductTeaserProvider value={{productTeasersData}}>
              <ResponsiveGrid
                {...rootModel}
                model={rootModel}
                pagePath={pagePath}
                itemPath='root'
              />
            </ProductTeaserProvider>
          </FeaturedCategoriesProvider>
        </div>
      </NavigationProvider>
    </GlobalProvider>
  );
}

export async function getServerSideProps(context) {
  const path = context.params.path.join('/');
  const pagePath = path ? `${NEXT_PUBLIC_AEM_PATH}/${path}` : NEXT_PUBLIC_AEM_PATH;
  const pageModel = await getPageModel(pagePath);

  const commerceItems = await getNavigationItems();

  // Get featured categories data
  const categoryModels = getComponentsFromModel(pageModel,'wknd/components/featuredcategories')
  const categoriesList = categoryModels.map(model=>model.categories).flat()
  const featuredCategories = await getFeaturedCategories(categoriesList);

  const productTeaserModels = getComponentsFromModel(pageModel,'wknd/components/productteaser')
  const productsList = productTeaserModels.map(model=>model.sku)
  const productTeasersData = await getProductTeasersData(productsList);

  return {
    props: {
      aemHost: NEXT_PUBLIC_AEM_HOST,
      rootPath: NEXT_PUBLIC_AEM_PATH,
      commerceItems,
      pagePath,
      pageModel,
      featuredCategories,
      productTeasersData
    }
  }
}
