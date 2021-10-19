import { Route, Switch } from 'react-router';
import './App.css';
import ProductsFeature from './Features';
import CartFeature from './Features/components/Cart';
import Header from './Features/components/Header';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/products'>
          <ProductsFeature />
        </Route>
        <Route path='/cart'>
          <CartFeature />
        </Route>
      </Switch>
    </>
  );
}

export default App;
