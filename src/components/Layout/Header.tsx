/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Search } from "components/Search";
import { Tab } from "components/Tab";
import { relative } from "node:path/win32";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { currentTabSelector } from "store/currentTab";
import { ALL_TABS } from "utils/tabs";
import { theme } from "utils/theme";
import Logo from "./Logo";
import Titles from "./Titles";
import { useProgressiveImage } from "../../hooks/useProgressiveImage";
import snowflakes from "assets/christmas/snowflakes.png";

interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollTop?: number;
}

const Header: FC<IHeaderProps> = ({ scrollTop, ...other }) => {
  const [currentTab, setCurrentTab] = useRecoilState(currentTabSelector);
  const isCompacted = scrollTop !== undefined && scrollTop > 24;
  const isExtraCompacted = scrollTop !== undefined && scrollTop > 155;
  const snowflakesImg = useProgressiveImage(snowflakes);

  const styles = {
    base: css({
      height: "90px",
      background: theme.palette.primary.darkest,
      padding: "10px 25px",
      position: "relative",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      justifyContent: "flex-end",
      transition: theme.transition,
      "&:before": {
        content: '""',
        display: "inline-block",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        backgroundImage: `url(${snowflakesImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex: "0",
        opacity: "0.5",
        transition: theme.transition,
      },
    }),
    compacted: css({}),
    titles: css({
      marginLeft: "80px",
      "& > h1": {
        color: theme.palette.secondary.normal,
        fontSize: "18px",
        marginTop: 5,
      },
      "& > p": {
        display: "none",
      },
    }),
    titlesPre: css({
      position: "static",
      flexGrow: 1,
      marginLeft: "80px",
      marginBottom: "15px",
      "& > h1": {
        color: theme.palette.secondary.normal,
      },
      "& > p": {
        display: "none",
      },
    }),
    logo: css({
      width: 65,
      height: 65,
      top: 13,
      "& > div": {
        width: 50,
        height: 50,
        "& > *": {
          width: 28,
        },
      },
    }),
    search: css({
      marginLeft: 80,
      marginBottom: 5,
      alignSelf: "stretch",
    }),
    tabGroup: css({
      marginLeft: 120,
      marginBottom: -10,
      transition: theme.transition,
    }),
    tabGroupShrinked: css({
      marginLeft: 200,
      display: "none",
      transition: theme.transition,
    }),
  };

  return (
    <header css={[styles.base, isCompacted && styles.compacted]} {...other}>
      <div style={{ zIndex: "2" }}>
        <Logo css={[isCompacted && styles.logo]} shrincted={isCompacted} />
        <Titles
          css={[
            isCompacted && styles.titlesPre,
            // isExtraCompacted && currentTab === "search" && styles.titles,
          ]}
        />
        {/*{isExtraCompacted && currentTab === 'search' && <Search small css={[styles.search]} />}*/}
        <Tab.Group
          css={[styles.tabGroup, isCompacted && styles.tabGroupShrinked]}
        >
          {ALL_TABS.map((tab) => (
            <Tab
              tabId={tab.tabId}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
              key={tab.tabId}
            >
              {tab.tabName}
            </Tab>
          ))}
        </Tab.Group>
      </div>
    </header>
  );
};

export default Header;
