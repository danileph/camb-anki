/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { DefinitionBlock } from 'components/WordBlock/DefititionBlock';
import { FC } from 'react';
import Header from './Header';

interface IWordBlockProps extends React.HTMLAttributes<HTMLDivElement>{

};

interface IWordBlockComposition {
  Header: typeof Header,
  DefinitionBlock: typeof DefinitionBlock,
}

const styles = {
  root: {
    base: css({
      marginTop: '35px'
    })
  }
}

const WordBlock: FC<IWordBlockProps> & IWordBlockComposition = ({ children }) => {
  return (
    <div css={styles.root.base}>
      {children}
    </div>
  )
};

WordBlock.Header = Header;
WordBlock.DefinitionBlock = DefinitionBlock;

export default WordBlock;