/** @jsxImportSource @emotion/react */
import { FC, HTMLAttributes } from "react";
import Option from "./Option";
import { AutocompleteSearchType } from "../../models/AutocompleteSearchType";
import { css } from "@emotion/react";
import { theme } from "../../utils/theme";

interface IAutocompleteProps
  extends Omit<HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  children: AutocompleteSearchType[];
  onChange?: (suggestedWord: string, isClicked: boolean) => void;
  isShown?: boolean;
  suggestionAbsolute?: boolean;
  currentOption?: string;
}

const styles = {
  root: {
    base: css({
      padding: "4px",
      background: theme.palette.primary.lightest,
      borderRadius: "12px",
      fontSize: "14px",
      marginTop: "8px",
      width: "100%",
      outline: `2px solid ${theme.palette.primary.lightest}`,
      boxShadow: "0px 5px 4px 3px rgba(34, 60, 80, 0.2)",
      // maxHeight: "300px",
      overflow: "auto",
    }),
    absolute: css({
      position: "absolute",
    }),
  },
};

const Autocomplete: FC<IAutocompleteProps> = ({
  children,
  onChange = () => {},
  isShown = true,
  suggestionAbsolute = true,
  currentOption,
  ...other
}) => {
  return isShown && children.length !== 0 ? (
    <div css={[styles.root.base, suggestionAbsolute && styles.root.absolute]}>
      {children.map((child, i) => (
        <Option
          onMouseDown={() => onChange(child.word, true)}
          isSelected={currentOption === child.word}
          id={i.toString()}
          key={child.word}
        >
          {child.word}
        </Option>
      ))}
    </div>
  ) : null;
};

export default Autocomplete;
