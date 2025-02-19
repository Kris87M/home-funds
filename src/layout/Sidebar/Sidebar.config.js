import { HomeOutlined, MoneyCollectOutlined, FileTextOutlined, DollarCircleOutlined, CreditCardOutlined } from '@ant-design/icons';

export const sidebarConfig = [
  {
    title: "Przegląd",
    path: "/overview",
    icon: <HomeOutlined />,
  },
  {
    title: "Bieżące wydatki",
    path: "/transactions",
    icon: <MoneyCollectOutlined />,
  },
  {
    title: "Bilans",
    path: "/balance-sheet",
    icon: <FileTextOutlined />,
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
];
