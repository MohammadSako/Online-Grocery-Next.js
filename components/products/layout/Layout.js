import Footer from './Footer';
import MainNavigation from './MainNavigation';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer/>
    </div>
  );
}

export default Layout;