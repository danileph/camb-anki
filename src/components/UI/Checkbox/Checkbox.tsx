/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import uniqid from 'uniqid';

interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  children?: string,
};

const styles = {
  root: {
    base: css({
    })
  },
  input: {
    base: css({
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
    })
  },
  label: {
    base: css({
      display: 'inline-flex',
      alignItems: 'center',
      userSelect: 'none',
      '&::before': {
        content: '""',
        display: 'inline-block',
        width: '1em',
        height: '1em',
        flexShrink: 0,
        flexGrow: 0,
        border: '1px solid #adb5bd',
        borderRadius: '0.25em',
        marginRight: '0.5em',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '50% 50%',
      }
    })
  }
}

const Checkbox: FC<ICheckboxProps> = ({ id, children, ...other}) => {
  const inputId = id || uniqid('checkbox-');

  return (
    <div>
      <input css={styles.input.base} type="checkbox" id={inputId} />
      <label css={styles.label.base} htmlFor={inputId}>{children}</label>
    </div>
  )
};

export default Checkbox;