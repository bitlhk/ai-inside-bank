import { useApp } from '@/contexts/AppContext';
import { PhoneShell, TabBar, FAB } from '@/components/PhoneShell';
import HomePage from './HomePage';
import CreditCardPage from './CreditCardPage';
import WealthPage from './WealthPage';
import LifePage from './LifePage';
import ProfilePage from './ProfilePage';
import TransferPage from './TransferPage';
import RepayPage from './RepayPage';
import DepositPlanPage from './DepositPlanPage';
import GxzPage from './GxzPage';

export default function Home() {
  const { currentPage } = useApp();

  return (
    <PhoneShell>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'cc' && <CreditCardPage />}
      {currentPage === 'wealth' && <WealthPage />}
      {currentPage === 'life' && <LifePage />}
      {currentPage === 'prof' && <ProfilePage />}
      {currentPage === 'xfer' && <TransferPage />}
      {currentPage === 'repay' && <RepayPage />}
      {currentPage === 'deposit-plan' && <DepositPlanPage />}
      {currentPage === 'gxz' && <GxzPage />}
      <TabBar />
      <FAB />
    </PhoneShell>
  );
}
