import { Component } from "react";
import './clubs.css';

class ClubSelector extends Component
{
    render()
    {
        const {handleChange, selectedClub} = this.props;
        return(
            <div className="choices">
                {['counter1','counter2','counter3','counter4'].map((id,i) =>(
                    <label key={id}>
                        <input type="radio" name = "option" value={id} checked={selectedClub === id} onChange={handleChange}
                        />
                        {['Club Arcane','Club Underground','Club Soda','Studio 52'][i]}
                    </label>
                ))}
            </div>
        );
    }
}
export default ClubSelector;
