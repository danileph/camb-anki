/** @jsxImportSource @emotion/react */
import React, { FC, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { theme } from "../../utils/theme";
import Select, { FieldConnecterOption } from "./Select";
import { useInsideClickAlerter } from "../../hooks/useInsideClickAlerter";
import { useSortedChildren } from "../../hooks/useSortedChildren";

interface IFieldConnecterProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  onChange?: (newValue: FieldConnecterOption | undefined) => void;
  options: FieldConnecterOption[];
  currentOption?: FieldConnecterOption;
}

const styles = {
  root: {
    base: css({}),
  },
  select: {
    base: css({
      position: "relative",
      margin: "0 15px",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    }),
  },
  selectMenu: {
    base: css({}),
  },
  selectButton: {
    base: ({ width, isOpened }: { width?: number; isOpened?: boolean }) =>
      css({
        transition: theme.transition,
        display: isOpened ? "none" : "block",
        position: "absolute",
        zIndex: 10,
        right: 0,
        width: width ? width + 8 : "auto",
        top: "calc(-14px/2)",
        fontSize: "10px",
        background: theme.palette.primary.normal,
        color: theme.palette.secondary.normal,
        padding: "6px 10px",
        borderRadius: "8px",
        cursor: "pointer",
        "&:hover": {
          background: theme.palette.primary.lighter,
        },
      }),
  },
};

const FieldConnecter: FC<IFieldConnecterProps> = ({
  children,
  id,
  options,
  onChange = () => {},
  currentOption,
  ...other
}) => {
  const [selectedValue, setSelectedValue] = useState<
    FieldConnecterOption | undefined
  >(currentOption);
  const [isOpened, setIsOpened] = useState(false);
  const [optionWidth, setOptionWidth] = useState<number>();
  const selectRef = useRef<HTMLDivElement>(null);
  const isClickedInside = useInsideClickAlerter(selectRef);
  console.log(isClickedInside);

  useEffect(() => {
    if (isOpened) {
      setOptionWidth(getOptionMenuWidth());
    } else {
      setOptionWidth(undefined);
    }
  }, [isOpened]);

  const getOptionMenuWidth = () => {
    const option = document.querySelector<HTMLDivElement>(
      ".field-connecter-option"
    );

    const optionWidth = option?.clientWidth;
    return optionWidth;
  };

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpened && isClickedInside) setIsOpened(false);
    else setIsOpened(true);
  };

  useEffect(() => {
    if (isClickedInside) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }, [isClickedInside]);

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  return (
    <div css={styles.root.base} {...other}>
      <div css={styles.select.base} ref={selectRef}>
        <div
          css={styles.selectButton.base({ width: optionWidth, isOpened })}
          onMouseDown={handleOpen}
        >
          {selectedValue ? selectedValue.name : "none"}
        </div>
        <Select
          isShown={isOpened}
          onOutsideClick={() => console.log("outside!")}
          onChange={(newValue, isClicked) => {
            setSelectedValue(newValue);
            if (isClicked) setIsOpened(!setIsOpened);
          }}
          currentOption={selectedValue}
        >
          {options}
        </Select>
      </div>
      {children}
    </div>
  );
};

export default FieldConnecter;
