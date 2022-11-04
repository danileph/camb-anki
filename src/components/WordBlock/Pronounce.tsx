/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { css } from '@emotion/react';
import Typography from 'components/UI/Typography/Typography';
import { Audio } from 'components/Audio';

interface IPronounceProps extends React.HTMLAttributes<HTMLDivElement> {
  country: 'UK' | 'US',
  audio: string,
};

const styles = {
  root: {
    base: css({
      display: 'flex',
      alignItems: 'center',
      '> :first-child': {
        marginRight: '10px',
      },
      '*': {
        marginTop: 0,
        marginBottom: 0,
      }
    })
  },
  audio: {
    base: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& > :first-child': {
        marginRight: '5px'
      }
    })
  },
  countryCaption: {
    base: css({
      margin: 0,
      fontSize: '12px',
    })
  },
  transcripiton: {
    base: css({
      margin: 0,
      fontSize: '14px'
    })
  }
}

const Pronounce: FC<IPronounceProps> = ({ children, country = 'UK', audio }) => {
  return (
    <div css={styles.root.base}>
      <div css={styles.audio.base}>
        <Typography css={styles.countryCaption.base}>{country}</Typography>
        <Audio audioSrc={audio}/>
      </div>
      <Typography css={styles.transcripiton.base}>{`[${children}]`}</Typography>
    </div>
  )
};

export default Pronounce;