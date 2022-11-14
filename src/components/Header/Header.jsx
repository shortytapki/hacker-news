import Button from '../Button/Button';
import GradientText from '../GradientText/GradientText';
import styles from './Header.module.css';

const Header = ({ page, handler }) => {
  return (
    <header className={styles.header}>
      <GradientText>
        <h1>Hacker news_¯\_(ツ)_/¯</h1>
      </GradientText>
      <Button page={page} handler={handler} />
    </header>
  );
};

export default Header;
