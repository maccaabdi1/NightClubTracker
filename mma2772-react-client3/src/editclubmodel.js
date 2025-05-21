import { Component } from 'react';
import {Modal ,ModalHeader, ModalBody,FormGroup,Label, Input, Button, Form} from 'reactstrap';


class EditClubModal extends Component{
   
    render(){
        const  {isOpen, toggle, currentClub, onSave} = this.props;
    
        return(
            <Modal isOpen={isOpen} toggle={toggle}> 
            <ModalHeader toggle= {toggle}> Edit Club 
            </ModalHeader>
                <Form onSubmit={onSave}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Club Name</Label>
                            <Input
                            type = "text"
                            name= "name"
                            id = "name"
                            defaultValue={currentClub ? currentClub.name : ""}
                            
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Location</Label>
                            <Input
                            type = "text"
                            name= "location"
                            id = "location"
                            defaultValue={currentClub ? currentClub.location : ""}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Genre</Label>
                            <Input
                            type = "text"
                            name= "genre"
                            id = "genre"
                            defaultValue={currentClub ? currentClub.genre : ""}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Max Capacity</Label>
                            <Input
                            type = "number"
                            name= "maxCap"
                            id = "maxCap"
                            defaultValue={currentClub ? currentClub.maxCap : 100}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Threshold(%)</Label>
                            <Input
                            type = "number"
                            name= "yellowThreshold"
                            id = "yellowThreshold"
                            defaultValue={currentClub ? currentClub.yellowThreshold : 80}
                            required
                            />
                        </FormGroup>
                    </ModalBody>
                     <Button color= "primary" type="submit">
                        Save 
                     </Button>
                     <Button color="secondary" onClick={toggle}>
                        Cancel
                     </Button>
                </Form>
            </Modal>
        );

    }


}
export default EditClubModal