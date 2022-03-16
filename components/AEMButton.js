import React from "react";
import { withMappable } from "@adobe/aem-react-editable-components";

const NEXT_PUBLIC_AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE;

export const ButtonEditConfig = {
  emptyLabel: "Button",

  isEmpty: function (props) {
    return !props || !props.text;
  },
  resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/button`,
};

const Button = (props) => {
  const { text, id, link, icon } = props;

  if (ButtonEditConfig.isEmpty(props)) {
    return null;
  }

  const iconContent = icon ? (
    <span
      className={`cmp-button__icon cmp--button__icon--${icon}`}
      aria-hidden="true"
    />
  ) : null;

  return (
    <a id={id} className="cmp-button" href={link}>
      {iconContent}
      <span className="cmp-button__text">{text}</span>
    </a>
  );
};

export default Button;

export const AEMButton = withMappable(Button, ButtonEditConfig);
