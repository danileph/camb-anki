/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, Ref, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchErrorState } from 'store/atoms/searchErrorState';
import { wordDataState } from 'store/atoms/wordDataState';
import { theme } from 'utils/theme';

interface IMainProps extends React.HTMLAttributes<HTMLDivElement> {

};

const styles = {
  base: css({
    background: theme.palette.secondary.normal,
    padding: '110px 25px 40px 25px',
    borderRadius: '0 0 8px 8px',
    overflowY: 'auto',
  }),
  setHeight: (height: number) => css({
    maxHeight: height - 90 - 1,
  })
}

const Main: FC<IMainProps> = ({ children, ...other }) => {
  const [windowHeight, setWindowHeight] = useState(600);
  const [wordData] = useRecoilState(wordDataState);
  const [searchError] = useRecoilState(searchErrorState);

  useEffect(() => {
    console.log(window.innerHeight)
    if (wordData !== undefined || searchError !== undefined) {
      setWindowHeight(window.innerHeight);
    }
  }, [wordData, searchError])

  return (
    <main
      css={[styles.base, styles.setHeight(windowHeight)]}
      {...other}
    >
      {children}
    </main>
  )
};

export default Main;