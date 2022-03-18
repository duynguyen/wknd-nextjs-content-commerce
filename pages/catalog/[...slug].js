import { gql } from '@apollo/client';
import client from '../../lib/CommerceGraphQLClient';
import { getPageModelWithFallback } from "../../lib/pages";
import CommerceCategoryPage, { getCategoryModel } from "../../components/CommerceCategoryPage";
import React from "react";
import { getNavigationItems } from "../../lib/navigation";
import MiniCart from "../../components/MiniCart";

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function CatalogCategoryPage({ pagePath, slug, category, pageModel, navigationModel, page }) {
    return (
        <>
            <MiniCart />
            <CommerceCategoryPage
                slug={slug}
                pageModel={pageModel}
                pagePath={pagePath}
                category={category}
                navigationModel={navigationModel}
                currentPage={page}
            />
        </>
    );
}

export async function getStaticPaths(context) {
    const query = gql`
        {
            categoryList(filters: {}) {
                url_key
            }
        }
    `;
    const response = await client.query({ query });
    const paths = (response?.data?.categoryList || [])
        .filter(({ url_key }) => !!url_key)
        .map(({ url_key }) => ({ params: { slug: [ url_key ]}}));
        

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    const slug = context.params.slug;
    const page = context.query && context.query.page ? context.query.page : 1;
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog/category/` + slug;

    const [categoryModel, aemModel, navigationModel] = await Promise.all([
        getCategoryModel(page, slug),
        getPageModelWithFallback(pagePath, NEXT_PUBLIC_AEM_PATH),
        getNavigationItems()
    ]);

    const category = categoryModel?.data?.categoryList.length > 0 ? categoryModel?.data?.categoryList[0] : null;

    return {
        props: {
            pagePath,
            category: category,
            slug: slug,
            pageModel: aemModel,
            navigationModel,
            page
        }
    };
}
