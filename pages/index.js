import ContentPage, { getStaticProps as getContentPageStaticProps } from './[...path]';

export default ContentPage;

export async function getStaticProps(context) {
  return await getContentPageStaticProps({
      ...context,
      params: {
        ...context.params,
        path: []
      }
  });
}
