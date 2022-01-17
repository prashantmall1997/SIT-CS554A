import "../App.css";
import homepagePokeGIF from "./../img/homepagePokeGIF.gif";

const Homepage = (props) => {
  return (
    <div>
      <img src={homepagePokeGIF} alt="loading GIF" />

      <p>
        You can't unsee this (: And now that you are here, head over to the tabs
        above and explore the PokeWorld!!!
      </p>
    </div>
  );
};

export default Homepage;
