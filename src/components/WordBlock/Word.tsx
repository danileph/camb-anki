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
      '> :last-child': {
        marginLeft: '10px',
      }
    })
  }
}

const Word: FC<IWordProps> = ({ partOfSpeech, pronounce, children }) => {
  return (
    <div>
      <Typography type='h1' css={styles.word.base} ><Label label={partOfSpeech}>{children}</Label></Typography>
      <div css={styles.pronouceBlock.base}>
        <Pronounce country='US'>{pronounce?.us?.transcription}</Pronounce>
        <Pronounce country='UK'>{pronounce?.uk?.transcription}</Pronounce>
      </div>
    </div>
  )
};

export default Word;