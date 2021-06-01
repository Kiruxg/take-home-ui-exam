import React from "react"
import FadeIn from "react-fade-in"

export default function UserProfile(props) {
  return (
    <label className="user__profile" onClick={props.updateCheckbox}>
      <input type="checkbox" className="user__checkbox" id="user-toggle" name="toggled" />
      <div>
        <span className={props.isOnline ? "user__online" : "user__offline"}></span>
        <img src={`https://ui-avatars.com/api/?name=${props.user_name}&background=${props.favorite_color}&color=fff&rounded=true`} alt="profile" className="user__image" />
      </div>
      <p className="user__name">{props.user_name}</p>
      <FadeIn className="user__card">
        {props.toggled && (
          <div>
            <p>Email: {props.email_address}</p>
            <p>Phone Number: {props.phone_number}</p>
            <p>Department: {props.department}</p>
            <p>
              <span className={props.isOnline ? "user-online" : "user-offline"}></span>
              {props.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        )}
      </FadeIn>
    </label>
  )
}
