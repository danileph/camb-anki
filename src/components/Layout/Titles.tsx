/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Typography from 'components/UI/Typography/Typography';
import { FC } from 'react';
import { theme } from 'utils/theme';

interface ITitlesProps extends React.HTMLAttributes<HTMLDivElement> {

};

const styles = {
  base: css({
    position: 'absolute',
    top: '85px',
    marginLeft: '120px',
  })
}
const Titles: FC<ITitlesProps> = ({...other}) => {
  return (
    <div css={styles.base} {...other}>
      <Typography type='h1'>CambAnki</Typography>
      <Typography css={{marginTop: '2px', color: theme.palette.secondary.darker}}>Keep it simple</Typography>
    </div>
  )
};

export default Titles;