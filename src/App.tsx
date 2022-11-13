import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import { DOMMessage, DOMMessageResponse } from './types';
import { Layout } from 'components/Layout';
import { Global } from '@emotion/react';
import { theme } from 'utils/theme';
import { Input } from 'components/UI/Input';
import Button from 'components/UI/Button/Button';
import Space from 'components/UI/Space/Space';
import { WordBlock } from 'components/WordBlock';
import { Search } from 'components/Search';
import { useRecoilState } from 'recoil';
import { searchingWordState } from 'store/searchingWord';
import { wordDataState } from 'store/wordData';
import { searchErrorState } from 'store/searchError';
import Typography from 'components/UI/Typography/Typography';
import { Tab } from 'components/Tab';
import { ALL_TABS } from 'utils/tabs';
import { currentTabSelector, CURRENT_TAB } from 'store/currentTab';
import { ankiFieldsSelector, ANKI_FIELDS } from 'store/ankiFields';
import { currentDeckSelector, CURRENT_DECK } from 'store/currentDeck';
import { currentNoteTypeSelector, CURRENT_NOTE_TYPE } from 'store/currentNoteType';

function App() {
  const [title, setTitle] = useState('');
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [currentTab, setCurrnetTab] = useRecoilState(currentTabSelector);
  const [ ankiFields, setAnkiFields ] = useRecoilState(ankiFieldsSelector);
  const [ currentDeck, setCurrentDeck ] = useRecoilState(currentDeckSelector);
  const [ currentNoteType, setCurrentNoteType ] = useRecoilState(currentNoteTypeSelector);

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.sync.get([CURRENT_TAB, ANKI_FIELDS, CURRENT_DECK, CURRENT_NOTE_TYPE], (res) => {
        // setCurrnetTab(res[CURRENT_TAB]);
        console.log(res[CURRENT_DECK]);
        if (res[ANKI_FIELDS]) setAnkiFields(JSON.parse(res[ANKI_FIELDS]));
        setCurrentDeck(res[CURRENT_DECK]);
        setCurrentNoteType(res[CURRENT_NOTE_TYPE]);
      })
    }
  }, [])

  // useEffect(() => {
  //   if (ankiFields.length === 0) {
  //     setAnkiFields([
  //       {name: 'Word', value: undefined},
  //       {name: 'Meaning', value: undefined},
  //       {name: 'Example', value: undefined},
  //     ])
  //   }
  // }, [])

  // React.useEffect(() => {
  //   /**
  //    * We can't use "chrome.runtime.sendMessage" for sending messages from React.
  //    * For sending messages from React we need to specify which tab to send it to.
  //    */
  //   chrome.tabs && chrome.tabs.query({
  //     active: true,
  //     currentWindow: true
  //   }, tabs => {
  //     /**
  //      * Sends a single message to the content script(s) in the specified tab,
  //      * with an optional callback to run when a response is sent back.
  //      *
  //      * The runtime.onMessage event is fired in each content script running
  //      * in the specified tab for the current extension.
  //      */
  //     chrome.tabs.sendMessage(
  //       tabs[0].id || 0,
  //       { type: 'GET_DOM' } as DOMMessage,
  //       (response: DOMMessageResponse) => {
  //         setTitle(response.title);
  //         setHeadlines(response.headlines);
  //       });
  //   });
  // });

  return (
    <Layout>
      <Global styles={{
        '@font-face': {
          fontFamily: "Mako",
          src: 'local("Mako"), url(./fonts/Mako/Mako-Regular.ttf) format("truetype")',
        },        
        '*': {
          fontFamily: '"Moka", sans-serif',
          boxSizing: 'border-box',
          color: theme.palette.primary.darkest,
          fontWeight: 700,
        },
        'html, body': {
          width: '400px',
          margin: 0,
          padding: 0,
        },
        '#root': {
          height: '100%',
        },
        '*::-webkit-scrollbar': {
          width: '7px',
        },
        '*::-webkit-scrollbar-track': {
          borderRadius: '0px',
          backgroundColor: theme.palette.secondary.darker,
        },
        '*::-webkit-scrollbar-track:hover': {
          backgroundColor: theme.palette.secondary.darker,
        },
        '*::-webkit-scrollbar-track:active': {
          backgroundColor: theme.palette.secondary.darker,
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '20px',
          backgroundColor: theme.palette.primary.normal,
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.darker,
        },
        '*::-webkit-scrollbar-thumb:active': {
          backgroundColor: theme.palette.primary.darkest,
        }
      }} />
      {ALL_TABS.map((tab) => (
        <Tab.Body tabId={tab.tabId} currentTab={currentTab} >
          {tab.page}
        </Tab.Body>
      ))}
    </Layout>
  );
}

export default App;
