import React from "react";

const ProfileForm = () => {
  return (
    <form className="profile-form">
      {/* 1 */}
      <div className="form-control">
        <label htmlFor="name">სახელი</label>
        <input
          className="input"
          type="text"
          id="name"
          placeholder="თქვენი სახელი"
        />
      </div>
      {/* 2 */}
      <div className="form-control">
        <label htmlFor="surname">გვარი</label>
        <input
          className="input"
          type="text"
          id="surname"
          placeholder="თქვენი გვარი"
        />
      </div>
      {/* 3 */}
      <div className="form-control">
        <label htmlFor="number">ნომერი</label>
        <input className="input" type="number" placeholder="თქვენი ნომერი" />
      </div>
      {/* 4 */}
      <div className="form-control">
        <label htmlFor="email">მეილი</label>
        <input className="input" type="text" placeholder="თქვენი მეილი" />
      </div>
      <button className="btn btn-success">განახლება</button>
    </form>
  );
};

export default ProfileForm;
