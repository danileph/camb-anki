/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { createContext, FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { theme } from 'utils/theme';
import { Input } from '../Input';
import Option from './Option';
import uniqid from 'uniqid';

interface OptionType {
  id: string,
  name: string,
}

interface ISelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: OptionType[] | undefined,
  value?: string | undefined,
  placeholder?: string,
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
  isLoading?: boolean,

  onChangeValue?: (newValue: string | undefined) => void,
  onOpen?: () => void,
  onCloze?: () => void,
};

const styles = {
  root: {
    base: ({ width, height }: {width: number, height: number}) => css({
      position: 'relative',
      width: '100%',
      height,
    })
  },
  menu: {
    base: css({
      padding: '4px',
      background: theme.palette.primary.lightest,
      borderRadius: '0 0 12px 12px',
      fontSize: '14px',
      marginTop: '4px',
      boxShadow: '0px 5px 4px 3px rgba(34, 60, 80, 0.2)',
      width: '100%',
      outline: `2px solid ${theme.palette.primary.lightest}`,
      maxHeight: '300px',
      overflow: 'auto',
      position: 'relative',
      zIndex: 12,
    }),
    hidden: css({
      display: 'none',
    }),
  },
  input: {
    focus: css({
      borderRadius: '12px 12px 0 0',
      'input': {
        borderRadius: '12px 12px 0 0',
      }
    })
  },
  absoluteWrap: {
    base: css({
      position: 'absolute',
      zIndex: 'none',
      width: '100%'
    })
  },
}

const Select: FC<ISelectProps> = ({ 
    isLoading = false, 
    placeholder, 
    options = [], 
    value, 
    onChangeValue = () => {}, 
    onOpen = () => {}, 
    onCloze = () => {}, 
    inputProps, 
    ...other 
  }) => {
  const inputId = uniqid('select-input-');
  const selectWrapId = uniqid('select-wrap-');
  const menuId = uniqid('select-menu-');
  const optionsId = uniqid('option-');
  const [isOpened, setIsOpened] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [inputDimensions, setInputDimensions] = useState<{width: number, height: number}>({width: 0, height: 0});

  const [isMouseInSelect, setIsMouseInSelect] = useState(false);

  useEffect(() => {
    const inputElem = document.querySelector<HTMLDivElement>(`.${inputId}`);
    console.log(inputElem?.offsetHeight)
    if (inputElem && inputDimensions?.height === 0) {
      setInputDimensions({
        width: inputElem.offsetWidth,
        height: inputElem.offsetHeight,
      })
    }
  }, [inputDimensions])
  

  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (rootRef.current && !rootRef.current.contains(event.target)) {
  //       setIsOpened(false);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, []);

  const getNameById = (id: string | undefined) => {
    return options.find((elem) => elem.id === id)?.name;
  }

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Tab' || e.key === 'Escape') {
  //     setIsOpened(false);
  //     e.currentTarget.blur();
  //   }
  // } 

  return (
    <div
      ref={rootRef}
      css={styles.root.base(inputDimensions)}
      {...other}
    >
      <div 
        className={selectWrapId}
        css={styles.absoluteWrap.base}
        tabIndex={0}
        onMouseEnter={() => {
          setIsMouseInSelect(true);
        }}
        onMouseLeave={() => {
          setIsMouseInSelect(false);
        }}
        onFocus={(e) => {
          if (e.target.classList.contains(inputId)) {
            onOpen(); 
            setIsOpened(true); 
          } else if (e.target.classList.contains(selectWrapId)) {
            !isOpened && document.querySelector<HTMLInputElement>(`.${inputId}`)?.focus();
          }
        }}
        onBlur={(e) => {
          if (e.target.classList.contains(inputId)) {
            if (!e.relatedTarget?.classList.contains(selectWrapId)) {
              onCloze();
              setIsOpened(false);
            }

          } else if (e.target.classList.contains(selectWrapId)) {
          }     
        }} 
      >
        <Input 
          inputClassName={inputId}
          css={isOpened && styles.input.focus}
          placeholder={placeholder}
          value={getNameById(value)}
          onClick={(e) => e.preventDefault()} 
          {...inputProps}  
        />
          <div
            className={menuId}
            css={[
              styles.menu.base,
              !isOpened && styles.menu.hidden
            ]}
            onClick={() => setIsOpened(false)}
          >
            {isLoading ? (
              <div css={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <PulseLoader size="6px" color={theme.palette.secondary.normal} />
              </div>
            ) : null}
            {options ? (options.map((option) => (
              <Option key={`${optionsId}-${option.id}`} id={`${optionsId}-${option.id}`} isChecked={`${optionsId}-${value}` === `${optionsId}-${option.id}`} onClick={() => {onChangeValue(option.id)}}>{option.name}</Option>
            ))) : (
              null
            )}
          </div>
      </div>
    </div>
  )
};

export default Select;