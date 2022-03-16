import Head from 'next/head'
import { Utils } from '@adobe/aem-react-editable-components';
import { GlobalProvider } from '../lib/globalContext';
import { getComponentModel, getPageModel } from '../lib/pages';
import { getNavigationItems, NavigationProvider } from '../lib/navigation';

import ResponsiveGrid from '../components/AEMResponsiveGrid'

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ContentPage({ pagePath, pageModel, commerceItems }) {
  const rootModel = Utils.modelToProps(getComponentModel(pageModel, 'root'));

  return (
    <GlobalProvider value={{ aemPath: NEXT_PUBLIC_AEM_PATH }}>
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
      commerceItems,
      pagePath,
      pageModel
    }
  }
}
