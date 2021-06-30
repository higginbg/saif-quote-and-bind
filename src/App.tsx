import QuoteForm from './components/Forms/QuoteForm';

import styles from './app.module.scss';

const App = () => (
  <div className={styles.Wrapper}>
    <div className={styles.Container}>
      <QuoteForm />
    </div>
  </div>
);

export default App;
