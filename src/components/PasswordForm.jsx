import React from "react";

const PasswordForm = () => {
  return (
    <form className="profile-form">
      {/* 1 */}
      <div className="form-control">
        <label htmlFor="name">ძველი პაროლი</label>
        <input
          className="input"
          type="password"
          id="name"
          placeholder="ძეველი პაროლი"
        />
      </div>
      {/* 2 */}
      <div className="form-control">
        <label htmlFor="surname">ახალი პაროლი</label>
        <input
          className="input"
          type="password"
          id="surname"
          placeholder="ახალი პაროლი"
        />
      </div>
      {/* 3 */}
      <div className="form-control">
        <label htmlFor="number">გაიმეორეთ</label>
        <input
          className="input"
          type="password"
          placeholder="გაიმეორეთ ძველი პაროლი"
        />
      </div>
      <button className="btn btn-success">განახლება</button>
    </form>
  );
};

export default PasswordForm;
