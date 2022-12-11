import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselComponent() {
    return (
        <div className="Carousel-wrapper">
            <Carousel>
                <div>
                    <img src="./Img/Dinner.png" />
                </div>
                <div>
                    <img src="./Img/Breakfast.png" />
                </div>
                <div>
                    <img src="./Img/Drinks.png" />
                </div>
                <div>
                    <img src="./Img/Night life.png" />
                </div>
            </Carousel>
    
        </div>
    );
}