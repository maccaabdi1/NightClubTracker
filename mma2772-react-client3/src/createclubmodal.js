import { Component } from "react";
import {Modal ,ModalHeader, ModalBody,FormGroup,Label, Input, Button, Form} from 'reactstrap';

class CreateClubModal extends Component
{
    render()
    {
        const {isOpen , toggle, onSave} = this.props;

        return(
            <Modal isOpen={isOpen} toggle={toggle}> 
            <ModalHeader toggle= {toggle}> 
                Add Club
            </ModalHeader>
                <Form onSubmit={onSave}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Club Name</Label>
                            <Input
                            type = "text"
                            name= "name"
                            id = "name"
                            placeholder="Enter club name"
                            required
                            
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Location</Label>
                            <Input
                            type = "text"
                            name= "location"
                            id = "location"
                            placeholder="Enter Club Location"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Genre</Label>
                            <Input
                            type = "text"
                            name= "genre"
                            id = "genre"
                            placeholder="Enter Club Music Genre"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Max Capacity</Label>
                            <Input
                            type = "number"
                            name= "maxCap"
                            id = "maxCap"
                            placeholder="Enter Club Max Capacity"
                            defaultValue={100}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Threshold(%)</Label>
                            <Input
                            type = "number"
                            name= "yellowThreshold"
                            id = "yellowThreshold"
                            placeholder="Enter Club Threshold"
                            defaultValue={80}
                            required
                            />
                        </FormGroup>
                    </ModalBody>
                     <Button color= "primary" type="submit">
                        Add Club 
                     </Button>
                     <Button color="secondary" onClick={toggle}>
                        Cancel
                     </Button>
                </Form>
            </Modal>
        )



    }
}
export default CreateClubModal;