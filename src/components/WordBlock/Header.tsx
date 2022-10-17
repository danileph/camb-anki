/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import Word from './Word';

interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {

};

interface IHeaderComposition {
  Word: typeof Word
}

const styles = {
  root: {
    base: css({
      marginBottom: '20px'
    })
  }
}

const Header: FC<IHeaderProps> & IHeaderComposition = ({ children }) => {
  return (
    <div css={styles.root.base}>
      {children}
    </div>
  )
};

Header.Word = Word

export default Header;