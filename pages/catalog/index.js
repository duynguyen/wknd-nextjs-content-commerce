import {getPageModel} from "../../lib/pages";
import CommerceCategoryPage, {getCategoryModel} from "../../components/CommerceCategoryPage";
import React from "react";

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function CatalogPage({ pagePath, category, pageModel }) {
    return (
        <CommerceCategoryPage pageModel={pageModel} pagePath={pagePath} category={category} />
    );
}

export async function getStaticProps(context) {
    const page = context.query && context.query.page ? context.query.page : 1;
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog`;

    const [categoryModel, aemModel] = await Promise.all([
        getCategoryModel(page),
        getPageModel(pagePath)
    ]);

    const category = categoryModel?.data?.categoryList.length > 0 ? categoryModel?.data?.categoryList[0] : null;

    return {
        props: {
            pagePath,
            category: category,
            pageModel: aemModel
        }
    };
}