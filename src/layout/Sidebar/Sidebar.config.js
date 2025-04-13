import { HomeOutlined, MoneyCollectOutlined, FileTextOutlined, DollarCircleOutlined, CreditCardOutlined, BankOutlined, CalendarOutlined } from '@ant-design/icons';

export const sidebarConfig = [
  {
    title: "Przegląd",
    path: "/overview",
    icon: <HomeOutlined />,
  },
  {
    title: "Przychody",
    path: "/income",
    icon: <DollarCircleOutlined />,
  },
  {
    title: "Stałe wydatki",
    path: "/recurring-bills",
    icon: <CreditCardOutlined />,
  },
  {
    title: "Bieżące wydatki",
    path: "/transactions",
    icon: <MoneyCollectOutlined />,
  },
  {
    title: "Skarbonka",
    path: "/pots",
    icon: <BankOutlined />,
  },
  {
    title: "Bilans",
    path: "/balance-sheet",
    icon: <FileTextOutlined />,
  },
  {
    title: "Kalendarz",
    path: "/month-selector",
    icon: <CalendarOutlined />,
  },
];
