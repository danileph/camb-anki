/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, MutableRefObject, useRef, useState } from 'react';
import { theme } from 'utils/theme';
import Header from './Header';
import Main from './Main';

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {

};

const styles = {
  base: css({
    height: '100%',
  })
}

const Layout: FC<ILayoutProps> = ({ children, ...other }) => {
  const headerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const scrollHandler = () => {
    const main = document.querySelector<HTMLDivElement>('main');
    if (main) {
      setScrollTop(main.scrollTop);
    }
  }

  return (
    <div
      css={styles.base}
      {...other}
    >
      <Header scrollTop={scrollTop} />
      <Main onScroll={scrollHandler}>
        {children}
      </Main>
    </div>
  )
};

export default Layout;