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
import { useAxios } from 'hooks/useAxios';
import { getModelNames } from 'services/anki/getModelNames';
import { AnkiField } from 'models/AnkiField';
import { getDeckNames } from 'services/anki/getDeckNames';
import uniqid from 'uniqid'

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
  const [deck, setDeck] = useState<string>();
  const [ getModelNamesQuery, { data: dataModelNames, loading: loadingModelNames, error: errorModelNames } ] = useAxios(getModelNames);
  const [ getDeckNamesQuery, {data: dataDeckNames, loading: loadingDeckNames, error: errorDeckNames} ] = useAxios(getDeckNames);
  const [cardTypeOptions, setCardTypeOptions] = useState<{id: string, name : string}[]>();
  const [deckOptions, setDeckOptions] = useState<{id: string, name : string}[]>();

  const handleClean = () => {
    setAnkiFields(ankiFields.map((field) => ({...field, value: undefined})))
  }

  const options = [
    {id: '1', name: 'One'},
    {id: '2', name: 'Two'},
    {id: '3', name: 'Tree'}
  ]

  const handleCardTypeOpen = () => {
    getModelNamesQuery({});
  }

  const handleCardTypeCloze = () => {

  }

  const handleDeckOpen = () => {
    getDeckNamesQuery({});
  }

  const hanldeDeckCloze = () => {

  }

  useEffect(() => {
    console.log({dataModelNames})
    // if (dataModelNames) {
      setCardTypeOptions(dataModelNames?.map((modelName) => ({id: modelName, name: modelName})))
    // }
  }, [dataModelNames]);

  useEffect(() => {
    console.log({dataDeckNames})
    // if (dataDeckNames) {
      setDeckOptions(dataDeckNames?.map((deckName) => ({id: deckName, name: deckName})))
    // }
  }, [dataDeckNames])

  return (
    <div css={styles.root.base}>
      <div css={styles.selectGroup.base}>
        <Select 
          isLoading={loadingModelNames} 
          placeholder='Card type'
          options={cardTypeOptions} 
          value={noteType} 
          onChangeValue={(newValue) => {setNoteType(newValue)}}
          onOpen={() => handleCardTypeOpen()} 
          onCloze={() => handleCardTypeCloze()}
        />
        <Select 
          isLoading={loadingDeckNames} 
          placeholder='Deck' 
          options={deckOptions} 
          value={deck} 
          onChangeValue={(newValue) => { console.log(newValue); setDeck(newValue)}}  
          onOpen={() => handleDeckOpen()}
          onCloze={() => hanldeDeckCloze()}
        />
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