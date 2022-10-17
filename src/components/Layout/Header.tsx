/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Search } from 'components/Search';
import { relative } from 'node:path/win32';
import { FC } from 'react';
import { theme } from 'utils/theme';
import Logo from './Logo';
import Titles from './Titles';

interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollTop?: number;
};

const styles = {
  base: css({
    height: '90px',
    background: theme.palette.primary.darkest,
    borderRadius: '8px 8px 0 0',
    padding: '10px 25px',
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }), 
  compacted: css({

  }),
  titles: css({
    marginLeft: '80px',
    '& > h1': {
      color: theme.palette.secondary.normal,
      fontSize: '18px',
      marginTop: 5,
    },
    '& > p': {
      display: 'none'
    },
  }),
  titlesPre: css({
    position: 'static',
    flexGrow: 1,
    marginLeft: '80px',
    '& > h1': {
      color: theme.palette.secondary.normal,
    },
    '& > p': {
      display: 'none'
    },
  }),
  logo: css({
    width: 65,
    height: 65,
    top: 13,
    '& > div': {
      width: 50,
      height: 50,
      '& > *': {
        width: 28,
      }
    }
  }),
  search: css({
    marginLeft: 80,
    marginBottom: 5,
    alignSelf: 'stretch',
  })
}

const Header: FC<IHeaderProps> = ({ scrollTop, ...other }) => {
  const isCompacted = scrollTop !== undefined && scrollTop > 24;
  const isExtraCompacted = scrollTop !== undefined && scrollTop > 155;

  return (
    <header css={[styles.base, isCompacted && styles.compacted]} {...other}>
      <Logo css={[isCompacted && styles.logo]} shrincted={isCompacted}/>
      <Titles css={[isCompacted && styles.titlesPre, isExtraCompacted && styles.titles,]} />
      {isExtraCompacted && <Search small css={[styles.search]} />}
    </header>
  )
};

export default Header;