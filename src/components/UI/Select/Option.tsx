/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { theme } from 'utils/theme';

interface IOptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id' | 'children'> {
  id: string,
  children: string,
  isChecked?: boolean,
};

const styles = {
  root: {
    base: css({
      padding: '8px 12px',
      borderRadius: '12px',
      cursor: 'pointer',
      // '&:hover': {
      //   background: theme.palette.primary.lighter,
      //   color: theme.palette.secondary.normal,
      // }
    }),
    checked: css({
      background: theme.palette.primary.darker,
      color: theme.palette.secondary.normal,
      // '&:hover': {
      //   background: theme.palette.primary.lightest,
      //   color: theme.palette.secondary.normal,
      // }
    })
  }
}

const Option: FC<IOptionProps> = ({ isChecked = false, id, children, ...other }) => {
  return (
    <div
      css={[
        styles.root.base,
        isChecked && styles.root.checked,
      ]}
      id={id}
      {...other}
    >
      {children}
    </div>
  )
};

export default Option;