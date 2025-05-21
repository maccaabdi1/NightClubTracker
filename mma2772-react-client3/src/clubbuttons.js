import { Component } from "react";
import { Button} from 'reactstrap';
import './clubs.css';


class ClubButtons extends Component{
    render(){
        const {onEnter, onLeave } = this.props;
        return(
            <div className="buttons">
           
                <Button color='danger' onClick={onLeave} >
                    -
                </Button>
             

        
                <Button color = "success" onClick = {onEnter} >
                    +
                </Button>
               
            </div>
        );
    }
}
export default ClubButtons;