import PropTypes from "prop-types";
import "../styles/header.css";

const Header = ({ children }) => {
  return (
    <header className="appHeader">
      <h1>photoTag</h1>
      <div className="headerCharacters">{children}</div>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default Header;
