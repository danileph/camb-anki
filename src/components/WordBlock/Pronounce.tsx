/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { ReactComponent as IconAudio } from 'assets/icons/audio.svg';
import { css } from '@emotion/react';
import Typography from 'components/UI/Typography/Typography';

interface IPronounceProps extends React.HTMLAttributes<HTMLDivElement> {
  country?: 'UK' | 'US',
  audio?: string,
};

const styles = {
  root: {
    base: css({
      display: 'flex',
      alignItems: 'center',
      '> :last-child': {
        marginLeft: '10px',
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
      '> :last-child': {
        marginLeft: '5px'
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

const Pronounce: FC<IPronounceProps> = ({ children, country = 'UK' }) => {
  return (
    <div css={styles.root.base}>
      <div css={styles.audio.base}>
        <Typography css={styles.countryCaption.base}>{country}</Typography>
        <IconAudio />
      </div>
      <Typography css={styles.transcripiton.base}>{children}</Typography>
    </div>
  )
};

export default Pronounce;