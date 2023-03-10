/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "components/UI/Button/Button";
import { Label } from "components/UI/Label";
import Typography from "components/UI/Typography/Typography";
import React, { FC, ReactElement, ReactNode, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { ankiFieldsSelector } from "store/ankiFields";
import { currentTabSelector } from "store/currentTab";
import { searchingWordState } from "store/searchingWord";
import { theme } from "utils/theme";
import Definition from "./Definition/Definition";
import { Example } from "./Example";
import {
  middleWordDataSelector,
  middleWordDataState,
} from "../../../store/middleWordData";
import { wordDataState } from "../../../store/wordData";
import word from "../Word";
import { WordType } from "../../../models/WordType";

interface IDefinitionBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  useCase: string;
  level: string;
  children: ReactElement[];
  currentWord: WordType;
}

interface IDefinitionBlockComposition {
  Definition: typeof Definition;
  Example: typeof Example;
}

const styles = {
  root: {
    base: css({
      padding: "15px",
      background: theme.palette.secondary.darker,
      borderRadius: "12px",
      margin: "10px 0",
      ":last-child": {
        marginBottom: 0,
      },
    }),
  },
  header: {
    base: css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
  },
  label: {
    base: css({
      fontStyle: "normal",
    }),
  },
  labelCaption: {
    base: css({
      margin: 0,
      textTransform: "uppercase",
      fontSize: "12px",
    }),
  },
};

export interface IContextDefinition {
  example: {
    set: (newValue: string | undefined) => any;
    get: string | undefined;
  };
  definition: {
    set: (newValue: string | undefined) => any;
    get: string | undefined;
  };
}

export const ContextDefinition = React.createContext<IContextDefinition | null>(
  null
);

const DefinitionBlock: FC<IDefinitionBlockProps> &
  IDefinitionBlockComposition = ({ children, useCase, level, currentWord }) => {
  const [example, setExample] = useState<string>();
  const [definition, setDefinition] = useState<string>();
  const [currentTab, setCurrentTab] = useRecoilState(currentTabSelector);
  const [middleWordData, setMiddleWordData] = useRecoilState(
    middleWordDataSelector
  );
  const [wordData] = useRecoilState(wordDataState);

  const defaultContext: IContextDefinition = {
    example: {
      set: setExample,
      get: example,
    },
    definition: {
      set: setDefinition,
      get: definition,
    },
  };

  // const currentWord = useMemo(() => {
  //   console.log(wordData);
  //   return wordData?.find((word) =>
  //     word.useCases.find((useCase) =>
  //       useCase.definition.find(
  //         (_definition) => _definition.content === definition
  //       )
  //     )
  //   );
  // }, [wordData]);

  const handleAdd = () => {
    setMiddleWordData({
      ...middleWordData,
      definition: { ...middleWordData.definition, content: definition },
      example: { ...middleWordData.example, content: example },
      word: { ...middleWordData.word, content: currentWord?.word },
      partOfSpeech: {
        ...middleWordData.partOfSpeech,
        content: currentWord?.partOfspeech,
      },
      formality: {
        ...middleWordData.formality,
        content: currentWord?.formality,
      },
    });

    setCurrentTab("add");
  };

  return (
    <ContextDefinition.Provider value={defaultContext}>
      <div css={styles.root.base}>
        <div css={styles.header.base}>
          <Typography css={styles.labelCaption.base}>
            {level ? (
              <Label label={level} labelCss={styles.label.base}>
                {useCase}
              </Label>
            ) : (
              useCase
            )}
          </Typography>
          <div>
            <Button size="small" onClick={() => handleAdd()}>
              Add +
            </Button>
          </div>
        </div>
        {children}
      </div>
    </ContextDefinition.Provider>
  );
};

DefinitionBlock.Definition = Definition;
DefinitionBlock.Example = Example;

export default DefinitionBlock;
