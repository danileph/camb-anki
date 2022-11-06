/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useState } from 'react';
import { theme } from 'utils/theme';
import Label from './Label';
import TextArea from './TextArea';


export const styles = {
  base: css({
    boxShadow: '0px 0px 4px 0px rgba(34, 60, 80, 0.2) inset',
    background: theme.palette.secondary.darker,
    borderRadius: '12px',
    display: 'block',
    position: 'relative',
    zIndex: 1,
    'input, .multy-input': {
      width: '100%',
      height: '100%',
      borderRadius: '12px',
      border: 'none',
      background: 'none',
      zIndex: 3,
      position: 'relative',
      boxSizing: 'border-box',
      fontSize: '14px',
      ':focus': {
        // border: `1.5px solid ${theme.palette.gray.dark}`,
        outline: `2px solid ${theme.palette.primary.lightest}`,
      }
    }
  }),
  medium: css({
    borderRadius: '10px',
    'input': {
      borderRadius: '10px',
      padding: '10px',
      fontSize: '12px',
    }
  }),
  large: css({

  }),
  inputWithLabel: css({
    padding: '22px 15px 8px 15px',
  }),
  inputWithoutLabel: css({
    padding: '15px'
  }),
  placeholder: {
    base: css({
      '::-webkit-input-placeholder': {
        color: theme.palette.secondary.darkest,
        transition: 'all 0.2s',
        fontSize: '14px',
      }
    }),
    medium: css({
      '::-webkit-input-placeholder': {
        fontSize: '12px',
      }
    })
  }
}

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  icon?: React.ReactNode,
  withLabel?: boolean,
  css?: {},
  sizing?: 'large' | 'medium',
};

interface IInputComposition {
  TextArea: typeof TextArea;
}

const Input: FC<IInputProps> & IInputComposition = ({ sizing = 'large', icon, placeholder = '', withLabel = true, css = {}, className, value = '', onFocus = () => {}, onBlur = () => {}, ...other }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
   <div
    css={[
      styles.base,
      styles[sizing],
      css,
    ]}
    className={className}
   >
    {icon != null && icon}
    {placeholder !== '' && (
      <Label isLabel={isFocused || value !== ''} placeholderOnly={!withLabel} >{placeholder}</Label>
    )}
      <input
        css={[
          withLabel ? styles.inputWithLabel : styles.inputWithoutLabel,
          styles.placeholder.base,
          sizing === 'medium' && styles.placeholder.medium,
        ]}
        placeholder={!withLabel ? placeholder : undefined}
        type="text"
        onFocus={(e) => {setIsFocused(true); onFocus(e)}}
        onBlur={(e) => {setIsFocused(false); onBlur(e)}}
        value={value}
        {...other}
    />
   </div>
  )
};

Input.TextArea = TextArea;

export default Input;