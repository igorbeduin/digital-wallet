import {
  faHouse,
  faMoneyBill,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";

const pages = [
  {
    name: "Início",
    id: "/home",
    icon: faHouse,
  },
  {
    name: "Negociar",
    id: "/negotiate",
    icon: faMoneyBill,
  },
  {
    name: "Extrato de transações",
    id: "/transactions",
    icon: faMoneyCheck,
  },
];

export default pages;
