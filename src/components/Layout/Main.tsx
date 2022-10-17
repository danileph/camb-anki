/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, Ref } from 'react';
import { theme } from 'utils/theme';

interface IMainProps extends React.HTMLAttributes<HTMLDivElement> {

};

const styles = {
  base: css({
    background: theme.palette.secondary.normal,
    padding: '110px 25px 40px 25px',
    borderRadius: '0 0 8px 8px',
    maxHeight: '500px',
    overflowY: 'auto',
  })
}

const Main: FC<IMainProps> = ({ children, ...other }) => {
  return (
    <main
      css={styles.base}
      {...other}
    >
      {children}
    </main>
  )
};

export default Main;