/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, Ref, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { searchErrorState } from "store/searchError";
import { wordDataState } from "store/wordData";
import { theme } from "utils/theme";
import { useIsFirstRender } from "usehooks-ts";

interface IMainProps extends React.HTMLAttributes<HTMLDivElement> {}

const styles = {
  base: css({
    background: theme.palette.secondary.normal,
    padding: "110px 25px 40px 25px",
    overflowY: "auto",
  }),
  setHeight: (height: number, isFirstRender: boolean) =>
    css({
      height: isFirstRender ? "600px" : undefined,
      maxHeight: !isFirstRender ? height - 70 : undefined,
    }),
};

const Main: FC<IMainProps> = ({ children, ...other }) => {
  const [windowHeight, setWindowHeight] = useState(600);
  const [wordData] = useRecoilState(wordDataState);
  const [searchError] = useRecoilState(searchErrorState);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <main
      css={[styles.base, styles.setHeight(windowHeight, isFirstRender)]}
      {...other}
    >
      {children}
    </main>
  );
};

export default Main;
