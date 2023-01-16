import React from "react";
import '../Styles/style.css';

import axios from 'axios';

import withNavigateHook from './HOC';


class Welcome extends React.Component{
    constructor() {
        super();
        this.state = {
            restaurants: [],
            inputText: undefined,
            suggestions: []
        }
    }

    handleLocationChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
            url: `http://localhost:5600/restaurants/${locationId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants })
            })
            .catch(err => console.log(err))
    }
    handleInputChange = (event) => {
        const { restaurant } = this.state;
        const inputText = event.target.value;

        let suggestions = [];

        suggestions = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions });
    }
    selectingRestaurant = (resObj) => {
        this.props.navigation(`/details?restaurant=${resObj}`);
    }

    showSuggestion = () => {
        const { suggestions, inputText } = this.state;

            if (suggestions.length == 0 && inputText == undefined) {
                return null;
            }
            
            if (suggestions.length > 0 && inputText == '') {
                return null;
            }
            
            if (suggestions.length == 0 && inputText) {
                return 
                    <li>No Search Results Found</li>
            }

        return (
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item._id)} >
                        <img className="resImg" src={`./images/${item.image}`} />
                        <span className="resName">{`${item.name}`}</span> <br /> 
                        <span className="resLoc">{`${item.locality}, ${item.city}`} </span> <hr className="line" /> </li>))
        );

    }
    render(){
        const { locationData } = this.props
        return(
            <div>
               

    
    <div className="top-background">
    <img src="./images/bg.png" width="100%&quot;" className="top-bg-image" /> </div>
    
    <div className="contents-wrapper">
    <h1 className="rounded-circle"> e!</h1>
    <h1 className="heading"> Find the best restaurants, cafes, bars</h1>
    <div className="searchcontainer">
    <div className="search ">
   
    <form>
    <div className="row">
     <div className="searchlocation col-lg-5 col-sm-12 col-md-6">
     <select className="form-select form-select-md mb-3 location" aria-label=".form-select-lg example" onChange={this.handleLocationChange}>
                            <option value="0">Please Select Location</option>
                            { locationData.map((item) => {
                                return(
                                    <option value={item.locationId} >
                                        {`${item.location}`}
                                    </option>
                                )
                            })}
                        </select>
    </div>
 
                        
                         <div className="searchresturant  col-lg-7 col-sm-12 col-md-6">
      <i className="fa fa-search"></i>
      <div>
                            <input type="text" className="searchIn" placeholder=" Search for restaurant, foods here" onChange={this.handleInputChange} />
                            <ul className="suggestion" >{this.showSuggestion()}</ul>
                        </div>
  </div>
 
 
    </div></form>
    
    </div>
    
    </div>
        </div>
            </div>
        )
    }
}
export default withNavigateHook(Welcome);
