/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { theme } from 'utils/theme';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  css?: {},
  size?: 'large' | 'small' | 'medium',
};

const styles = {
  root: {
    base: css({
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
    })
  }
}

const Button: FC<IButtonProps> = ({ children, css, size = 'large', ...other }) => {
  return (
    <button
      css={[
        styles.root.base,
        styles.root[size],
        css,
      ]}
      {...other}
    >
      {children}
    </button>
  )
};

export default Button;