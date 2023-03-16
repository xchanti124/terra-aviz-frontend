import styles from "../styles/about.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>About Us</h2>
      <p>We are a team of blooming developers building our first project under TechLabs.</p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to create a platform where folks can share their discovered locales that are close to their
        hearts with the rest of the world.
      </p>
      <p>Happy Discovering!</p>
      <p>-Chantal,Olya,Dominik and Meera.</p>
    </div>
  );
};

export default About;
