/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ContentEditable } from 'components/ContentEditable';
import Button from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input';
import React, { FC, ReactNode, useState } from 'react';
import { theme } from 'utils/theme';

interface IAddPageProps {

};

const styles = {
  root: {
    base: css({
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      '& > *': {
        
      }
    })
  },
  buttonGroup: {
    base: css({
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      justifyContent: 'center',
    })
  },
  button: {
    clean: css({
      // background: theme.palette.primary.normal
      flexGrow: 1,
    }),
    submit: css({
      background: theme.palette.primary.lightest,
      flexGrow: 1,
    })
  }
}

const AddPage: FC<IAddPageProps> = () => {
  const [word, setWord] = useState<string[]>();
  const [meaning, setMeaning] = useState<string[]>();
  const [example, setExample] = useState<string[]>();
  const [image, setImage] = useState<string[]>();

  const handleClean = () => {
    setWord(undefined);
    setMeaning(undefined);
    setExample(undefined);
    setImage(undefined);
  }

  return (
    <div css={styles.root.base}>
      <Input.TextArea
        sizing='large'   
        placeholder='Word'
        onContentChange={(nodes) => {setWord(nodes)}} 
        contentValue={word}
      />
      <Input.TextArea
        sizing='large'   
        placeholder='Meaning'
        onContentChange={(nodes) => {setMeaning(nodes)}} 
        contentValue={meaning}
      />
      <Input.TextArea
        sizing='large'   
        placeholder='Example'
        onContentChange={(nodes) => {setExample(nodes)}} 
        contentValue={example}
      />
      <Input.TextArea
        sizing='large'   
        placeholder='Image'
        onContentChange={(nodes) => {setImage(nodes)}} 
        contentValue={image}
      />
      <div css={styles.buttonGroup.base}>
        <Button css={styles.button.clean} outline onClick={() => handleClean()} >Clean</Button>
        <Button css={styles.button.submit}>Submit</Button>
      </div>
    </div>
  )
};

export default AddPage;