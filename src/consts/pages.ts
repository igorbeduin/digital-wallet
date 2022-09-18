import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faHouse,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";

interface PageInterface {
  name: string,
  id: string,
  icon: IconDefinition,
}

const pages: Array<PageInterface> = [
  {
    name: "Início",
    id: "/home",
    icon: faHouse,
  },
  {
    name: "Extrato",
    id: "/transactions",
    icon: faMoneyCheck,
  },
];

export default pages;
