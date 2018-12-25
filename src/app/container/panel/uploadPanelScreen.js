import React, {Component} from 'react';
import {Upload, Icon, message, Input, Button} from 'antd';
import axios from "axios"
import '../../assets/css/App.css';

const Dragger = Upload.Dragger;


class UploadPanelScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bundleName: ""
        }
    }
    setBundleName = (e) => {
        this.setState({
            bundleName: e.target.value
        })
    }

    onClick = () => {
        window.open(`http://localhost:7000/?name=singleView`, '_self');
    }

    render() {
        const props = {
            name: 'file',
            multiple: true,
            data: { name: this.state.bundleName },
            action: 'http://localhost:7000',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div>
                <Input style={{ marginBottom: 30 }} placeholder="Input bundle number" onChange={this.setBundleName}/>

                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox"/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading
                        company data or other band files</p>
                </Dragger>
            </div>
        );
    }
}

export default UploadPanelScreen;
