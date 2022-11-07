/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ContentEditable } from 'components/ContentEditable';
import Button from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input';
import { Select } from 'components/UI/Select';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTabSelector } from 'store/currentTab';
import { ankiFieldsSelector } from 'store/ankiFields';
import { ALL_TABS } from 'utils/tabs';
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
  const [ ankiFields, setAnkiFields ] = useRecoilState(ankiFieldsSelector);
  const [noteType, setNoteType] = useState<string>();

  const handleClean = () => {
    setAnkiFields(ankiFields.map((field) => ({...field, value: undefined})))
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
      {ankiFields && (
        <div css={styles.selectGroup.base}>
        {ankiFields.map((field, i) => (
          <Input.TextArea
            key={field.name} 
            sizing='large'   
            placeholder={field.name}
            onContentChange={(nodes) => {setAnkiFields(ankiFields.map((_field) => _field.name === field.name ? {..._field, value: nodes} : _field))}} 
            contentValue={field.value}
          />
        ))}
      </div>
      )}
      <div css={styles.buttonGroup.base}>
        <Button css={styles.button.clean} outline onClick={() => handleClean()} >Clean</Button>
        <Button css={styles.button.submit}>Add card</Button>
      </div>
    </div>
  )
};

export default AddPage;