import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    withStyles
} from "@material-ui/core";

const styles = theme => ({
    dialog: {
        width: '50%',
    },
});

const FieldsSelectDialog = props => {
    const [selectedField, setSelectedField] = useState('');

    const handleCancel = () => {
        props.onClose();
    };

    const handleOk = () => {
        props.onConfirm(selectedField);
        props.onClose();
    };

    const handleChange = (event, selectedField) => {
        setSelectedField(selectedField);
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="md"
            open={props.open}
            classes={{paper: props.classes.dialog}}>
            <DialogTitle>Select Field</DialogTitle>
            <DialogContent>
                <RadioGroup
                    aria-label="Select Field"
                    value={selectedField}
                    onChange={handleChange}
                >
                    {props.fields.map((field, index) => (
                        <FormControlLabel value={field.alias}
                                          key={index} control={<Radio/>}
                                          label={field.alias}/>
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(FieldsSelectDialog);
