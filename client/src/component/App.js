import React, {useEffect, useState} from 'react';
import {Button, Card, InputGroup, Intent, Tag} from "@blueprintjs/core";
import Grid from "@material-ui/core/Grid";
import {AppToaster} from "./alert";

const axios = require('axios');

function App() {

    const [data, setData] = useState(null)
    const [delimiter, setDelimiter] = useState(null)
    const [lines, setLines] = useState(null)
    const [tableData, setTableData] = useState(null)
    const [fileName, setFileName] = useState("")

    const uploadFile = (event) => {
        if (event.target) {
            if (event.target.files[0] && ['text/plain'].indexOf(event.target.files[0].type) > -1) {
                const formData = new FormData();
                let file = event.target.files[0]
                let fineName = event.target.files[0].name
                formData.append('file', file)
                let url = "http://127.0.0.1:4000/get-file"
                axios.post(url, formData)
                    .then(function (response) {
                        AppToaster.show({message: "File Uploaded Successfully", intent: Intent.SUCCESS});
                        setFileName(fineName);
                        setData(response.data)
                        setDelimiter(",");
                        setLines(2);
                    })
                    .catch(function (error) {
                        AppToaster.show({message: "Something went wrong!!", intent: Intent.DANGER});
                        console.log(error);
                    })

            } else {
                AppToaster.show({message: "Only .txt file is allowed", intent: Intent.WARNING});

            }
        }
    }
    useEffect(() => {
        if (delimiter === "," && lines === 2) {
            getData()
        }
    }, [fileName, data, lines, delimiter])


    const getData = () => {
        if (!delimiter) {
            AppToaster.show({message: "Please Specify a Delimiter.", intent: Intent.WARNING});
        } else if (!lines || isNaN(lines)) {
            AppToaster.show({message: "Please Specify a proper number to show rows", intent: Intent.WARNING});
        } else {
            let allowedColumns = 4
            if (!data.includes(delimiter)) {
                allowedColumns = 1
            }
            let dataToShow = data.split("\n")
            let table = []
            for (let i = 0; i < lines && i < dataToShow.length; i++) {
                let children = []
                let splitedArray = dataToShow[i].split(delimiter)
                for (let j = 0; j < allowedColumns; j++) {
                    children.push(<td>{splitedArray[j]}</td>)
                }
                table.push(<tr key={i}>{children}</tr>)
            }

            setTableData(table);
        }
    }
    return (
        <Card style={{
            width: "75%", marginLeft: "10%",
            marginTop: "10%"
        }} elevation={2} className="bp3-dark">
            <div style={{textAlign: "center"}}>
                <label className="bp3-file-input ">
                    <input type="file" onChange={uploadFile} data-testid="file-upload"/>
                    <span className="bp3-file-upload-input">Choose file...</span>
                </label>
                {fileName ?
                    <div style={{marginTop: "10px"}}><Tag intent="success"
                                                          style={{textAlign: "center"}}>{fileName}</Tag>
                    </div> : null}
            </div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={8}
                style={{marginTop: "3px"}}>
                <Grid item>
                    <label>Delimiter
                        <InputGroup style={{width: "100%"}}
                                    onChange={(event) => setDelimiter(event.target.value)}
                                    disabled={!data}
                                    data-testid="delimiter"
                                    value={delimiter}/>
                    </label>
                </Grid>
                <Grid item>
                    <label>No. of lines
                        <InputGroup style={{width: "100%"}}
                                    onChange={(event) => setLines(event.target.value)}
                                    inputMode="numeric"
                                    disabled={!data}
                                    data-testid="lines-display"
                                    value={lines}/>
                    </label>
                </Grid>
                <Grid item>
                    <Button text="Submit" onClick={getData} style={{marginTop: "10px"}}
                            disabled={!data}
                            data-testid="submit-button"/>
                </Grid>
            </Grid>
            <div style={{overflow: "auto", marginTop: "10px"}}>
                <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-striped"
                       style={{width: "100%"}}>
                    <tbody data-testid="noteList">
                    {tableData}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default App;


