import { Search } from 'components/Search';
import Typography from 'components/UI/Typography/Typography';
import { WordBlock } from 'components/WordBlock';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchErrorState } from 'store/searchError';
import { wordDataState } from 'store/wordData';

interface ISearchPageProps {

};

const SearchPage: FC<ISearchPageProps> = () => {
  const [ wordData ] = useRecoilState(wordDataState);
  const [ searchError ] = useRecoilState(searchErrorState);

  return (
    <>
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
          </WordBlock.Header>
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
          
        </WordBlock>
      ))}
    </>
  )
};

export default SearchPage;