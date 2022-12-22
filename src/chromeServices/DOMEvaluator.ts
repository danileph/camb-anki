import { getSelectedText } from "utils/helpers/getSelectedText";
import { ContentMessage } from "utils/helpers/sendMessageToContent";

chrome.runtime.onMessage.addListener((message: {type: ContentMessage, data: object | undefined}, sender, sendRes) => {
    const { type, data } = message;

    switch (type) {
        case 'get_selected_text':
            console.log('get_selected_text')
            const selectedText = getSelectedText();
            sendRes(selectedText);
            break;
        default:
            break;
    }

});

export {}