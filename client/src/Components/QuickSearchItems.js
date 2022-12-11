import React from "react";
import '../Styles/style.css';
import { useNavigate } from 'react-router-dom';

const QuickSearchItem = (props) => {
    const { mealtype, content, image, mealtypeId } = props.data;

    const navigate = useNavigate();

    const ShowFilter = (mealtypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if (locationId){
            navigate(`/filter?mealtype=${mealtypeId}&location=${locationId}`)
        }else{
            navigate(`/filter?mealtype=${mealtypeId}`)
        }
    }
    
        return(
           
                
              

                <div className="col-sm-12 col-md-6 col-lg-4 "  onClick={() => ShowFilter(mealtypeId)}> 
                    <div className="itemcontainar shadow">
                    
                    <div className="row">
                                <div className="col-5">
                                    <img src={`./images/${image}`} width="120px" height="120px" alt="" /> 
                                    

                                </div>
                                <div className="col-7">
                                    <h6 className="dish-cat">{mealtype}</h6>
                                    <p className="dish-dec">{content}</p>
                                </div>
                            </div>
                      
                      </div>
                    
                    </div>

           
        )
    
}
export default QuickSearchItem;