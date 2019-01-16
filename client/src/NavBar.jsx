import React from "react";
import SearchPanel from "./SearchPanel.jsx";

const NavBar = ({ user, categories, resetState, setEvents, setEventsTmp, setListItemSelected, closeChat, orderby }) => {

  let generateUserColor = user_id => {
    let hue = (user_id * 70) % 360;
    return `hsl(${hue}, 90%, 50%)`;
  };

  // Open user's MyList
  let openMyList = () => {
    $(".myList").is(":visible")
      ? // close list
      $(".myList").slideUp() &&
      $(".btn-mylist").removeClass("mylist-on") &&
      $(".btn-mylist").text("MyList")
      : // open list
      $(".myList").slideDown() &&
      $(".btn-mylist").addClass("mylist-on") &&
      $(".btn-mylist").text("Close");
  }

  ///////////// nav bar before log-in ///////////////
  let outside = (
    <div className="nav-right flexR enter">
      <div
        onClick={e => {
          window.scrollTo(0, 0);
          document.querySelector(".registration-wrapper").style.display =
            "flex";
          $("body").addClass("stop-scrolling");
        }}
      >
        register
          </div>
      &nbsp;/&nbsp;
          <div
        onClick={e => {
          //relocate the iniative postion of pop-up window
          window.scrollTo(0, 0);
          document.querySelector(".login-wrapper").style.display = "flex";
          $("body").addClass("stop-scrolling");
        }}
      >
        log-in
          </div>
    </div>
  );

  ///////////// nav bar before log-in ///////////////
  let inside = (
    <div className="nav-right flexR">
      <div
        className="user_icon_nav"
        style={{
          backgroundColor: generateUserColor(user.userID)
        }}
      />

      <div className="userName">
        {user.username}
      </div>

      <div
        className="log-out"
        onClick={e => {
          resetState();
        }}
      >
        log-out
          </div>

      <button
        className="btn-mylist"
        style={{ visibility: user.status ? "block" : "hidden" }}
        onClick={openMyList}
      >
        Mylist
          </button>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="navbar-content flexR">
        <a className="title">relEVENT</a>
        {user.status ? inside : outside}
      </div>
      <SearchPanel
        categories={categories}
        setEvents={setEvents}
        setEventsTmp={setEventsTmp}
        setListItemSelected={setListItemSelected}
        closeChat={closeChat}
        orderby={orderby}
      />
    </nav>

  );
};

export default NavBar;
