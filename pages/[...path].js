import Head from 'next/head'
import { Utils } from '@adobe/aem-react-editable-components';
import { getComponentModel, getComponentsFromModel, getPageModel, getChildrenPaths } from '../lib/pages';
import { getNavigationItems, NavigationProvider } from '../lib/navigation';
import { FeaturedCategoriesProvider, getFeaturedCategories } from '../lib/featuredCategories';

import ResponsiveGrid from '../components/AEMResponsiveGrid'
import { getProductTeasersData, ProductTeaserProvider } from '../lib/productTeaser';
import MiniCart from '../components/MiniCart';

export default function ContentPage({ pagePath, pageModel, commerceItems, featuredCategories, productTeasersData }) {
  const rootModel = Utils.modelToProps(getComponentModel(pageModel, 'root'));

  return (
    <NavigationProvider value={commerceItems}>
      <Head>
        <title>{pageModel.title}</title>
      </Head>
      <MiniCart />
      <div className='root container responsivegrid'>
        <FeaturedCategoriesProvider value={{ featuredCategories }}>
          <ProductTeaserProvider value={{ productTeasersData }}>
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
  );
}

export async function getStaticPaths() {
  let staticPaths = []
  await getChildrenPaths('/content/wknd/us/en', staticPaths)
  console.log(staticPaths)
  return {
    paths: staticPaths,
    fallback: 'blocking'
  };
}

export async function getStaticProps(context) {
  const rootPath = process.env.NEXT_PUBLIC_AEM_PATH
  const path = context.params.path.join('/');
  const pagePath = path ? `${rootPath}/${path}` : rootPath;
  const pageModel = await getPageModel(pagePath);

  const commerceItems = await getNavigationItems();

  // Get featured categories data
  const categoryModels = getComponentsFromModel(pageModel, 'wknd/components/featuredcategories')
  const categoriesList = categoryModels.map(model => model.categories).flat()
  const featuredCategories = await getFeaturedCategories(categoriesList);

  const productTeaserModels = getComponentsFromModel(pageModel, 'wknd/components/productteaser')
  const productsList = productTeaserModels.map(model => model.sku).filter(item => item);
  const productTeasersData = await getProductTeasersData(productsList);

  return {
    props: {
      commerceItems,
      pagePath,
      pageModel,
      featuredCategories,
      productTeasersData
    }
  }
}
