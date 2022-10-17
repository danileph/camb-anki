/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Typography from 'components/UI/Typography/Typography';
import { FC } from 'react';

interface IDefinitionProps  extends React.HTMLAttributes<HTMLDivElement> {

};

const styles = {
  root: {
    base: css({
      fontSize: '16px',
      margin: '15px 0',
    })
  },
}

const Definition: FC<IDefinitionProps> = ({ children }) => {
  return (
    <Typography css={styles.root.base}>
      {children}
    </Typography>
  )
};

export default Definition;