import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Contact from "../pages/contact/page";
import ProductOverview from "../pages/product-overview/page";
import SeminarOverview from "../pages/seminar-overview/page";
import Column from "../pages/column/page";
import GenreList from "../pages/column/GenreListPage";
import ArticleDetail from "../pages/column/ArticleDetailPage";
import Company from "../pages/company/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/product-overview",
    element: <ProductOverview />,
  },
  {
    path: "/seminar-overview",
    element: <SeminarOverview />,
  },
  {
    path: "/column",
    element: <Column />,
  },
  {
    path: "/column/:genre",
    element: <GenreList />,
  },
  {
    path: "/column/:genre/:slug",
    element: <ArticleDetail />,
  },
  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
