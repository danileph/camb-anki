import { Search } from "components/Search";
import { Checkbox } from "components/UI/Checkbox";
import Typography from "components/UI/Typography/Typography";
import { WordBlock } from "components/WordBlock";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { searchErrorState } from "store/searchError";
import { wordDataState } from "store/wordData";
import { wordSuggestionsState } from "../../store/wordSuggestions";
import SuggestionsBlock from "../../components/SuggestionsBlock";

interface ISearchPageProps {}

const SearchPage: FC<ISearchPageProps> = () => {
  const [wordData] = useRecoilState(wordDataState);
  const [wordSuggestions] = useRecoilState(wordSuggestionsState);
  const [searchError] = useRecoilState(searchErrorState);

  return (
    <>
      <Search />
      {searchError && (
        <Typography type="h1">{"Oops... Not found :("}</Typography>
      )}
      {wordData &&
        wordData.map((word) => (
          <WordBlock>
            <WordBlock.Header>
              <WordBlock.Header.Word
                partOfSpeech={word.partOfspeech}
                pronounce={{ uk: word.uk, us: word.us }}
              >
                {word.word}
              </WordBlock.Header.Word>
            </WordBlock.Header>
            {word.useCases.map((useCase) =>
              useCase.definition.map((definition) => (
                <WordBlock.DefinitionBlock
                  useCase={useCase.content}
                  level={definition.lvl}
                  currentWord={word}
                >
                  <WordBlock.DefinitionBlock.Definition>
                    {definition.content}
                  </WordBlock.DefinitionBlock.Definition>
                  <WordBlock.DefinitionBlock.Example>
                    {definition.examples}
                  </WordBlock.DefinitionBlock.Example>
                </WordBlock.DefinitionBlock>
              ))
            )}
          </WordBlock>
        ))}
      {wordSuggestions && <SuggestionsBlock suggestions={wordSuggestions} />}
    </>
  );
};

export default SearchPage;
