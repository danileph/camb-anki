/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { theme } from 'utils/theme';

interface ILabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string,
  labelCss?: {},
};

const styles = {
  base: css({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    color: 'inherit',
    lineHeight: 'inherit',
    fontWeight: 'inherit',
  }),
  label: {
    base: css({
      position: 'absolute',
      right: 0,
      fontSize: '10px',
      // fontStyle: 'italic',
      background: theme.palette.primary.normal,
      color: theme.palette.secondary.normal,
      padding: '3px 10px',
      borderRadius: '14px',
    }),
    setPosition: (width: number, gap: number) => css({
      right: -width - gap,
    })
  }
}

const Label: FC<ILabelProps> = ({ children, label, labelCss, ...other }) => {

  const labelRef = useRef<HTMLSpanElement>(null);
  const [labelWidth, setLabelWidth] = useState<number>(0);
  
  useLayoutEffect(() => {
    if (labelRef && labelRef.current) setLabelWidth(labelRef.current.offsetWidth);
  }, [])

  return (
    <span
      css={styles.base}
      {...other}
    >
      <span
        ref={labelRef}
        css={[
          styles.label.base,
          styles.label.setPosition(labelWidth, children ? 10 : 0),
          labelCss
        ]}
      >{label}</span>
      {children}
    </span>
  )
};

export default Label;