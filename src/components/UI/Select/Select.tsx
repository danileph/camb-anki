/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { createContext, FC, useEffect, useRef, useState } from 'react';
import { theme } from 'utils/theme';
import { Input } from '../Input';
import Option from './Option';

interface OptionType {
  id: string,
  name: string,
}

interface ISelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: OptionType[],
  value?: string | undefined,
  onChangeValue?: (newValue: string) => void,
  placeholder?: string,
};

const styles = {
  root: {
    base: css({
      position: 'relative',
    })
  },
  menu: {
    base: css({
      background: theme.palette.secondary.darker,
      borderRadius: '12px',
      fontSize: '14px',
      marginTop: '10px',
      boxShadow: '0px 0px 4px 3px rgba(34, 60, 80, 0.2)',
      position: 'absolute',
      zIndex: '5',
      width: '100%',
      outline: `2px solid ${theme.palette.primary.lightest}`,
    }),
    hidden: css({
      display: 'none',
    })
  }
}

const Select: FC<ISelectProps> = ({ placeholder, options, value, onChangeValue = () => {}, ...other }) => {
  const [isOpened, setIsOpened] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpened(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const getNameById = (id: string | undefined) => {
    return options.find((elem) => elem.id === id)?.name;
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' || e.key === 'Escape') {
      setIsOpened(false);
      e.currentTarget.blur();
    }
  } 

  return (
    <div
      ref={rootRef}
      css={styles.root.base}
      {...other}
    >
      <Input 
        placeholder={placeholder}
        value={getNameById(value)} 
        onFocus={() => setIsOpened(true)} 
        onKeyDown={(e) => handleKeyPress(e)}/>
      <div
        css={[
          styles.menu.base,
          !isOpened && styles.menu.hidden,
        ]}
      >
        {options.map((option) => (
          <Option id={option.id} isChecked={value === option.id} onClick={() => {onChangeValue(option.id); setIsOpened(false)}}>{option.name}</Option>
        ))}
      </div>
    </div>
  )
};

export default Select;