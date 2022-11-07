/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Typography from 'components/UI/Typography/Typography';
import { FC, useContext, useState } from 'react';
import bullet from 'assets/icons/bullet.svg';
import checkboxChecked from 'assets/icons/checkbox-checked.svg';
import checkboxUnchecked from 'assets/icons/checkbox-unchecked.svg';
import { ContextDefinition, IContextDefinition } from '../DefinitionBlock';

interface IExampleProps extends Omit< React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: string[],
};

const styles = {
  root: {
    base: css({
      fontSize: '12px',
      fontStyle: 'italic',
      margin: 0,
      paddingLeft: '0px',
      position: 'relative',
      'li': {
        cursor: 'pointer',
        paddingLeft: '23px',
        listStyle: `none`,
        '&::before': {
          content: '""',
          width: '14px',
          height: '14px',
          position: 'absolute',
          left: 0,
          display: 'inline-block',
          backgroundImage: `url(${checkboxUnchecked})`,
          backgroundSize: '100%',
        },
        marginBottom: '8px',
        ':last-child': {
          marginBottom: 0
        }
      }
    })
  },
  li: {
    checked: css({
      '&::before': {
        // content: '""',
        // width: '14px',
        // height: '14px',
        // position: 'absolute',
        // left: 0,
        // display: 'inline-block',
        backgroundImage: `url(${checkboxChecked}) !important`,
        // backgroundSize: '100%',
      },
    })
  }
}

const Example: FC<IExampleProps> = ({ children,  }) => {
  const context = useContext(ContextDefinition);
  

  const handleClick = (value: string) => {
    if (context?.example.get === value) {
      context?.example.set(undefined);
    }  else {
      context?.example.set(value);
    } 
  }

  return (
    <ul css={styles.root.base}>
      {children.map((child) => (
        <li css={context?.example.get === child && styles.li.checked} onClick={() => handleClick(child)}>{child}</li>
      ))}
    </ul>
  )
};

export default Example;