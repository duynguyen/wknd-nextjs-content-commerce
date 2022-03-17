import React from "react";

import { withMappable } from "@adobe/aem-react-editable-components";
import { ProductTeaserConsumer } from "../lib/productTeaser";

import { Image } from "./AEMImage";

import styles from "../styles/AEMProductTeaser.module.css";

const NEXT_PUBLIC_AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE;

const ProductCard = (props) => {
  const { name, image, price, url_key } = props;

  const { url, label } = image;

  const {
    regularPrice: {
      amount: { currency, value },
    },
  } = price;

  const priceText = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: currency,
  }).format(value);

  return (
    <div className={styles.root}>
      <a className={styles.link} href={`catalog/product/${url_key}`}>
        <Image
          src={url}
          alt={`${name} - ${label}`}
          appliedCssClassName={styles.image}
        />
        <div className={styles.title}>
          {name}
        </div>
        <div className={styles.price}>{priceText}</div>
      </a>
    </div>
  );
};

const PlaceHolder = props => {
  const {sku} = props
  return (
    <div className={styles.placeHolder}>
        <div className={styles.title}>
          {sku}
        </div>
    </div>
  )
}

export const ProductTeaserEditConfig = {
  emptyLabel: "ProductTeaser",

  isEmpty: (props) => {
    return !props || !props.sku;
  },

  resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/productteaser`,
};

const ProductTeaser = (props) => {
  if (ProductTeaserEditConfig.isEmpty(props)) {
    return null;
  }

  const content = (
    <ProductTeaserConsumer>
      {({ productTeasersData: { items } }) => {
        const { sku } = props;

        const productData = items.find((item) => item.sku === sku);

        if (!productData) {
          return <PlaceHolder sku={sku} />;
        }

        return <ProductCard {...productData} />;
      }}
    </ProductTeaserConsumer>
  );

  return content;
};

export default ProductTeaser;

export const AEMProductTeaser = withMappable(
  ProductTeaser,
  ProductTeaserEditConfig
);
