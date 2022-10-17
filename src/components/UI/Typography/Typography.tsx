/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

type TypographyType = 'text' | 'h1' | 'h2';

interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  type?: TypographyType,
  css?: {},
};

const styles = {
  'text': css({
    margin: '10px 0',
    fontWeight: 700,
    fontSize: '16px'
  }),
  'h1': css({
    fontWeight: 700,
    fontSize: '32px',
    margin: '0',
    marginTop: '20px',
  }),
  'h2': css({

  })
}

const Typography: FC<ITypographyProps> = ({ type = 'text', css, ...other }) => {
  
  let RenderNode: FC<ITypographyProps>;
  
  switch (type) {
    case 'h1':
      RenderNode = (props) => <h1 {...props} />
      break;
    case 'h2': 
      RenderNode = (props) => <h1 {...props} />
      break;
    default:
      RenderNode = (props) => <p {...props} />
      break;
  }

  return (
    <RenderNode
      css={[
        styles[type],
        css
      ]} 
      {...other}
    />
  )
};

export default Typography;