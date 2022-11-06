/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ContentEditable } from 'components/ContentEditable';
import Button from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input';
import { Select } from 'components/UI/Select';
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
  },
  selectGroup: {
    base: css({
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      justifyContent: 'center',
      flexDirection: 'column',
      '& > *': {
        width: '100%',
      },
      marginBottom: '20px',
    })
  }
}

const AddPage: FC<IAddPageProps> = () => {
  const [word, setWord] = useState<string[]>();
  const [meaning, setMeaning] = useState<string[]>();
  const [example, setExample] = useState<string[]>();
  const [image, setImage] = useState<string[]>();

  const [noteType, setNoteType] = useState<string>();

  const handleClean = () => {
    setWord(undefined);
    setMeaning(undefined);
    setExample(undefined);
    setImage(undefined);
  }

  const options = [
    {id: '1', name: 'One'},
    {id: '2', name: 'Two'},
    {id: '3', name: 'Tree'}
  ]

  return (
    <div css={styles.root.base}>
      <div css={styles.selectGroup.base}>
        <Select placeholder='Card type' options={options} value={noteType} onChangeValue={(newValue) => {setNoteType(newValue)}} />
        <Select placeholder='Deck' options={options} value={noteType} onChangeValue={(newValue) => {setNoteType(newValue)}} />
      </div>
      <div css={styles.selectGroup.base}>
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
      </div>
      <div css={styles.buttonGroup.base}>
        <Button css={styles.button.clean} outline onClick={() => handleClean()} >Clean</Button>
        <Button css={styles.button.submit}>Add card</Button>
      </div>
    </div>
  )
};

export default AddPage;