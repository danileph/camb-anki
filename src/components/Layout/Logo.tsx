/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { FC } from 'react';
import { theme } from 'utils/theme';
import { ReactComponent as LogoIcon } from 'assets/icons/Logo.svg'
import { useRecoilState } from 'recoil';
import { isSearchingState } from 'store/isSearching';
import { BounceLoader } from 'react-spinners';

interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {
  shrincted?: boolean;
};

const styles = {
  base: css({
    width: '100px',
    height: '100px',
    background: theme.palette.primary.normal,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 'calc(90px/2 - 5px)',
    '> div': {
      width: '75px',
      height: '75px',
      background: theme.palette.secondary.normal,
      borderRadius: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }),
  imgWrap: css({
    position: 'relative',
    '& > *': {
      marginTop: '5px'
    }
  }),
  spinner: css({
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    marginTop: '0px',
  })
}

const Logo: FC<ILogoProps> = ({ shrincted = false, ...other }) => {
  const [ isSearching ] = useRecoilState(isSearchingState);

  return (
    <div
      css={[
        styles.base,
      ]}
      {...other}
    >
      <div
        css={styles.imgWrap}
      >
        <LogoIcon />
        {isSearching && <div css={styles.spinner}><BounceLoader color={theme.palette.primary.darkest} size={shrincted ? '50px' : '75px'} /></div>}
      </div>
    </div>
  )
};

export default Logo;