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
import { searchingWordState } from 'store/atoms/searchingWordState';
import { wordDataState } from 'store/atoms/wordDataState';
import { searchErrorState } from 'store/atoms/searchErrorState';
import Typography from 'components/UI/Typography/Typography';

function App() {
  const [title, setTitle] = React.useState('');
  const [headlines, setHeadlines] = React.useState<string[]>([]);
  const [ wordData ] = useRecoilState(wordDataState);
  const [ searchError ] = useRecoilState(searchErrorState);

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          setTitle(response.title);
          setHeadlines(response.headlines);
        });
    });
  });

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
      <Search />
      {searchError && (
        <Typography type='h1'>
          {'Oops... Not found :('}
        </Typography>
      )}
      {wordData?.map((word) => (
        <WordBlock>
          <WordBlock.Header>
            <WordBlock.Header.Word 
              partOfSpeech={word.partOfspeech} 
              pronounce={{uk: word.uk, us: word.us}}
            >
              {word.word}
            </WordBlock.Header.Word>
            {word.useCases.map((useCase) => (
              useCase.definition.map((definition) => (
                <WordBlock.DefinitionBlock
                  useCase={useCase.content}
                  level={definition.lvl}
                >
                  <WordBlock.DefinitionBlock.Definition>
                    {definition.content}
                  </WordBlock.DefinitionBlock.Definition>
                  <WordBlock.DefinitionBlock.Example>
                    {definition.examples}
                  </WordBlock.DefinitionBlock.Example>
                </WordBlock.DefinitionBlock>
              ))
            ))}
          </WordBlock.Header>
        </WordBlock>
      ))}
    </Layout>
  );
}

export default App;
