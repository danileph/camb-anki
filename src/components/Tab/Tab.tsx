/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { CurrentTabType } from "store/currentTab";
import { theme } from "utils/theme";
import Body from "./Body";
import Group from "./Group";

interface ITabProps extends React.HTMLAttributes<HTMLDivElement> {
  setCurrentTab: (...args: any) => any;
  currentTab: string;
  tabId: string;
}

interface ITabCompound {
  Body: typeof Body;
  Group: typeof Group;
}

const styles = {
  root: {
    base: css({
      transition: theme.transition,
      color: theme.palette.secondary.normal,
      background: theme.palette.primary.normal,
      padding: "6px 10px",
      borderRadius: "8px 8px 0 0",
      fontSize: "10px",
      cursor: "pointer",
      "&:hover": {
        position: "relative",
        paddingBottom: "10px",
        background: theme.palette.primary.lighter,
        color: theme.palette.secondary.normal,
      },
    }),
    chosen: css({
      color: theme.palette.primary.darker,
      background: theme.palette.secondary.normal,
      "&:hover": {
        color: theme.palette.primary.darker,
        background: theme.palette.secondary.normal,
      },
    }),
  },
};

const Tab: FC<ITabProps> & ITabCompound = ({
  children,
  currentTab,
  setCurrentTab,
  tabId,
  ...other
}) => {
  return (
    <div
      css={[styles.root.base, currentTab === tabId && styles.root.chosen]}
      onClick={() => setCurrentTab(tabId)}
      {...other}
    >
      {children}
    </div>
  );
};

Tab.Body = Body;
Tab.Group = Group;

export default Tab;
