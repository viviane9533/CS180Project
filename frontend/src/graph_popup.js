import React from "react"
import './graph_popup.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setTrigger(false)}><i class="fa-solid fa-x"></i></button>
                { props.children }
            </div>
        </div>
    )
    :
    "";
}

export default Popup