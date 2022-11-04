/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input';
import Space from 'components/UI/Space/Space';
import { useAxios } from 'hooks/useAxios';
import { WordType } from 'models/WordType';
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import { searchWord } from 'services/cambParser';
import { SearchWordType } from 'services/cambParser/searchWord';
import { isSearchingState } from 'store/isSearching';
import { searchErrorState } from 'store/searchError';
import { searchingWordState } from 'store/searchingWord';
import { wordDataState } from 'store/wordData';
import { theme } from 'utils/theme';

interface ISearchProps extends React.HTMLAttributes<HTMLElement> {
  small?: boolean;
};

const styles = {
  root: {
    base: css({
      position: 'relative',
    })
  },
  input: {
    base: ({ buttonWidth }: {buttonWidth: number}) => css({
      flexGrow: 1,
      '> input': {
        paddingRight: buttonWidth + 15,
      }
    })
  },
  button: {
    base: css({
      position: 'absolute',
      zIndex: 2,
      right: 0,
      // borderRadius: '0 12px 12px 0',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    })
  }
}

const Search: FC<ISearchProps> = ({ small = false, ...other }) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [searchWordRequest, { data, loading, error }] = useAxios<SearchWordType, WordType[]>(searchWord);
  const [searchingWord, setSearchingWord] = useRecoilState(searchingWordState);
  const [wordData, setWordData] = useRecoilState(wordDataState);
  const [isSearching, setIsSearching] = useRecoilState(isSearchingState);
  const [searchError, setSearchError] = useRecoilState(searchErrorState);

  useLayoutEffect(() => {
    const searchButton = document.querySelector<HTMLButtonElement>('.search-button');
    
    if (searchButton) {
      setButtonWidth(Number(searchButton.offsetWidth));
    }

  }, []);

  useEffect(() => {
    if (data) {
      setSearchError(undefined);
      setWordData(data);
      const main = document.querySelector('main');
      main?.scrollTo(0,0);
    }
  }, [data]);

  useEffect(() => {
    setIsSearching(loading);
  }, [loading])

  useEffect(() => {
    if (error) {
      setWordData(undefined);
      setSearchError(error);
    }
  }, [error])

  const searchHandler = () => {
    if (searchingWord !== '') {
      const res = searchWordRequest({word: searchingWord});
    }
  }

  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchingWord(e.currentTarget.value);
  }

  const engterDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchHandler();
    }
  }

  return (
    <Space
      css={[styles.root.base]}
      {...other}
    >
    <Input 
      placeholder='Search for a word...' 
      withLabel={false}
      css={[styles.input.base({buttonWidth})]}
      sizing={small ? 'medium' : 'large'}
      onChange={(e) => inputHandler(e)}
      value={searchingWord}
      autoFocus
      onKeyDown={(e) => engterDownHandler(e)}
    />
    <Button
      size={small ? 'medium' : 'large'}
      className={'search-button'} 
      css={[styles.button.base]}
      onClick={searchHandler}
    >
      {isSearching ? <PulseLoader size="6px" color={theme.palette.secondary.normal} /> : 'Search'}
    </Button>
  </Space>
  )
};

export default Search;
