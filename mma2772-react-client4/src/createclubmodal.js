import { Component } from "react";
import {Modal ,ModalHeader, ModalBody,FormGroup,Label, Input, Button, Form} from 'reactstrap';

class CreateClubModal extends Component
{
    render()
    {
        const {isOpen , toggle, onSave, onChange} = this.props;

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
                            onChange={(e) => onChange('newClubName', e.target.value)}
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
                            onChange={(e) => onChange('newClubLocation', e.target.value)}
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
                            onChange={(e) => onChange('newClubGenre', e.target.value)}
                            placeholder="Enter Club Music Genre"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Max Capacity</Label>
                            <Input
                            type = "number"
                            name= "maxCapacity"
                            id = "max_capacity"
                            onChange={(e) => onChange('newClubMaxCapacity', e.target.value)}
                            placeholder="Enter Club Max Capacity"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Threshold(%)</Label>
                            <Input
                            type = "number"
                            name= "yellowThreshold"
                            id = "yellowThreshold"
                            onChange={(e) => onChange('newClubYellowThreshold', e.target.value)}
                            placeholder="Enter Club Threshold"
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