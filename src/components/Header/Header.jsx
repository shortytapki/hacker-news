import GradientText from '../GradientText/GradientText';
import styles from './Header.module.css';
import Button from '../Button/Button';

const Header = () => {
  return (
    <header className={styles.header}>
      <GradientText>
        <h1>Hacker news_¯\_(ツ)_/¯</h1>
      </GradientText>
      <Button>Refresh</Button>
    </header>
  );
};

export default Header;
