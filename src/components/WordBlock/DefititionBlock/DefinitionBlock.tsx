/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from 'components/UI/Button/Button';
import { Label } from 'components/UI/Label';
import Typography from 'components/UI/Typography/Typography';
import React, { FC, ReactElement, ReactNode, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ankiFieldsSelector } from 'store/ankiFields';
import { currentTabSelector } from 'store/currentTab';
import { searchingWordState } from 'store/searchingWord';
import { theme } from 'utils/theme';
import Definition from './Definition/Definition';
import { Example } from './Example';

interface IDefinitionBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>{
  useCase: string,
  level: string,
  children:  ReactElement[],
  word: string,
};

interface IDefinitionBlockComposition {
  Definition: typeof Definition,
  Example: typeof Example
}

const styles = {
  root: {
    base: css({
      padding: '15px',
      background: theme.palette.secondary.darker,
      borderRadius: '12px',
      margin: '10px 0',
      ':last-child': {
        marginBottom: 0,
      }
    })
  },
  header: {
    base: css({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    })
  },
  label: {
    base: css({
      fontStyle: 'normal',
    })
  },
  labelCaption: {
    base: css({
      margin: 0,
      textTransform: 'uppercase',
      fontSize: '12px'
    })
  }
}


export interface IContextDefinition {
  example: {
    set: (newValue: string | undefined) => any,
    get: string | undefined,
  },
  definition: {
    set: (newValue: string | undefined) => any,
    get: string | undefined,
  }
}

export const ContextDefinition = React.createContext<IContextDefinition | null>(null);

const DefinitionBlock: FC<IDefinitionBlockProps> & IDefinitionBlockComposition = ({ word, children, useCase, level }) => {
  const [example, setExample] = useState<string>();
  const [definition, setDefinition] = useState<string>();
  const [ ankiFields, setAnkiFields ] = useRecoilState(ankiFieldsSelector);
  const [ searchingWord ] = useRecoilState(searchingWordState);
  const [ currentTab, setCurrentTab ] = useRecoilState(currentTabSelector);

  const defaultContext: IContextDefinition = {
    example: {
      set: setExample,
      get: example,
    },
    definition: {
      set: setDefinition,
      get: definition,
    }
  }

  const handleAdd = () => {

    setAnkiFields(ankiFields.map((field, i) => {
      if (i === 0) {
        return {...field, value: [word]}
      } else if (i === 1) {
        return {...field, value: definition ? [definition] : field.value}
      } else if (i === 2) {
        return {...field, value: example ? [example] : field.value}
      } else {
        return field
      }
    }))

    setCurrentTab('add');
  }
  
  return (
    <ContextDefinition.Provider value={defaultContext}>
      <div css={styles.root.base}>
      <div css={styles.header.base}>
        <Typography css={styles.labelCaption.base}>
          {level ? <Label label={level} labelCss={styles.label.base}>{useCase}</Label> : useCase}
        </Typography>
        <div><Button size='small' onClick={() => handleAdd()}>Add +</Button></div>
      </div>
      {children}
    </div>
    </ContextDefinition.Provider>
  )
};

DefinitionBlock.Definition = Definition;
DefinitionBlock.Example = Example;

export default DefinitionBlock;