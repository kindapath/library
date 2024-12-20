import Link from "next/link";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface StyledLinkProps {
  href: string;
  children: ReactNode;
  icon?: IconDefinition;
  className?: string;
}

const StyledLink = ({
  href,
  children,
  icon,
  className = "",
}: StyledLinkProps) => {
  return (
    <Link href={href} className={`styled-link ${className}`}>
      {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: "8px" }} />}
      {children}
    </Link>
  );
};

export default StyledLink;
