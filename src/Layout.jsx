import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header className="main-header">
        <h1>Recipe Box</h1>
        <nav>
          <Link to="/">Home / Recipes</Link>
          <Link to="/add">Add New Recipe</Link>
        </nav>
      </header>

      <main>
        {/* المكان اللي هينزل فيه محتوى الصفحة الشغالة حالياً */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;