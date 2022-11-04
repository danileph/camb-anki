/** @jsxImportSource @emotion/react */
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { styles } from './Input';
import Label from './Label';
import {Editor, EditorState} from 'draft-js';
import { ContentEditable } from 'components/ContentEditable';
import { IContentEditableProps } from 'components/ContentEditable/ContentEditable';


interface ITextAreaProps extends IContentEditableProps<'div'> {
  icon?: React.ReactNode,
  withLabel?: boolean,
  css?: {},
  sizing?: 'large' | 'medium',
  multy?: boolean,
};

const TextArea: FC<ITextAreaProps> = ({ sizing = 'large', icon, placeholder = '', withLabel = true, css = {}, className, contentValue, ...other }) => {
  const [isFocused, setIsFocused] = useState(false);
  const refInput = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (refInput.current) {
  //     refInput.current.textContent = children;
  //   }
  // })
  
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
      <Label isLabel={isFocused || (contentValue?.length !== 0 && contentValue !== undefined)} placeholderOnly={!withLabel} >{placeholder}</Label>
    )}
      <ContentEditable
        className='multy-input'
        css={[
          withLabel ? styles.inputWithLabel : styles.inputWithoutLabel,
          styles.placeholder.base,
          sizing === 'medium' && styles.placeholder.medium,
        ]}
        placeholder={!withLabel ? placeholder : undefined}
        onFocus={() => {setIsFocused(true)}}
        onBlur={() => {setIsFocused(false)}}
        contentValue={contentValue}
        {...other}
      />
    </div>
  )
};

export default TextArea;