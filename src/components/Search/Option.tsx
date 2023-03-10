/** @jsxImportSource @emotion/react */
import { FC, HTMLAttributes } from "react";
import { css } from "@emotion/react";
import { theme } from "../../utils/theme";

interface IOptionProps extends HTMLAttributes<HTMLElement> {
  isSelected?: boolean;
}

const styles = {
  root: {
    base: css({
      padding: "8px 12px",
      borderRadius: "12px",
      cursor: "pointer",
      // '&:hover': {
      //   background: theme.palette.primary.lighter,
      //   color: theme.palette.secondary.normal,
      // }
    }),
    checked: css({
      background: theme.palette.primary.normal,
      color: theme.palette.secondary.normal,
      // '&:hover': {
      //   background: theme.palette.primary.lightest,
      //   color: theme.palette.secondary.normal,
      // }
    }),
  },
};

const Option: FC<IOptionProps> = ({
  children,
  isSelected = false,
  ...other
}) => {
  return (
    <div css={[styles.root.base, isSelected && styles.root.checked]} {...other}>
      {children}
    </div>
  );
};

export default Option;
