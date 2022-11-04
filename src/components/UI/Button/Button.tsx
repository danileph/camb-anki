/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { theme } from 'utils/theme';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  css?: {},
  size?: 'large' | 'small' | 'medium',
  outline?: boolean,
  fullWidth?: boolean,
};

const styles = {
  root: {
    base: css({
      transition: theme.transition,
      cursor: 'pointer',
      padding: '15px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '14px',
      background: theme.palette.primary.lightest,
      color: theme.palette.secondary.normal,
      ':hover': {
        background: theme.palette.primary.lighter,
      },
      textTransform: 'uppercase',
      ':focus-visible': {
        outline: `3px solid ${theme.palette.primary.lighter}`,
        outlineOffset: '-3px',
      }
    }),
    large: css({

    }),
    small: css({
      padding: '6px 12px',
      fontSize: '10px',
      borderRadius: '8px',
      textTransform: 'capitalize',
    }),
    medium: css({
      padding: '10px 12px',
      fontSize: '12px',
      borderRadius: '10px',
      // textTransform: 'capitalize',
    }),
    outline: css({
      background: 'none',
      outline: `3px solid ${theme.palette.primary.lightest}`,
      outlineOffset: '-3px',
      color: theme.palette.primary.lightest,
      ':hover': {
        color: theme.palette.primary.lighter,
        background: 'none',
        outline: `3px solid ${theme.palette.primary.lighter}`,
      },
    }),
    fullWidth: css({
      display: 'block',
    }),
  }
}

const Button: FC<IButtonProps> = ({ children, css, size = 'large', outline = false, fullWidth = false, ...other }) => {
  return (
    <button
      css={[
        styles.root.base,
        styles.root[size],
        outline && styles.root.outline,
        fullWidth && styles.root.fullWidth,
        css,
      ]}
      {...other}
    >
      {children}
    </button>
  )
};

export default Button;