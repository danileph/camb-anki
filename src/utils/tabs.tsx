import { AboutPage } from "components/pages/AboutPage";
import { AddPage } from "components/pages/AddPage";
import { SearchPage } from "components/pages/SearchPage";
import { SettingsPage } from "components/pages/SettingsPage";
import React from "react";
import { CurrentTabType } from "store/currentTab";

export const ALL_TABS: {tabId: CurrentTabType, page: React.ReactNode, tabName: string, }[] = [
  {
    tabId: 'search',
    tabName: 'Search',
    page: <SearchPage />,
  },
  {
    tabId: 'add',
    tabName: 'Add',
    page: <AddPage />,
  },
  {
    tabId: 'settings',
    tabName: 'Settings',
    page: <SettingsPage />,
  },
  {
    tabId: 'about',
    tabName: 'About',
    page: <AboutPage />,
  },
]