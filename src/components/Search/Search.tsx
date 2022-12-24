/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "components/UI/Button/Button";
import { Input } from "components/UI/Input";
import Space from "components/UI/Space/Space";
import { useAxios } from "hooks/useAxios";
import { WordType } from "models/WordType";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import { searchWord } from "services/cambParser";
import {
  SearchWordReqType,
  SearchWordResType,
} from "services/cambParser/searchWord";
import { isSearchingState } from "store/isSearching";
import { searchErrorState } from "store/searchError";
import { searchingWordState } from "store/searchingWord";
import { wordDataState } from "store/wordData";
import { theme } from "utils/theme";
import { autocompleteSearch } from "../../services/cambridge-dictionary/autocompleteSearch";
import { useDebounce, useIsFirstRender } from "usehooks-ts";
import Autocomplete from "./Autocomplete";
import { AutocompleteSearchType } from "../../models/AutocompleteSearchType";
import { log } from "util";
import { wordSuggestionsState } from "../../store/wordSuggestions";
import { searchTriggerState } from "../../store/searchTrigger";

interface ISearchProps extends React.HTMLAttributes<HTMLElement> {
  small?: boolean;
}

const styles = {
  root: {
    base: css({
      position: "relative",
      zIndex: 12,
    }),
  },
  search: {
    base: css({
      position: "relative",
    }),
  },
  input: {
    base: ({ buttonWidth }: { buttonWidth: number }) =>
      css({
        flexGrow: 1,
        "> input": {
          paddingRight: buttonWidth + 15,
        },
      }),
  },
  button: {
    base: css({
      position: "absolute",
      zIndex: 2,
      right: 0,
      // borderRadius: '0 12px 12px 0',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    }),
  },
};

const Search: FC<ISearchProps> = ({ small = false, ...other }) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [searchWordRequest, { data, loading, error }] = useAxios<
    SearchWordReqType,
    SearchWordResType
  >(searchWord);
  const [searchingWord, setSearchingWord] = useRecoilState(searchingWordState);
  const searchWordDebounced = useDebounce<string>(searchingWord, 200);
  const [suggestedWord, setSuggestedWord] = useState("");
  const [wordData, setWordData] = useRecoilState(wordDataState);
  const [wordSuggestions, setWordSuggestions] =
    useRecoilState(wordSuggestionsState);
  const [isSearching, setIsSearching] = useRecoilState(isSearchingState);
  const [searchError, setSearchError] = useRecoilState(searchErrorState);
  const [suggestions, setSuggestions] = useState<AutocompleteSearchType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSuggestedWordClicked, setIsSuggestedWordClicked] = useState(false);
  const isFirstRender = useIsFirstRender();
  const [autocompleteStatus, setAutocompleteStatus] = useState<
    "fetching" | "fetched" | "stopped"
  >("stopped");
  const [autocompleteResult, setAutocompleteResult] = useState<
    AutocompleteSearchType[]
  >([]);
  const [searchTrigger, setSearchTrigger] = useRecoilState(searchTriggerState);

  useLayoutEffect(() => {
    const searchButton =
      document.querySelector<HTMLButtonElement>(".search-button");

    if (searchButton) {
      setButtonWidth(Number(searchButton.offsetWidth));
    }
  }, []);

  // useEffect(() => {
  //   const searchInput =
  //     document.querySelector<HTMLInputElement>(".search-input");
  //   if (searchInput) searchInput.focus();
  // }, []);

  useEffect(() => {
    if (data?.wordData) {
      setSearchError(undefined);
      setWordSuggestions(undefined);
      setWordData(data.wordData);
      const main = document.querySelector("main");
      main?.scrollTo(0, 0);
    } else if (data?.wordSuggestions) {
      setSearchError(undefined);
      setWordData(undefined);
      setWordSuggestions(data.wordSuggestions);
      const main = document.querySelector("main");
      main?.scrollTo(0, 0);
    }
  }, [data]);

  useEffect(() => {
    setIsSearching(loading);
  }, [loading]);

  useEffect(() => {
    if (error) {
      setWordData(undefined);
      setSearchError(error);
    }
  }, [error]);

  useEffect(() => {
    (async () => {
      if (searchingWord !== "") {
        setAutocompleteStatus("fetching");
        const result = await autocompleteSearch({ query: searchWordDebounced });
        setAutocompleteResult(result);
        setAutocompleteStatus("fetched");
      }
    })();
  }, [searchWordDebounced]);

  useEffect(() => {
    if (autocompleteStatus === "fetched") {
      setSuggestions(autocompleteResult);
      console.log(suggestions);
      console.log(searchingWord);
      if (
        autocompleteResult.length !== 0 &&
        autocompleteResult[0].word === searchingWord
      ) {
        setSuggestedWord(autocompleteResult[0].word);
      }
    }
  }, [autocompleteStatus]);

  useEffect(() => {
    if (searchWordDebounced === "") setSuggestions([]);
  }, [searchWordDebounced]);

  useEffect(() => {
    if (!isFirstRender) {
      searchHandler();
    }
  }, [isSuggestedWordClicked]);

  useEffect(() => {
    if (!isFirstRender) {
      searchHandler();
    }
  }, [searchTrigger]);

  const searchHandler = () => {
    // setSuggestions([]);
    const searchInput =
      document.querySelector<HTMLInputElement>(".search-input");
    if (searchInput) searchInput.blur();

    if (suggestedWord !== "") {
      setSearchingWord(suggestedWord);
      const res = searchWordRequest({ word: suggestedWord });
    } else if (searchingWord !== "") {
      const res = searchWordRequest({ word: searchingWord });
    }
  };

  const inputHandler = async (e: React.FormEvent<HTMLInputElement>) => {
    setAutocompleteStatus("stopped");
    setSuggestions([]);
    setSearchingWord(e.currentTarget.value.toLowerCase());
    setSuggestedWord("");
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const indexOfCurrentOption = suggestions.findIndex(
      (option) => option.word === suggestedWord
    );

    if (e.key === "Enter") {
      e.preventDefault();
      searchHandler();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length === indexOfCurrentOption + 1) {
        setSuggestedWord(suggestions[0].word);
      } else {
        setSuggestedWord(suggestions[indexOfCurrentOption + 1].word);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (indexOfCurrentOption === 0) {
        setSuggestedWord(suggestions[suggestions.length - 1].word);
      } else {
        setSuggestedWord(suggestions[indexOfCurrentOption - 1].word);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length === indexOfCurrentOption + 1) {
        setSuggestedWord(suggestions[0].word);
      } else {
        setSuggestedWord(suggestions[indexOfCurrentOption + 1].word);
      }
    }
  };

  const onBlureHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      // setSuggestions([]);
      setShowSuggestions(false);
    }, 80);
  };

  const onFocuseHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
  };

  return (
    <div css={styles.root.base}>
      <Space css={[styles.search.base]} {...other}>
        <Input
          inputClassName="search-input"
          placeholder="Search for a word..."
          withLabel={false}
          css={[styles.input.base({ buttonWidth })]}
          sizing={small ? "medium" : "large"}
          onChange={(e) => inputHandler(e)}
          onBlur={(e) => onBlureHandler(e)}
          onFocus={(e) => onFocuseHandler(e)}
          value={suggestedWord || searchingWord}
          autoFocus
          onKeyDown={(e) => onKeyDownHandler(e)}
        />
        <Button
          size={small ? "medium" : "large"}
          className={"search-button"}
          css={[styles.button.base]}
          onClick={searchHandler}
        >
          {isSearching ? (
            <PulseLoader size="6px" color={theme.palette.secondary.normal} />
          ) : (
            "Search"
          )}
        </Button>
      </Space>
      <Autocomplete
        suggestionAbsolute={wordData !== undefined}
        isShown={showSuggestions}
        onChange={(suggestedWord, isClicked) => {
          setSuggestedWord(suggestedWord);
          if (isClicked) setIsSuggestedWordClicked(!isSuggestedWordClicked);
        }}
        currentOption={suggestedWord}
      >
        {suggestions}
      </Autocomplete>
    </div>
  );
};

export default Search;
