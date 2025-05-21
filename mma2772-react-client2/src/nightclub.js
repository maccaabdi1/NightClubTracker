import { Component } from "react";
import ClubCounter from "./counter";
import ClubSelector from "./clubselector";
import ClubButtons from "./clubbuttons";
import ClubCard from "./clubcard";
import './clubs.css'

import './clubs.css';
class NightClubApp extends Component

{
    constructor(props)
    {
        super(props)
        this.state = {
        
            counters : {
                counter1: 0,
                counter2: 0,
                counter3: 0,
                counter4: 0,
            },
            selectedClub: null,
            clubStatus: {
                counter1: "",
                counter2: "",
                counter3: "",
                counter4: "",

            },
            backgroundColor : {

                counter1: "palegreen",
                counter2: "palegreen",
                counter3: "palegreen",
                counter4: "palegreen",

            },

        };
        
        
        this.yellowClubThreshold ={
            counter1: {threshold :70},
            counter2: {threshold : 30},
            counter3: {threshold : 12},
            counter4: {threshold :32}
        };

        this.redMaxCapacity = {
            counter1: 100,
            counter2: 50,
            counter3: 20,
            counter4: 52
        };
        
    
    }

    handleSelectedClub = (event) =>{
        this.setState({selectedClub: event.target.value})
    };

    updateClubState(clubId,change){
        this.setState((prevState) => {
            const newCount = Math.max(0,prevState.counters[clubId] + change);
            if(newCount > this.redMaxCapacity[clubId]){
                return null;
            }
            let status = "Welcome!";
            let backgroundColor = "palegreen";

            if(newCount >= this.redMaxCapacity[clubId])
            {
                status = "No one allowed in!";
                backgroundColor = "#FF6961";
            }
            else if (newCount >= this.yellowClubThreshold[clubId].threshold)
            {
                status = "Warn the bouncers...";
                backgroundColor = "#FDFD96";
            }
            if(newCount === 0)
            {
                status = "";
            }
            return{

                counters: {...prevState.counters,[clubId]: newCount},
                clubStatus: {...prevState.clubStatus,[clubId]: status},
                backgroundColor: {...prevState.backgroundColor,[clubId]: backgroundColor},

            };


        });

        
    }
    enterClub = () => 
    {
        const {selectedClub} = this.state;
        if(selectedClub)
        {
            this.updateClubState(selectedClub,1);
        }

    }
    leaveClub = () =>
    {
        const {selectedClub} = this.state;
        if(selectedClub)
        {
            this.updateClubState(selectedClub,-1);
        }
    };

    render()
    {
        const {counters,selectedClub,clubStatus,backgroundColor} = this.state;
        const clubNames = ['Club Arcane','Club Underground','Club Soda','Studio 52'];
        const clubIds = ['clubArcane','clubUnderground','clubSoda','studio52'];

        return (
            <div className="container">
                <h1>NightClub Capacity Tracker</h1>
                <h3>Each time someone enters/ leaves the club, select the correct club and click the appropriate button</h3>

                <div className= "club-container">
                    {Object.keys(counters).map((counter,index)=>(
                        <ClubCard
                        key={counter}
                        name = {clubNames[index]}
                        id = {clubIds[index]}
                        count = {counters[counter]}
                        status =  {clubStatus[counter]}
                        backgroundColor = {backgroundColor[counter]} />
                    ))}
                </div>
                <div className = "counter-container">
                    {Object.entries(counters).map(([id,count]) =>(
                        <ClubCounter 
                        key={id}
                        id = {id}
                        count = {count}
                        />
                    ))}
  
                </div>

                <ClubSelector selected = {selectedClub} handleChange = {this.handleSelectedClub} />
                <ClubButtons onEnter = {this.enterClub} onLeave={this.leaveClub}/>
                
            </div>
        )
    }


  
}
export default NightClubApp
