import { useAppSelector } from "@/store/hooks";
import StyledLink from "@/components/common/StyledLink";
import { faBookOpen, faHome } from "@fortawesome/free-solid-svg-icons";
import { AuthButton } from "@/components/common/AuthButton";

const Navigation = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="navigation">
      {/*       
      <StyledLink href="/" icon={faHome}>
        Каталог
      </StyledLink>

      {isAuthenticated && (
        <StyledLink href="/my-books" icon={faBookOpen}>
          Мои книги
        </StyledLink>
      )}
      <div className="navigation__auth-button">
        <AuthButton />
      </div>
       */}
    </nav>
  );
};

export default Navigation;
