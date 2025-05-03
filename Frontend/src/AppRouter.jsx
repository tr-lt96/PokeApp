import { Routes, Route } from "react-router";
import { AuthLayout } from "./pages/auth/AuthLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { PokemonSearchPage } from "./pages/search/PokemonSearchPage";
import { PageLayout } from "./pages/PageLayout";
import { PokemonInfoPage } from "./pages/pokemon-info/PokemonInfoPage";
import { TeamInfoPage } from "./pages/team-info/TeamInfoPage";
import { UserPage } from "./pages/user/UserPage";
import { TeamListPage } from "./pages/team-info/TeamListPage";
import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/Page404";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route index element={<HomePage />} />
        <Route path="pokemon">
          <Route path="search" element={<PokemonSearchPage />} />
          <Route path=":pokemonName" element={<PokemonInfoPage />} />
        </Route>
        <Route path="team">
          <Route index element={<TeamListPage />} />
          <Route path=":teamId" element={<TeamInfoPage />} />
        </Route>
        <Route path="user" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
