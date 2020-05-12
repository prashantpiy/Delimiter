import React from 'react';
import App from '../component/App';
import {render, fireEvent, cleanup} from '@testing-library/react';
import 'jest-dom/extend-expect';
const renderApp = () => render(<App/>);

var fileUpload, delimiter, lineCount, submitButton, tableData;

afterEach(() => {
    cleanup()
});

beforeEach(() => {
    let {getByTestId, queryByTestId} = renderApp();
    fileUpload = getByTestId('file-upload');
    delimiter = getByTestId('delimiter');
    lineCount = getByTestId('lines-display');
    submitButton = getByTestId('submit-button');
    tableData = getByTestId('noteList');
})

test('initial UI is rendered as expected and button works', () => {
    expect(fileUpload).toHaveValue("");
    expect(delimiter).toHaveValue("");
    expect(lineCount).toHaveValue("");
    expect(submitButton).toHaveTextContent("Submit");
    expect(tableData.children.length).toBe(0);
    fireEvent.input(delimiter, {
        target: {value: ','}
    });
    fireEvent.input(lineCount, {
        target: {value: '3'}
    });
    fireEvent.click(submitButton);
    expect(tableData.children.length).toBe(0);
});
/*test('button adds notes', () => {
    const file1 = new File(['a,b,c,d,e,f'], 'address.txt', {type: 'text/plain'})
    /!*const imageInput = getByLabelText('Upload File')
    imageInput.files = [file]
    fireEvent.change(imageInput)*!/

    fireEvent.input(fileUpload, {
        target: {file: [file1]}
    });
    fireEvent.input(delimiter, {
        target: {value: ','}
    });
    fireEvent.input(lineCount, {
        target: {value: '2'}
    });
    fireEvent.click(submitButton);
    expect(tableData.children.length).toBe(2);
    /!*expect(noteList.children[0].children[0]).toHaveTextContent('Study');
    expect(noteList.children[0].children[1]).toHaveTextContent('progress');*!/
});*/
