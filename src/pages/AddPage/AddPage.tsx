/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ContentEditable } from "components/ContentEditable";
import Button from "components/UI/Button/Button";
import { Input } from "components/UI/Input";
import { Select } from "components/UI/Select";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { currentTabSelector } from "store/currentTab";
import { ankiFieldsSelector } from "store/ankiFields";
import { ALL_TABS } from "utils/tabs";
import { theme } from "utils/theme";
import { useAxios } from "hooks/useAxios";
import { getModelNames } from "services/anki/getModelNames";
import { AnkiField } from "models/AnkiField";
import { getDeckNames } from "services/anki/getDeckNames";
import uniqid from "uniqid";
import { getModelFieldNames } from "services/anki/getModelFieldNames";
import { addNote } from "services/anki/addNote";
import { PulseLoader } from "react-spinners";
import { currentDeckSelector } from "store/currentDeck";
import { currentNoteTypeSelector } from "store/currentNoteType";
import { FieldConnecter } from "../../components/FieldConnecter";
import {
  MiddleWordData,
  middleWordDataSelector,
} from "../../store/middleWordData";
import { FieldConnecterOption } from "../../components/FieldConnecter/Select";

interface IAddPageProps {}

const styles = {
  root: {
    base: css({
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      "& > *": {},
    }),
  },
  buttonGroup: {
    base: css({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: "center",
    }),
  },
  button: {
    clean: css({
      // background: theme.palette.primary.normal
      flexGrow: 1,
    }),
    submit: css({
      background: theme.palette.primary.lightest,
      flexGrow: 1,
    }),
  },
  selectGroup: {
    base: css({
      display: "flex",
      alignItems: "center",
      gap: "15px",
      justifyContent: "center",
      flexDirection: "column",
      "& > *": {
        width: "100%",
      },
      marginBottom: "20px",
    }),
  },
};

const AddPage: FC<IAddPageProps> = () => {
  const [ankiFields, setAnkiFields] = useRecoilState(ankiFieldsSelector);
  // const [noteType, setNoteType] = useState<string>();
  // const [deck, setDeck] = useState<string>();
  const [currentDeck, setCurrentDeck] = useRecoilState(currentDeckSelector);
  const [currentNoteType, setCurrentNoteType] = useRecoilState(
    currentNoteTypeSelector
  );
  const [
    getModelNamesQuery,
    {
      data: dataModelNames,
      loading: loadingModelNames,
      error: errorModelNames,
    },
  ] = useAxios(getModelNames);
  const [
    getDeckNamesQuery,
    { data: dataDeckNames, loading: loadingDeckNames, error: errorDeckNames },
  ] = useAxios(getDeckNames);
  const [
    getModelFieldNamesQuery,
    {
      data: dataModelFieldNames,
      loading: loadingModelFieldNames,
      error: errorModelFeildNames,
    },
  ] = useAxios(getModelFieldNames);
  const [
    addNoteQuery,
    { data: dataAddNote, loading: loadingAddNote, error: errorAddNote },
  ] = useAxios(addNote);
  const [cardTypeOptions, setCardTypeOptions] =
    useState<{ id: string; name: string }[]>();
  const [deckOptions, setDeckOptions] =
    useState<{ id: string; name: string }[]>();
  const [middleWordData, setMiddleWordData] = useRecoilState(
    middleWordDataSelector
  );

  const handleClean = () => {
    setAnkiFields(ankiFields.map((field) => ({ ...field, value: undefined })));
  };

  const handleCardTypeOpen = () => {
    getModelNamesQuery({});
  };

  const handleCardTypeCloze = () => {};

  const handleDeckOpen = () => {
    getDeckNamesQuery({});
  };

  const hanldeDeckCloze = () => {};

  const isAnyAnkyFieldFilled = () => {
    const firstNotUndefinded = ankiFields.find(
      (field) => field.value !== undefined
    );
    if (firstNotUndefinded) {
      return true;
    } else return false;
  };

  const areMandatoryFieldsFilled = () => {
    return (
      currentNoteType !== undefined &&
      currentDeck !== undefined &&
      isAnyAnkyFieldFilled()
    );
  };

  const ankiFieldsToObj = (array: AnkiField[]) => {
    const obj: { [P in string]: string | undefined } = {};
    array.forEach((field) => {
      obj[field.name] = field.value?.join("</br>");
    });
    return obj;
  };

  const handleAddCard = () => {
    if (areMandatoryFieldsFilled()) {
      addNoteQuery({
        note: {
          deckName: currentDeck!,
          modelName: currentNoteType!,
          fields: ankiFieldsToObj(ankiFields),
        },
      });
    }
  };

  useEffect(() => {
    getModelNamesQuery({});
    getDeckNamesQuery({});
  }, []);

  useEffect(() => {
    setCardTypeOptions(
      dataModelNames?.map((modelName) => ({ id: modelName, name: modelName }))
    );
  }, [dataModelNames]);

  useEffect(() => {
    setDeckOptions(
      dataDeckNames?.map((deckName) => ({ id: deckName, name: deckName }))
    );
  }, [dataDeckNames]);

  useEffect(() => {
    if (currentNoteType) {
      getModelFieldNamesQuery(currentNoteType);
    }
  }, [currentNoteType]);

  useEffect(() => {
    if (dataModelFieldNames) {
      setAnkiFields(
        dataModelFieldNames.map((field, i) => {
          return { value: ankiFields[i]?.value, name: field };
        })
      );
    }
  }, [dataModelFieldNames]);

  useEffect(() => {
    if (dataAddNote && !errorAddNote) {
      handleClean();
    }
  }, [dataAddNote]);

  interface FieldConnecterOptionRestricted
    extends Omit<FieldConnecterOption, "id"> {
    id: keyof MiddleWordData;
  }

  const fieldConnecterOptions: FieldConnecterOptionRestricted[] = useMemo(
    () =>
      Object.keys(middleWordData).map<FieldConnecterOptionRestricted>(
        (value) => ({
          id: value as keyof MiddleWordData,
          name: value,
        })
      ),
    [middleWordData]
  );

  const findFieldConnecterOption = useCallback(
    (fieldIndex: number) => {
      const searchingFieldkey = (
        Object.keys(middleWordData) as [keyof MiddleWordData]
      ).find((key) => middleWordData[key].indexFields.includes(fieldIndex));
      if (searchingFieldkey) {
        return {
          id: searchingFieldkey,
          name: searchingFieldkey,
        } as FieldConnecterOptionRestricted;
      } else {
        return undefined;
      }
    },
    [middleWordData]
  );

  const handleFieldConnectorChange = useCallback(
    (_newValue: FieldConnecterOption | undefined, fieldIndex: number) => {
      const foundKey = (
        Object.keys(middleWordData) as [keyof MiddleWordData]
      ).find((key) => middleWordData[key].indexFields.includes(fieldIndex));

      if (foundKey) {
        const filteredFieldIndexes = middleWordData[
          foundKey
        ].indexFields.filter((_fieldIndex) => _fieldIndex !== fieldIndex);

        setMiddleWordData({
          ...middleWordData,
          [foundKey]: {
            ...middleWordData[foundKey],
            indexFields: filteredFieldIndexes,
          },
        });
      }

      if (_newValue) {
        const newValue: FieldConnecterOptionRestricted | undefined = {
          id: _newValue?.id as keyof MiddleWordData,
          name: _newValue?.name,
        };

        setMiddleWordData((currVal) => ({
          ...currVal,
          [newValue?.id]: {
            ...currVal[newValue.id],
            indexFields: [...currVal[newValue.id].indexFields, fieldIndex],
          },
        }));
      }
    },
    [middleWordData]
  );

  return (
    <div css={styles.root.base}>
      <div css={styles.selectGroup.base}>
        <Select
          isLoading={loadingModelNames}
          placeholder="Card type"
          options={cardTypeOptions}
          value={currentNoteType}
          onChangeValue={(newValue) => {
            setCurrentNoteType(newValue);
          }}
          onOpen={() => handleCardTypeOpen()}
          onCloze={() => handleCardTypeCloze()}
        />
        <Select
          isLoading={loadingDeckNames}
          placeholder="Deck"
          options={deckOptions}
          value={currentDeck}
          onChangeValue={(newValue) => {
            setCurrentDeck(newValue);
          }}
          onOpen={() => handleDeckOpen()}
          onCloze={() => hanldeDeckCloze()}
        />
      </div>
      {ankiFields && (
        <div css={styles.selectGroup.base}>
          {ankiFields.map((field, i) => (
            <FieldConnecter
              key={field.name}
              id={String(i)}
              options={fieldConnecterOptions}
              currentOption={findFieldConnecterOption(i)}
              onChange={(newValue) => handleFieldConnectorChange(newValue, i)}
            >
              <Input.TextArea
                key={field.name}
                sizing="large"
                placeholder={field.name}
                onContentChange={(nodes) => {
                  setAnkiFields(
                    ankiFields.map((_field) =>
                      _field.name === field.name
                        ? { ..._field, value: nodes }
                        : _field
                    )
                  );
                }}
                contentValue={field.value}
              />
            </FieldConnecter>
          ))}
        </div>
      )}
      <div css={styles.buttonGroup.base}>
        <Button css={styles.button.clean} outline onClick={() => handleClean()}>
          Clean
        </Button>
        <Button css={styles.button.submit} onClick={() => handleAddCard()}>
          {" "}
          {loadingAddNote ? (
            <PulseLoader size="6px" color={theme.palette.secondary.normal} />
          ) : (
            "Add card"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddPage;
