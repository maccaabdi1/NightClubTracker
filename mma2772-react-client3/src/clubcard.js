import { Component } from "react";

import { Card,CardBody, CardTitle,CardText, Button } from "reactstrap";
import ClubButtons from "./clubbuttons";
import './clubs.css';
class ClubCard extends Component
{
    render()
    {
        const {name, id , count,maxCap, status, backgroundColor, onEnter, onLeave, onEdit,location,onDelete} = this.props;
        return(
            <Card  id= {id} style = {{backgroundColor: backgroundColor, marginBottom: '20px'}} className="clubs">
                <CardBody>
                <div  className="button-group">
                    <Button color="warning" onClick={onEdit} className="edit-button">
                        Edit
                    </Button>
                    
                    <Button color="danger" onClick={onDelete} className="delete-button" >
                        Delete
                    </Button>
                    </div>
                
                    <CardTitle tag="h4" className="club-text">
                    {name}
                    
                    </CardTitle>
                    <CardText className="club-text">
                        <b>location:</b> {location}
                    </CardText>
                    <CardText className="club-text">
                        <b>Current Count:</b> {count}
                    </CardText>
                    <CardText className="club-text">
                        <b>Capacity:</b> {maxCap}
                    </CardText>
                    <CardText className="club-text">
                        <span className="club-status">{status}</span>
                    </CardText>
                    <ClubButtons onEnter = {onEnter} onLeave = {onLeave} />
                </CardBody>
            </Card>
        );

    }
}
export default ClubCard;