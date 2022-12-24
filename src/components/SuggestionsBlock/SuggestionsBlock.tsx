/** @jsxImportSource @emotion/react */
import React, { FC } from "react";
import Option from "./Option";
import { css } from "@emotion/react";
import { theme } from "../../utils/theme";
import Typography from "../UI/Typography/Typography";
import { useRecoilState } from "recoil";
import { searchingWordState } from "../../store/searchingWord";
import { searchTriggerState } from "../../store/searchTrigger";

interface ISuggestionsBlockProps {
  suggestions: string[];
}

const styles = {
  body: {
    base: css({
      padding: "4px",
      background: theme.palette.secondary.darker,
      borderRadius: "12px",
      fontSize: "14px",
      marginTop: "8px",
      width: "100%",
      // outline: `2px solid ${theme.palette.primary.lightest}`,
      // boxShadow: "0px 5px 4px 3px rgba(34, 60, 80, 0.2)",
      // maxHeight: "300px",
      overflow: "auto",
    }),
  },
  header: {
    base: css({
      color: theme.palette.primary.lightest,
      marginBottom: "8px",
    }),
  },
};

const SuggestionsBlock: FC<ISuggestionsBlockProps> = ({ suggestions }) => {
  const [searchingWord, setSearchingWord] = useRecoilState(searchingWordState);
  const [searchTrigger, setSearchTrigger] = useRecoilState(searchTriggerState);

  const onClickOptionHandler = (
    e: React.MouseEvent<HTMLElement>,
    option: string
  ) => {
    setSearchingWord(option);
    setSearchTrigger(!searchTrigger);
  };

  return (
    <div>
      <Typography type={"h1"} css={styles.header.base}>
        Search suggestions
      </Typography>
      <div css={styles.body.base}>
        {suggestions.map((suggestion) => (
          <Option onClick={(e) => onClickOptionHandler(e, suggestion)}>
            {suggestion}
          </Option>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsBlock;
