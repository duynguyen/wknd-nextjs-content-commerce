import { withMappable } from "@adobe/aem-react-editable-components";
import React from "react";
import { FeaturedCategoriesConsumer } from "../lib/featuredCategories";
import {Image} from "./AEMImage";

import styles from "../styles/AEMFeaturedCategories.module.css";

const NEXT_PUBLIC_AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE;

export const FeaturedCategoriesEditConfig = {
  emptyLabel: "Featured Categories",

  isEmpty: (props) => {
    return !props || !props.categories;
  },

  resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/featuredcategories`,
};

const FeaturedCategory = (props) => {
  const { uid, url_key } = props;

  if (!uid) {
    return <div className={styles.placeHolder}><span className={styles.placeHolderText}>{url_key}</span></div>;
  }

  const {
    name,
    products: { items },
  } = props;

  const imageData = items[0].image;

  return (
    <div className={styles.card}>
      <Image
        src={imageData.url}
        alt={`${name} - ${imageData.label}`}
        title={name}
        appliedCssClassNames={styles.image}
        link={`catalog/${url_key}`}
      />
    </div>
  );
};

const FeaturedCategories = (props) => {
  const { categories } = props;

  if (FeaturedCategoriesEditConfig.isEmpty(props)) {
    return null;
  }

  const content = (
    <FeaturedCategoriesConsumer>
      {(value) => {
        const { featuredCategories } = value;

        const filteredCategories = categories.map(
          (category) =>
            featuredCategories.find(
              (featuredCategory) => category === featuredCategory.url_key
            ) || { url_key: category }
        );

        const categoryElements = filteredCategories.map((category) => {
          return <FeaturedCategory key={category.url_key} {...category} />;
        });
        return <div className={styles.root}>{categoryElements}</div>;
      }}
    </FeaturedCategoriesConsumer>
  );

  return content;
};

export default FeaturedCategories;

export const AEMFeaturedCategories = withMappable(
  FeaturedCategories,
  FeaturedCategoriesEditConfig
);
