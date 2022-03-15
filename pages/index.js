import ContentPage, { getServerSideProps as getContentPageServerSideProps } from './[...path]';

export default ContentPage;

export async function getServerSideProps(context) {
  return await getContentPageServerSideProps({
      ...context,
      params: {
        ...context.params,
        path: []
      }
  });
}
