import { Component } from "react";

const API_BASE = "http://192.249.18.176:443"

class SlideItem extends Component {
    render () {
        
        return (
            <div class = "slide_item">
                                <p class = "favorite_recipe_title">{this.props.title}</p>
                {
                    this.props.img ? <img className="favorite_image" style={{ width: "170px", height: "170px" }} src={`${API_BASE}/image/${this.props.img}`} /> : <></>
                }

            </div>
        );
    }
}

export default SlideItem;