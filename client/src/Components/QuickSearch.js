import React from "react";
import '../Styles/style.css';
import QuickSearchItem from "./QuickSearchItems";

class QuickSearch extends React.Component{
    render(){
        const {mealtypesData} = this.props;
        return(
            
            <div className="container-fluid">
            <div className="container">
            <div className="row">
                    <div className="col-9">
                       <h1 className="quick-search-heading">Quick Search</h1> 
                       <p className="quick-search-subheading">Discover resturant by type of meals</p>
                    </div>
    
                </div>
                <div className="row search-item">
                    {mealtypesData?.map((items) => {
                        return(
                            <QuickSearchItem data = {items} />
                        )
                    })}
                         
                </div>
                


            </div>

            </div>
        )
    }
}
export default QuickSearch;