import Head from 'next/head'
import { Utils } from '@adobe/aem-react-editable-components';
import { getComponentModel, getPageModel } from '../lib/pages';
import { getNavigationItems } from '../lib/navigation';

import Navigation from '../components/Navigation';
import ResponsiveGrid from '../components/AEMResponsiveGrid'

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ContentPage({ pagePath, pageModel, navigationItems }) {
  const rootModel = Utils.modelToProps(getComponentModel(pageModel, 'root'));

  return (
    <>
      <Head>
        <title>{pageModel.title}</title>
      </Head>
      <div className='root container responsivegrid'>
        <Navigation commerceItems={navigationItems.commerceNavItems} contentItems={navigationItems.contentNavItems} />
        <ResponsiveGrid
          {...rootModel}
          model={rootModel}
          pagePath={pagePath}
          itemPath='root'
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const path = context.params.path.join('/');
  const pagePath = path ? `${NEXT_PUBLIC_AEM_PATH}/${path}` : NEXT_PUBLIC_AEM_PATH;
  const pageModel = await getPageModel(pagePath);

  const { commerceNavItems, contentNavItems } = await getNavigationItems(NEXT_PUBLIC_AEM_PATH);

  return {
    props: {
      navigationItems: {
        commerceNavItems,
        contentNavItems
      },
      pagePath,
      pageModel
    }
  }
}