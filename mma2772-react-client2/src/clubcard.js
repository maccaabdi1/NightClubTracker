
import { Component } from "react";
class ClubCard extends Component
{
    render()
    {
        const {name, id , count, status, backgroundColor} = this.props;
        return(
            <div className = "clubs" id= {id} style = {{backgroundColor: backgroundColor}}>
                {name}
                <span className="club-status" id={`${id}Status`}>
                    {status}
                </span>
            </div>
        );
    }
}
export default ClubCard;