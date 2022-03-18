import { getPageModelWithFallback } from "../../lib/pages";
import CommerceCategoryPage, { getCategoryModel } from "../../components/CommerceCategoryPage";
import React from "react";
import { getNavigationItems } from "../../lib/navigation";
import MiniCart from "../../components/MiniCart";

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function CatalogPage({ pagePath, category, pageModel, navigationModel, page }) {
    return (
        <>
            <MiniCart />
            <CommerceCategoryPage
                pageModel={pageModel}
                pagePath={pagePath}
                category={category}
                navigationModel={navigationModel}
                currentPage={page}
            />
        </>

    );
}

export async function getStaticProps(context) {
    const page = context.query && context.query.page ? context.query.page : 1;
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog`;

    const [categoryModel, aemModel, navigationModel] = await Promise.all([
        getCategoryModel(page),
        getPageModelWithFallback(NEXT_PUBLIC_AEM_PATH, NEXT_PUBLIC_AEM_PATH),
        getNavigationItems()
    ]);

    const category = categoryModel?.data?.categoryList.length > 0 ? categoryModel?.data?.categoryList[0] : null;

    return {
        props: {
            pagePath,
            category: category,
            pageModel: aemModel,
            navigationModel,
            page
        }
    };
}
