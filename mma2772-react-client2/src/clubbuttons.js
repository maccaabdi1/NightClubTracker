import { Component } from "react";
class ClubButtons extends Component{
    render(){
        const {onEnter, onLeave } = this.props;
        return(
            <div className="buttons">
                <button onClick = {onEnter}>+</button>
                <button onClick = {onLeave}>-</button>
            </div>
        );
    }
}
export default ClubButtons;