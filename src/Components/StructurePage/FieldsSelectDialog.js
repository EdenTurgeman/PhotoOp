import React, {Component} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    RadioGroup,
    FormControlLabel,
    Button,
    Radio
} from "@material-ui/core";

class FieldsSelectDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedField: ''
        }
    }

    handleEntering = () => {
        this.radioGroupRef.focus();
    };

    handleCancel = () => {
        this.props.onClose();
    };

    handleOk = () => {
        this.props.onConfirm(this.state.selectedField);
        this.props.onClose();
    };

    handleChange = (event, selectedField) => {
        this.setState({selectedField});
    };

    render() {
        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="md"
                open={this.props.open}
                onEntering={this.handleEntering}>
                <DialogTitle>Select Field</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={ref => {
                            this.radioGroupRef = ref;
                        }}
                        aria-label="Select Field"
                        value={this.state.selectedField}
                        onChange={this.handleChange}
                    >
                        {this.props.fields.map(field => (
                            <FormControlLabel value={field.alias}
                                              key={field.alias} control={<Radio/>}
                                              label={field.alias}/>
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default FieldsSelectDialog;
