/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Typography from 'components/UI/Typography/Typography';
import { FC, useContext } from 'react';
import { theme } from 'utils/theme';
import { ContextDefinition } from '../DefinitionBlock';

interface IDefinitionProps  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: string,
};

const styles = {
  root: {
    base: css({
      fontSize: '16px',
      margin: '15px 0',
      color: theme.palette.primary.darkest,
      fontWeight: '700',
    })
  },
}

const Definition: FC<IDefinitionProps> = ({ children }) => {
  const context = useContext(ContextDefinition);
  context?.definition.set(children);

  return (
    <Typography css={styles.root.base}>
      {children}
    </Typography>
  )
};

export default Definition;