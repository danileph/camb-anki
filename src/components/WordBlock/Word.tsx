/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Label } from 'components/UI/Label';
import Typography from 'components/UI/Typography/Typography';
import { FC } from 'react';
import { theme } from 'utils/theme';
import Pronounce from './Pronounce';

interface IPronouce {
  us?: {
    transcription: string,
    audio: string,
  },
  uk?: {
    transcription: string,
    audio: string,
  }
}

interface IWordProps extends React.HTMLAttributes<HTMLDivElement> {
  partOfSpeech: string,
  pronounce?: IPronouce
};

const styles = {
  root: {
    base: css({
    })
  },
  word: {
    base: css({
      color: theme.palette.primary.lightest,
      marginBottom: '8px',
    })
  },
  pronouceBlock: {
    base: css({
      display: 'flex',
      '> :first-child': {
        marginRight: '10px',
      }
    })
  }
}

const Word: FC<IWordProps> = ({ partOfSpeech, pronounce, children }) => {
  console.log(pronounce)
  return (
    <div>
      <Typography type='h1' css={styles.word.base} ><Label label={partOfSpeech}>{children}</Label></Typography>
      <div css={styles.pronouceBlock.base}>
        {pronounce?.uk?.transcription && pronounce?.uk?.audio ? <Pronounce country='UK' audio={pronounce.uk.audio}>{pronounce?.uk?.transcription}</Pronounce> : null}
        {pronounce?.us?.transcription && pronounce?.us?.audio ? <Pronounce country='US' audio={pronounce.us.audio}>{pronounce?.us?.transcription}</Pronounce> : null}
      </div>
    </div>
  )
};

export default Word;