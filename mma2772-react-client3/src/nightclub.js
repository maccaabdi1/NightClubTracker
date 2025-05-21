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
        
            clubs:[
                {id: 1, name: 'Club Arcane',location: "Toronto", count: 0, maxCap: 100, genre: "EDM", yellowThreshold:70},
                {id: 2 ,name: 'Club Underground',location:"LA" ,count: 0, maxCap: 50, genre: "Hip-Hop", yellowThreshold: 30},
                {id: 3, name:'Club Soda', count: 0,location: "Chicago", maxCap: 20, genre:"Pop" , yellowThreshold:12 },
                {id: 4, name:'Studio 52',location: "Lagos", count:0, maxCap: 52, genre:"Afro-Beats" , yellowThreshold:12},
            ], 
            isEditModalOpen: false,
            isCreateModalOpen: false,
            currentClub: null,
            filterLocation: "",

        };

    
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

    handleEnter = (id) => 
    {
        this.setState((prevState) =>(
        {
            clubs: prevState.clubs.map((club) =>
            
                club.id === id && club.count < club.maxCap 
                ? {...club, count: club.count + 1 }
                : club
            ),
        }));
    };
    handleLeave = (id) => {
        this.setState((prevState) => (
            {
        
        clubs: prevState.clubs.map((club) =>
            club.id === id && club.count >0
            ? {...club, count: club.count -1}
            :club
        ),
    }));

}
handleSaveEdit =(Event) =>
{
    Event.preventDefault();
    const { currentClub , clubs} = this.state;
    const formData = new FormData(Event.target);
    const updatedClub = {
        ...currentClub,
        name: formData.get('name'),
        location: formData.get('location'),
        genre: formData.get('genre'),
        maxCap: (formData.get('maxCap')),
        yellowThreshold: (formData.get('yellowThreshold'))

    }
    this.setState({
        clubs: clubs.map((club) => (club.id === currentClub.id ? updatedClub: club)),
    });

    this.toggleEditModal()

}
handleSaveAdd = (Event) =>
{
    Event.preventDefault();
    const formData = new FormData(Event.target);
    const newClub = {
        id: this.state.clubs.length + 1,
        name: formData.get('name'),
        location: formData.get('location'),
        genre: formData.get('genre'),
        maxCap: parseInt(formData.get('maxCap')),
        yellowThreshold: parseInt(formData.get('yellowThreshold')),
        count: 0,

    }
    this.setState({
        clubs: [...this.state.clubs, newClub],
    });
    this.toggleCreateModal()


}
handleFilterChange = (Event) =>
{
    this.setState({filterLocation: Event.target.value})
}
handleDelete = (id) =>
{
    this.setState((prevState) => ({
        clubs: prevState.clubs.filter((club) => club.id !== id), 
    }));
}

statusColor = (club) =>
{
    const {count, maxCap , yellowThreshold} = club;
    if(count >= maxCap)
    {
        return {status: "No one allowed in", backgroundColor:"#FF6961"}
    }else if(count >= (yellowThreshold/100) * maxCap){
        return {status: "Warn the bouncers....", backgroundColor: "#FDFD96"}
    }else{
        return {status: "Welcome", backgroundColor: "palegreen"}
    }

    

    
    
}



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
                    const {status, backgroundColor} = this.statusColor(club);
                    return(
                    <Col key={club.id} >
                    <ClubCard
                        id={club.id}
                        name = {club.name}
                        location = {club.location}
                        count = {club.count}
                        maxCap = {club.maxCap}
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
            
            />
           
            </Container>
        )
    }


  
}
export default NightClubApp