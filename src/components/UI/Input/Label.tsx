/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { theme } from 'utils/theme';

const styles = {
  base: css({
    position: 'absolute',
    paddingLeft: '15px',
    transform: 'translate(0, 15px)',
    zIndex: 2,
    color: theme.palette.secondary.darkest,
    transition: 'all 0.2s',
    fontSize: '14px',
  }),
  isLabel: css({
    transform: 'translate(0, 6px)',
    fontSize: '12px'
  }),
  placeholderOnly: css({
    display: 'none',
  })
}

interface ILabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  isLabel?: boolean,
  placeholderOnly?: boolean,
};

const Label: FC<ILabelProps> = ({ isLabel = 'true', children, placeholderOnly = false, ...other }) => {
  return (
    <span
      css={[
        styles.base,
        placeholderOnly && styles.placeholderOnly,
        isLabel && styles.isLabel,
      ]}
      {...other}
    >
      {children}
    </span>
  )
};

export default Label;