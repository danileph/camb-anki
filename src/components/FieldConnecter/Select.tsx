/** @jsxImportSource @emotion/react */
import React, { FC, HTMLAttributes, useEffect, useRef } from "react";
import Option from "./Option";
import { AutocompleteSearchType } from "../../models/AutocompleteSearchType";
import { css } from "@emotion/react";
import { theme } from "../../utils/theme";
import { useInsideClickAlerter } from "../../hooks/useInsideClickAlerter";
import { useSortedChildren } from "../../hooks/useSortedChildren";

interface ISelectProps
  extends Omit<HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  children: FieldConnecterOption[];
  onChange?: (
    newValue: FieldConnecterOption | undefined,
    isClicked: boolean
  ) => void;
  isShown?: boolean;
  suggestionAbsolute?: boolean;
  currentOption?: FieldConnecterOption;
  onOutsideClick?: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

export interface FieldConnecterOption {
  id: string;
  name: string;
}

const styles = {
  root: {
    base: ({ isShown }: { isShown?: boolean }) =>
      css({
        padding: "2px",
        background: theme.palette.primary.lightest,
        fontSize: "14px",
        // marginTop: "19px",
        outline: `2px solid ${theme.palette.primary.lightest}`,
        boxShadow: "0px 3px 6px 3px rgba(34, 60, 80, 0.2)",
        overflow: "auto",
        borderRadius: "8px",
        transition: theme.transition,
        height: isShown ? "auto" : 23,
      }),
    absolute: css({
      position: "absolute",
      top: "calc(-18px/2)",
      right: -2,
      zIndex: 20,
    }),
  },
};

const Select: FC<ISelectProps> = ({
  children,
  onChange = () => {},
  isShown = true,
  suggestionAbsolute = true,
  currentOption,
  onOutsideClick = () => {},
  ...other
}) => {
  // useEffect(() => {
  //   console.log("clicked outside");
  //   if (!isClickedInside) onOutsideClick();
  // }, [isClickedInside]);

  // const sortedChildren = useSortedChildren(
  //   children,
  //   (a, b) => {
  //     if (a.id === currentOption?.id) {
  //       return -1;
  //     } else if (b.id === currentOption?.id) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   },
  //   [currentOption]
  // );

  const sortedChildren = children.sort((a, b) => {
    if (a.id === currentOption?.id) {
      return -1;
    } else if (b.id === currentOption?.id) {
      return 1;
    } else {
      return 0;
    }
  });

  const noneOptionNode = (
    <Option
      onMouseDown={() => onChange(undefined, true)}
      isSelected={currentOption === undefined}
      id={"none"}
      key={"none"}
    >
      none
    </Option>
  );

  // useEffect(() => {
  //   if (!currentOption) onChange(noneOption, false);
  // }, [currentOption]);

  return isShown && children.length !== 0 ? (
    <div
      css={[
        styles.root.base({ isShown }),
        suggestionAbsolute && styles.root.absolute,
      ]}
      {...other}
    >
      {currentOption === undefined && noneOptionNode}
      {sortedChildren.map((child, i) => (
        <Option
          onMouseDown={() => onChange(child, true)}
          isSelected={currentOption?.id === child.id}
          id={child.id}
          key={child.id}
        >
          {child.name}
        </Option>
      ))}
      {currentOption !== undefined && noneOptionNode}
    </div>
  ) : null;
};

export default Select;
