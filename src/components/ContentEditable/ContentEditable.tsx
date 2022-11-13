import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Type } from 'typescript';
import uniqid from 'uniqid';
import ReactHTMLParser from 'react-html-parser';
import { getCaretPosition } from 'utils/helpers/getCaretPosition';
import { setCaretPosition } from 'utils/helpers/setCaretPosition';
const brId = uniqid('br-');

export type IContentEditableProps<T extends React.ElementType> = {
  component?: T;
  onContentChange?: (event: string[]) => void;
  contentValue?: string[];
} & React.ComponentPropsWithoutRef<T>;

const ContentEditable = <T extends React.ElementType = 'div',>({ contentValue, id: oldId, component, onContentChange = () => {}, onInput = () => {}, ...other }: IContentEditableProps<T>) => {
  const Component = component || 'div';
  const id = uniqid('content-editable-');
  const [caret, setCaret] = useState<{nodeIndex: number, caretPosition: number} | undefined>();

  const resetNodes = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = '';
  }

  const setContent = (selector: string, newContent?: string[] | undefined) => {
    const element = document.querySelector(selector);
    if (element && newContent) {
      element.innerHTML = '';
      newContent.forEach((node, i) => {
        const wrapedNode = document.createElement('div')
        if (node === brId) {
          const br = document.createElement('br');
          wrapedNode.append(br);
        } else {
          wrapedNode.innerHTML = node;
        }
        element.append(wrapedNode);
      })
      console.log('Childrens have been appended!')
    } else if (element && !newContent) {
      element.innerHTML = '';
      console.log('Element has been cleaned')
    }
    
    if (caret) setCaretPosition(id, caret.nodeIndex, caret.caretPosition);
  }

  useEffect(() => {
    setContent(`#${id}`, contentValue);
  }, [contentValue]);

  function handleChange(e: React.FormEvent<HTMLDivElement>) {
    const imgMaxWidth = e.currentTarget.clientWidth - 30;
    const allImg = e.currentTarget.getElementsByTagName('img');
    for (let i = 0; i < allImg.length; i++) {
      const img = allImg[i];
      if (img.width > imgMaxWidth)
        img.width = imgMaxWidth;
    }
    // resizeImgs(e);

    let parsedNodes: string[] = [];
    const firstText = e.currentTarget.childNodes[0]?.nodeName === '#text' ? e.currentTarget.childNodes[0]?.textContent : undefined;
    const firstImg = e.currentTarget.children[0]?.tagName === 'IMG' ? e.currentTarget.getElementsByTagName('img')[0].outerHTML : undefined;
    const nodes = e.currentTarget.getElementsByTagName('div');

    firstImg && parsedNodes.push(firstImg);
    firstText && parsedNodes.push(firstText);

    if (nodes.length === 0) {
      const caretPosition = getCaretPosition(e.currentTarget);
      if (caretPosition) {
        console.log({nodeIndex: 0, caretPosition: caretPosition[0]})
        setCaret({nodeIndex: 0, caretPosition: caretPosition[0]})
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const currentNode = nodes[i];
      let imgs: string[] = [];
      let text: string | undefined;

      const caretPosition = getCaretPosition(currentNode);
      if (caretPosition) {
        console.log({nodeIndex: i, caretPosition: caretPosition[0]})
        setCaret({nodeIndex: i, caretPosition: caretPosition[0]})
      }

      if (currentNode.children[0]?.tagName === 'BR' && currentNode.childElementCount === 1) {
        text = brId;
      } else if (currentNode.children[0]?.tagName === 'IMG') {
        const imgElements = currentNode.getElementsByTagName('img');
        // img = (currentImg?.outerHTML);
        for (let i = 0; i < imgElements.length; i++) {
          const img = imgElements[i];
          if (img.width > imgMaxWidth)
            img.width = imgMaxWidth;
          imgs.push(img.outerHTML);
        }
      } else if (currentNode.textContent) {
        text = currentNode.textContent;
      }
      parsedNodes = [...parsedNodes, ...imgs];
      text && parsedNodes.push(text);
    }
    console.log(parsedNodes);
    onContentChange(parsedNodes);
    // setContent(`#${id}`, contentValue);
    // resetNodes(`#${id}`);
  }

  return (
    <Component
      id={id}
      contentEditable
      onInput={(e) => {handleChange(e); onInput(e)}}
      {...other}
    >
      {/* {contentValue?.map((node) => (
        <div dangerouslySetInnerHTML={{ __html: node }} />
      ))} */}
    </Component>
  )
};

export default ContentEditable;