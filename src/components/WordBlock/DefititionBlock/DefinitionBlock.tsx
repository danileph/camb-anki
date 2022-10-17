/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from 'components/UI/Button/Button';
import { Label } from 'components/UI/Label';
import Typography from 'components/UI/Typography/Typography';
import { FC } from 'react';
import { theme } from 'utils/theme';
import Definition from './Definition/Definition';
import { Example } from './Example';

interface IDefinitionBlockProps extends React.HTMLAttributes<HTMLDivElement>{
  useCase: string,
  level: string,
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

const DefinitionBlock: FC<IDefinitionBlockProps> & IDefinitionBlockComposition = ({ children, useCase, level }) => {
  return (
    <div css={styles.root.base}>
      <div css={styles.header.base}>
        <Typography css={styles.labelCaption.base}>
          {level ? <Label label={level} labelCss={styles.label.base}>{useCase}</Label> : useCase}
        </Typography>
        <div><Button size='small'>Add +</Button></div>
      </div>
      {children}
    </div>
  )
};

DefinitionBlock.Definition = Definition;
DefinitionBlock.Example = Example;

export default DefinitionBlock;