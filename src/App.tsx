import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import { DOMMessage, DOMMessageResponse } from "./types";
import { Layout } from "components/Layout";
import { Global } from "@emotion/react";
import { theme } from "utils/theme";
import { Input } from "components/UI/Input";
import Button from "components/UI/Button/Button";
import Space from "components/UI/Space/Space";
import { WordBlock } from "components/WordBlock";
import { Search } from "components/Search";
import { useRecoilState } from "recoil";
import { searchingWordState } from "store/searchingWord";
import { wordDataState } from "store/wordData";
import { searchErrorState } from "store/searchError";
import Typography from "components/UI/Typography/Typography";
import { Tab } from "components/Tab";
import { ALL_TABS } from "utils/tabs";
import { currentTabSelector, CURRENT_TAB } from "store/currentTab";
import { ankiFieldsSelector, ANKI_FIELDS } from "store/ankiFields";
import { currentDeckSelector, CURRENT_DECK } from "store/currentDeck";
import {
  currentNoteTypeSelector,
  CURRENT_NOTE_TYPE,
} from "store/currentNoteType";
import { sendMessageToBackground } from "utils/helpers/sendMessageToBackground";
import { PopupData, PopupMessage } from "utils/helpers/sendMessageToPopup";
import {
  MIDDLE_WORD_DATA,
  MiddleWordData,
  middleWordDataSelector,
  StateBound,
} from "./store/middleWordData";
import { AnkiField } from "./models/AnkiField";
import { log } from "util";

function App() {
  const [title, setTitle] = useState("");
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [currentTab, setCurrnetTab] = useRecoilState(currentTabSelector);
  const [ankiFields, setAnkiFields] = useRecoilState(ankiFieldsSelector);
  const [currentDeck, setCurrentDeck] = useRecoilState(currentDeckSelector);
  const [currentNoteType, setCurrentNoteType] = useRecoilState(
    currentNoteTypeSelector
  );
  const [searchingWord, setSearchingWord] = useRecoilState(searchingWordState);
  const [middleWordData, setMiddleWordData] = useRecoilState(
    middleWordDataSelector
  );

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.sync.get(
        [
          CURRENT_TAB,
          ANKI_FIELDS,
          CURRENT_DECK,
          CURRENT_NOTE_TYPE,
          MIDDLE_WORD_DATA,
        ],
        (res) => {
          // setCurrnetTab(res[CURRENT_TAB]);
          if (res[ANKI_FIELDS]) setAnkiFields(JSON.parse(res[ANKI_FIELDS]));
          setCurrentDeck(res[CURRENT_DECK]);
          setCurrentNoteType(res[CURRENT_NOTE_TYPE]);
          if (res[ANKI_FIELDS])
            setMiddleWordData(JSON.parse(res[MIDDLE_WORD_DATA]));
        }
      );
    }
  }, []);

  const popupShowHandler = () => {
    if (chrome.runtime) {
      sendMessageToBackground("popup_opened");
    }
  };

  useEffect(() => {
    popupShowHandler();
  }, []);

  const chromeRuntimeHandler = async (message: {
    type: PopupMessage;
    data: PopupData | undefined;
  }) => {
    const { type, data } = message;
    const searchBtn =
      document.querySelector<HTMLButtonElement>(".search-button");
    console.log(searchBtn);

    switch (type) {
      case "search_word":
        console.log(data);
        if (data?.selectedText) {
          await setSearchingWord(data.selectedText);
          searchBtn?.click();
        }
        break;

      case "add_as_example":
        console.log(data);
        if (data?.selectedText) {
          setAnkiFields(
            ankiFields.map((field, i) => {
              if (i === 2) {
                return {
                  name: field.name,
                  value: data.selectedText ? [data.selectedText] : field.value,
                };
              } else {
                return field;
              }
            })
          );
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (chrome.runtime) {
      chrome.runtime.onMessage.addListener(chromeRuntimeHandler);
    }
    return () => {
      chrome.runtime.onMessage.removeListener(chromeRuntimeHandler);
    };
  }, []);

  const areAllMiddleWordDataContentsEmpty = useMemo(() => {
    const foundKey = (
      Object.keys(middleWordData) as [keyof MiddleWordData]
    ).find(
      (key) =>
        middleWordData[key].content !== undefined &&
        middleWordData[key].content !== ""
    );
    return foundKey === undefined;
  }, [middleWordData]);

  useEffect(() => {
    if (!areAllMiddleWordDataContentsEmpty) {
      Object.entries(middleWordData).forEach(([key, value]) => {
        const middleData = value as StateBound<string>;
        middleData.indexFields.forEach((indexField) => {
          if (ankiFields[indexField] !== undefined) {
            setAnkiFields((currVal) =>
              currVal.map((ankiField, iAnkiField) => {
                return iAnkiField === indexField
                  ? {
                      ...ankiField,
                      value: middleData.content
                        ? [middleData.content]
                        : ankiField.value,
                    }
                  : ankiField;
              })
            );
          }
        });
      });
      let newMiddleWordData: { [key: string]: any } = {};
      (Object.keys(middleWordData) as [keyof MiddleWordData]).forEach((key) => {
        newMiddleWordData[key] = { ...middleWordData[key], content: undefined };
      });
      setMiddleWordData(newMiddleWordData as MiddleWordData);
    }
  }, [middleWordData]);

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
      <Global
        styles={{
          "@font-face": {
            fontFamily: "Mako",
            src: 'local("Mako"), url(./fonts/Mako/Mako-Regular.ttf) format("truetype")',
          },
          "*": {
            fontFamily: '"Moka", sans-serif',
            boxSizing: "border-box",
            color: theme.palette.primary.darkest,
            fontWeight: 700,
          },
          "html, body": {
            width: "400px",
            margin: 0,
            padding: 0,
          },
          "#root": {
            height: "100%",
          },
          "*::-webkit-scrollbar": {
            width: "7px",
          },
          "*::-webkit-scrollbar-track": {
            borderRadius: "0px",
            backgroundColor: theme.palette.secondary.darker,
          },
          "*::-webkit-scrollbar-track:hover": {
            backgroundColor: theme.palette.secondary.darker,
          },
          "*::-webkit-scrollbar-track:active": {
            backgroundColor: theme.palette.secondary.darker,
          },
          "*::-webkit-scrollbar-thumb": {
            borderRadius: "20px",
            backgroundColor: theme.palette.primary.normal,
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.primary.darker,
          },
          "*::-webkit-scrollbar-thumb:active": {
            backgroundColor: theme.palette.primary.darkest,
          },
        }}
      />
      {ALL_TABS.map((tab) => (
        <Tab.Body tabId={tab.tabId} currentTab={currentTab}>
          {tab.page}
        </Tab.Body>
      ))}
    </Layout>
  );
}

export default App;
