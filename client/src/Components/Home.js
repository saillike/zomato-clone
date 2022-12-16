import React from 'react';
import axios from 'axios';
import '../Styles/style.css';
import Welcome from './Welcome';
import QuickSearch from './QuickSearch';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            locations: [],
            mealtype: []
        }
    }

    componentDidMount(){
        sessionStorage.clear();
        axios({
            url: 'https://zomato-clone-dusky.vercel.app/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ locations: res.data.locations})
        })
        .catch(err => console.log(err))

        axios({
            url: 'https://zomato-clone-dusky.vercel.app/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ mealtypes: res.data.mealtypes})
        })
        .catch(err => console.log(err))
    }
    render(){
        const { locations, mealtypes } = this.state;
        return(
            <div>
                {/* Header */}
                <Welcome locationData = { locations } />
                
                {/* Quick Search */}
                <QuickSearch mealtypesData = {mealtypes} />
            </div>
        )
    }
}
export default Home;
