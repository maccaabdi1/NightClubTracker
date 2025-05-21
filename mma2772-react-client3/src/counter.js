import { Component } from "react";

class ClubCounter extends Component
{
    render()
    { 
        const {id,count} = this.props;
        return <div className = "counter" id={id}>{count}</div>;
    }
}
export default ClubCounter;