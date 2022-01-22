import { Component } from "react";

class SlideItem extends Component {
    render () {
        
        return (
            <div class = "slide_item">
                <p class = "favorite_recipe_title">{this.props.title}</p>
            </div>
        );
    }
}

export default SlideItem;