import React from 'react';
import '../Styles/Filter.css';
import axios from 'axios';

import withNavigateHook from './HOC';
const queryString = require('query-string');

class Filter extends React.Component{
    constructor() {
        super();
        this.state = {
            restaurant: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: [],
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1
        }
    }
    componentDidMount() {
        const qs = queryString.parse(window.location.search);
        const { mealtype, location } = qs;

        const filterObj = {
            mealtype: mealtype,
            location: location
        };

        axios({
            url: 'http://localhost:5600/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, mealtype, location })
            })
            .catch(err => console.log(err))

        axios({
            url: 'http://localhost:5600/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
            .then(res => {
                this.setState({ locations: res.data.locations})
            })
            .catch(err => console.log(err))
    }
    handleSortChange = (sort) => {
        const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            location: location,
            lcost,
            hcost,
            page,
            sort
        };
        axios({
            url: 'http://localhost:5600/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, sort })
            })
            .catch(err => console.log(err))
    }

    handleCostChange = (lcost, hcost) => {
        const { cuisine, mealtype, location, sort, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            location: location,
            lcost,
            hcost,
            page,
            sort
        };
        axios({
            url: 'http://localhost:5600/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, lcost, hcost })
            })
            .catch(err => console.log(err))
    }
    handlePageChange = (page) => {
      /* This function will be invoked on pagination value change from filter page,
       and would automatically invoke filter API to fetch the updated restaurants basis the changed selection */
  
  
      const { location, cuisine, mealtype, hcost, lcost, sort } = this.state;
  
      // making the input object for filter API basis changed pagination
      let filterObj = {
        location: location,
        mealtype: mealtype,
        cuisine_id: cuisine.length != 0 ? cuisine : undefined,
        hcost,
        lcost,
        sort,
        page
      };
  
  
      axios({
        method: 'POST',
        url: 'http://localhost:5600/filter',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
      })
        .then(res => this.setState({ restaurantList: res.data.restaurant, pageCount: res.data.pageCount, page: page }))
        .catch(err => console.log(err))
    }
    handleCuisineChange = (cuisineId) => {
      /* This function will be invoked on cuisine value change from filter page,
       and would automatically invoke filter API to fetch the updated restaurants basis the changed selection */
  
      const { cuisine, location, mealtype, hcost, lcost, sort, page } = this.state;
  
      // pushing and poping the cuisines values from array
      if (cuisine.indexof(cuisineId) == -1) {
        cuisine.push(cuisineId);
      }
      else {
        var index = cuisine.indexOf(cuisineId);
        cuisine.splice(index, 1);
      }
  
      // making the input object for filter API basis changed cuisine
      let filterObj = {
        mealtype: mealtype,
        location: location,
        cuisine: cuisine.length != 0 ? cuisine : undefined,
        lcost,
        hcost,
        page,
        sort
      };
  
  
      axios({
        url: 'http://localhost:8000/filter',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
      })
        .then(res => this.setState({ restaurant: res.data.restaurants, cuisine: cuisine }))
        .catch(err => console.log(err))
    }
    handleCuisineChange = (cuisineId) => {
      /* This function will be invoked on cuisine value change from filter page,
       and would automatically invoke filter API to fetch the updated restaurants basis the changed selection */
  
      const { cuisine, location, mealtype, hcost, lcost, sort, page } = this.state;
  
      // pushing and poping the cuisines values from array
      if (cuisine.indexof(cuisineId) == -1) {
        cuisine.push(cuisineId);
      }
      else {
        var index = cuisine.indexOf(cuisineId);
        cuisine.splice(index, 1);
      }
  
      // making the input object for filter API basis changed cuisine
      let filterObj = {
        mealtype: mealtype,
        location: location,
        cuisine: cuisine.length != 0 ? cuisine : undefined,
        lcost,
        hcost,
        page,
        sort
      };
  
  
      axios({
        url: 'http://localhost:5600/filter',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
      })
        .then(res => this.setState({ restaurant: res.data.restaurants, cuisine: cuisine }))
        .catch(err => console.log(err))
    }
  
    handleLocationChange = (event) => {
        const location = event.target.value;
        const { mealtype, cuisine, sort, lcost, hcost, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine,
            location: location,
            lcost,
            hcost,
            page,
            sort
        };
        axios({
            url: 'http://localhost:5600/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, location })
            })
            .catch(err => console.log(err))
    }
    handleNavigate = (resId) => {
        this.props.navigation(`/details?restaurant=${resId}`)
    }

    render(){
        const { restaurant, locations, pageCount } = this.state;
        //const { navigation } = this.props;
        return(
<div>
<div className="container-fluid">
  
  <div className="container">
    <div className="row">
      <div className="col-9">
        <h1 className="placehead">Breakfast Place in Mumbai</h1> 
      </div>
    </div>
    <div className="row">
      <div className="col-lg-3 col-sm-11 left-side shadow rounded">
        <h3 className="fliter">Filters</h3>
        <form method="post" name="filter-location">
          <p>Select Location</p>
          <select className="form-select form-select-md mb-3 location" aria-label=".form-select-lg example" onChange={this.handleLocationChange}>
          <div className="Select-Location">Select Location</div>
                                            {
                                                locations.map((item) => {
                                                    return(
                                                        <option value={item.locationId} >
                                                            {`${item.location}`}
                                                        </option>
                                                    )
                                                })
                                            }
                                        
          </select>
        </form>
        <form name="dish-type" className="dish-type">
          <p>Cuisine</p>
          <div className="form-check">
            <input className="form-check-input" type="checkbox"  id="flexCheckDefault" value="1" onChange={() => this.handleCuisineChange(1)} />
            <label className="form-check-label cuisine" htmlFor="flexCheckDefault">
              North Indian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox"  id="flexCheckChecked" onChange={() => this.handleCuisineChange(2)}  />
            <label className="form-check-label cuisine" htmlFor="flexCheckChecked">
              South Indian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox"  id="flexCheckChecked" onChange={() => this.handleCuisineChange(3)}  />
            <label className="form-check-label cuisine" htmlFor="flexCheckChecked">
              Chienese
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox"  id="flexCheckDefault" onChange={() => this.handleCuisineChange(4)}  />
            <label className="form-check-label cuisine" htmlFor="flexCheckDefault">
              Fast Food
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={() => this.handleCuisineChange(5)} />
            <label className="form-check-label cuisine" htmlFor="flexCheckDefault">
              Street Food
            </label>
          </div>
        </form>
        <form name="cost-for" className="cost-for">
          <p>Cost for Two</p>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="cost" id="flexRadioDefault1" onChange={() => this.handleCostChange(0, 500)}/>
            <label className="form-check-label" htmlFor="flexRadioDefault1">
            Less than &#8377; 500
            </label>
          </div>
         <div className="form-check">
                  <input className="form-check-input" type="radio" name="cost" id="flexRadioDefault1" onChange={() => this.handleCostChange(500, 1000)} />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                      &#8377; 500 to &#8377; 1000
                  </label>
              </div><div className="form-check">
                      <input className="form-check-input" type="radio" name="cost" id="flexRadioDefault1" onChange={() => this.handleCostChange(1000, 1500)} />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                          &#8377; 1000 to &#8377; 1500
                      </label>
                  </div><div className="form-check">
                      <input className="form-check-input" type="radio" name="cost" id="flexRadioDefault1" onChange={() => this.handleCostChange(1500, 2000)} />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                          &#8377; 1500 to &#8377; 2000
                      </label>
                  </div><div className="form-check">
                      <input className="form-check-input" type="radio" name="cost" id="flexRadioDefault1" onChange={() => this.handleCostChange(2000, 5000)} />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                          &#8377; 2000 +
                      </label>
                  </div></form>
                  <form name="price-filter" class="price-filter">
                  <div className="Cuisine">Sort</div>
                  <div className="form-check">
                         <input className="form-check-input" type="radio" name="sort" id="flexRadioDefault1" onChange={() => this.handleSortChange(1)} />
                          <label className="form-check-label" htmlFor="flexRadioDefault1">
                              Price low to high
                          </label>
                     </div>
                     <div className="form-check">
                      <input className="form-check-input" type="radio" name="sort" id="flexRadioDefault1" onChange={() => this.handleSortChange(-1)} />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                              Price heigh to low
                          </label>
                     </div></form></div>
                     <div className="col-lg-8 col-sm-11 right-side">
                      {restaurant.length != 0 ? restaurant.map((item) => {
                          return (
                              <div className="container shadow resturant-detail" onClick={() => this.handleNavigate(item._id)}>
                                  <div className="row">
                                      <div className="col-3">
                                          <img src={`./images/${item.image}`} width="120px" height="120px" className="rounded-corner" />
                                      </div>
                                      <div className="col-9">
                                          <h6>{item.name}</h6>
                                          <p className="resturant-name">{item.city}</p>
                                          <p className="resturant-add">{item.locality}</p>
                                      </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                      <div className="col-3 text-uppercase">Cuisine: </div>
                                      <div className="col-9">{item.cuisine.map((data) => `${data.name}, `)}</div>
                                  </div>
                                  <div className="row">
                                      <div className="col-3 text-uppercase">Cost for Two:</div>
                                      <div className="col-9">₹{item.min_price} </div>
                                  </div>
                              </div>
                          );
                      }
                      ) : <div className='no-elements'> No Results found ....</div>}

                      {restaurant.length != 5 ?
                          <div className="container page-navigation" style={{ marginTop: 25 }}>
                              <ul className="pagination justify-content-center">
                                  <li className="page-item disabled">
                                      <a className="page-link" href="#" tabIndex={-1}>&lt;</a>
                                  </li>
                                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                                  <li className="page-item"><a className="page-link" href="#">4</a></li>
                                  <li className="page-item"><a className="page-link" href="#">5</a></li>
                                  <li className="page-item">
                                      <a className="page-link" href="#">&gt;</a>
                                  </li>
                              </ul>
                          </div> : null}


                         
                          </div>
    </div>
  </div>
</div>
            

</div>

)

    }



}
export default withNavigateHook(Filter);