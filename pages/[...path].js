import Head from 'next/head'
import { Utils } from '@adobe/aem-react-editable-components';
import { GlobalProvider } from '../lib/globalContext';
import { getComponentModel, getPageModel } from '../lib/pages';
import { getNavigationItems, NavigationProvider } from '../lib/navigation';

import ResponsiveGrid from '../components/AEMResponsiveGrid'

const { NEXT_PUBLIC_AEM_PATH, NEXT_PUBLIC_AEM_HOST } = process.env;

export default function ContentPage({ aemHost, rootPath, pagePath, pageModel, commerceItems }) {
  const rootModel = Utils.modelToProps(getComponentModel(pageModel, 'root'));

  return (
    <GlobalProvider value={{ aemHost, rootPath }}>
      <NavigationProvider value={commerceItems}>
        <Head>
          <title>{pageModel.title}</title>
        </Head>
        <div className='root container responsivegrid'>
          <ResponsiveGrid
            {...rootModel}
            model={rootModel}
            pagePath={pagePath}
            itemPath='root'
          />
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

  return {
    props: {
      aemHost: NEXT_PUBLIC_AEM_HOST,
      rootPath: NEXT_PUBLIC_AEM_PATH,
      commerceItems,
      pagePath,
      pageModel
    }
  }
}
