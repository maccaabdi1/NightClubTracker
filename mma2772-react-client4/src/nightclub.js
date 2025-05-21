import { Component } from "react";
import ClubCard from "./clubcard";
import './clubs.css';
import { Col, Container, Row ,Button, Input, FormGroup} from "reactstrap";
import EditClubModal from "./editclubmodel";
import CreateClubModal from "./createclubmodal";

class NightClubApp extends Component

{
    constructor(props)
    {
        super(props)
        this.state = {
        
            clubs:[], 
            isEditModalOpen: false,
            isCreateModalOpen: false,
            currentClub: null,
            filterLocation: "",
            newClubName: "",
            newClubLocation: "",
            newClubGenre: "",
            newClubMaxCapacity: "",
            newClubYellowThreshold: ""

        };

    
    }
    componentDidMount()
    {
        fetch('http://127.0.0.1:5000/api/clubs')
        .then((Response)=>
           
        {
            console.log(Response);
            if(!Response.ok)
            {
                throw new Error('Failed to fetch clubs');
            }
            return Response.json();
        })
        .then((data)=>{
            console.log("Fetch lol: " +  data)
            const transformedData = data.map((club)=>({
                id: club[0],
                name: club[1],
                location: club[2],
                count: club[3],
                max_capacity : club[4],
                genre: club[5],
                yellowThreshold: club[6],

            }));
            transformedData.sort((a,b) => a.name.localeCompare(b.name));
            this.setState({clubs:transformedData})
        })
        .catch((error) =>{
            console.log('Error fetching clubs', error);
        });
           
    }
    toggleEditModal = () => 
    {
        this.setState({isEditModalOpen: !this.state.isEditModalOpen})
    }
    toggleCreateModal = () =>
    {
        this.setState({isCreateModalOpen: !this.state.isCreateModalOpen});
    }

    handleEdit =(club) =>
    {
        this.setState({currentClub : club});
        this.toggleEditModal();
        
    }
    handleAdd = () => 
    {
        this.toggleCreateModal();
    }

    handleEnter = (id) => {
        this.setState((prevState) =>{
            const updatedClubs = prevState.clubs.map((club) =>
            club.id === id && club.count < club.max_capacity
            ? {...club,count: club.count + 1}
            : club
        );

        const updatedClub = updatedClubs.find((club) => club.id === id);
        fetch(`http://127.0.0.1:5000/api/clubs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({count: updatedClub.count}),
        }).catch((error) => console.error('Error updating count:', error));

        return {clubs: updatedClubs};

        })
    }
    

    handleLeave = (id) => {
        this.setState((prevState) =>{
            const updatedClubs = prevState.clubs.map((club) =>
            club.id === id && club.count > 0
            ? {...club,count: club.count - 1 }
            : club
        );

        const updatedClub = updatedClubs.find((club) => club.id === id);
        fetch(`http://127.0.0.1:5000/api/clubs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({count: updatedClub.count}),
        }).catch((error) => console.error('Error updating count:', error));

        return {clubs: updatedClubs};

        })

}
handleSaveEdit =(Event) =>
{
    Event.preventDefault();
    const { currentClub } = this.state;
    const formData = new FormData(Event.target);
    const updatedClub = {
        name: formData.get('name'),
        location: formData.get('location'),
        genre: formData.get('genre'),
        max_capacity: parseInt(formData.get('max_capacity')) ,
        yellowThreshold: parseInt(formData.get('yellowThreshold'))

    }
    fetch(`http://127.0.0.1:5000/api/clubs/${currentClub.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(updatedClub),
    })
        .then((Response)=>   
        {
            if(!Response.ok)
            {
                throw new Error('Failed to update club');
            }
            return Response.json();
        })
        .then(()=>{
            this.componentDidMount()
           
        })
        .catch((error) =>{
            console.log('Error updating', error);
        });
        this.toggleEditModal()


}
handleSaveAdd = (Event) =>{
    Event.preventDefault();

    const newClub = {
        name: this.state.newClubName,
        location: this.state.newClubLocation,
        count: 0,
        genre: this.state.newClubGenre,
        max_capacity: parseInt(this.state.newClubMaxCapacity),
        yellowThreshold: parseInt(this.state.newClubYellowThreshold)
    };

    fetch("http://127.0.0.1:5000/api/clubs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(newClub),
    })
        .then((Response)=>   
        {
            if(!Response.ok)
            {
                throw new Error('Failed to fetch clubs');
            }
            return Response.json();
        })
        .then(()=>{
            this.componentDidMount();
        })
        .catch((error) =>{
            console.log('Error fetching clubs', error);
        });
        this.toggleCreateModal()

};



   



handleFilterChange = (Event) =>
{
    this.setState({filterLocation: Event.target.value})
}
handleDelete = (id) =>
{
    const confirmDelete = window.confirm("Are you sure you want to delete this club?");
    if(!confirmDelete){
        return;
    }
    fetch(`http://127.0.0.1:5000/api/clubs/${id}`, {
        
        method: 'DELETE',
    })
        .then((Response)=>   
        {
            if(!Response.ok)
            {
                throw new Error('Failed to delete club');
            }
            return Response.json();
        })
        .then(()=>{
            this.componentDidMount();
        })
        .catch((error) =>{
            console.log('Error Deleting', error);
        });
}

statusColor = (club) =>
{
    const {count, max_capacity , yellowThreshold} = club;
    if(count >= max_capacity)
    {
        return {status: "No one allowed in", backgroundColor:"#FF6961"}
    }else if(count >= (yellowThreshold/100) * max_capacity){
        return {status: "Warn the bouncers....", backgroundColor: "#FDFD96"}
    }else{
        return {status: "Welcome", backgroundColor: "palegreen"}
    }

    

    
    
}
handleInputChange = (field, value) =>{
    this.setState({[field]: value});
};



    render()
    {
        
        const { clubs, isEditModalOpen, currentClub, isCreateModalOpen, filterLocation} = this.state;
        
        const filteredClubs = filterLocation
        ? clubs.filter((club) => club.location.toLowerCase().includes(filterLocation.toLowerCase()))
        : clubs;
        return (
           <Container className="mt-4">
            <Row>
                <Col>
                <h1>NightClub Capacity Tracker</h1>
                <h3>Each time someone enters/ leaves the club, select the correct club and click the appropriate button</h3>
                
                </Col>
                <div className="add-button">
                <Button onClick={this.handleAdd} color="primary" >
                        Add
                </Button>
                </div>
               
                
            </Row>
            <Row>
              
                <Col x= "18" md= "15" lg="13"  className="mx-auto">
                <FormGroup>
                    <Input
                    type= "text"
                    id= "filterLocation"
                    placeholder="Enter Location (e.g. Paris)"
                    value={filterLocation}
                    onChange={this.handleFilterChange}
                    className="filter-bar"
                />
                </FormGroup>
                </Col>
              
            </Row>
               
            <Row className="club-container">
                {filteredClubs.map((club) => {
                    console.log(club);
                    const {status, backgroundColor} = this.statusColor(club);
                    return(
                    <Col key={club.id} >
                    <ClubCard
                        id={club.id}
                        name = {club.name}
                        location = {club.location}
                        count = {club.count}
                        max_capacity = {club.max_capacity}
                        status =  {status}
                        backgroundColor = {backgroundColor}
                        onEnter = {() => this.handleEnter(club.id)}
                        onLeave = {() => this.handleLeave(club.id)}
                        onEdit = {() => this.handleEdit(club)} 
                        onDelete = {() => this.handleDelete(club.id)}
                        
                    
                         />
                    </Col>
                    );
                    })}
            </Row>
            <EditClubModal
            
            isOpen={isEditModalOpen}
            toggle = {this.toggleEditModal}
            currentClub = {currentClub}
            onSave = {this.handleSaveEdit}
            />  
            <CreateClubModal
            isOpen = {isCreateModalOpen}
            toggle = {this.toggleCreateModal}
            onSave = {this.handleSaveAdd}
            onChange = {this.handleInputChange}
            
            />
           
            </Container>
        )
    }
  
}
export default NightClubApp