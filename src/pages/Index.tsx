import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Tab = 'home' | 'savings' | 'transfers' | 'settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [balance, setBalance] = useState(125850.50);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferRecipient, setTransferRecipient] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();

  const [savings, setSavings] = useState([
    { name: 'Отпуск 2026', current: 85000, goal: 150000 },
    { name: 'Новый гаджет', current: 42000, goal: 80000 }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Продуктовый', amount: -3500, date: '03 дек', icon: 'ShoppingCart' },
    { id: 2, name: 'Зарплата', amount: 85000, date: '01 дек', icon: 'TrendingUp' },
    { id: 3, name: 'Кафе', amount: -1200, date: '02 дек', icon: 'Coffee' }
  ]);

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (amount && amount > 0 && amount <= balance && transferRecipient) {
      setBalance(prev => prev - amount);
      setTransactions(prev => [
        { id: Date.now(), name: transferRecipient, amount: -amount, date: 'Сегодня', icon: 'Send' },
        ...prev
      ]);
      toast({
        title: "Перевод выполнен!",
        description: `${amount.toLocaleString('ru-RU')} ₽ отправлено ${transferRecipient}`,
      });
      setIsTransferModalOpen(false);
      setTransferAmount('');
      setTransferRecipient('');
    } else {
      toast({
        title: "Ошибка",
        description: "Проверьте сумму и получателя",
        variant: "destructive"
      });
    }
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount && amount > 0) {
      setBalance(prev => prev + amount);
      setTransactions(prev => [
        { id: Date.now(), name: 'Пополнение счёта', amount: amount, date: 'Сегодня', icon: 'Plus' },
        ...prev
      ]);
      toast({
        title: "Счёт пополнен!",
        description: `+${amount.toLocaleString('ru-RU')} ₽`,
      });
      setIsDepositModalOpen(false);
      setDepositAmount('');
    }
  };

  const handleNewGoal = () => {
    const amount = parseFloat(newGoalAmount);
    if (newGoalName && amount && amount > 0) {
      setSavings(prev => [...prev, { name: newGoalName, current: 0, goal: amount }]);
      toast({
        title: "Цель создана!",
        description: `Начните копить на ${newGoalName}`,
      });
      setIsNewGoalModalOpen(false);
      setNewGoalName('');
      setNewGoalAmount('');
    }
  };

  const handleQuickTransfer = (contactName: string) => {
    setTransferRecipient(contactName);
    setIsTransferModalOpen(true);
  };

  const handleRemoveAds = () => {
    setAdsEnabled(false);
    setIsPremiumModalOpen(false);
    toast({
      title: "Реклама отключена!",
      description: "Спасибо за поддержку CyberBank Premium 🚀",
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? "Уведомления отключены" : "Уведомления включены",
      description: notificationsEnabled ? "Вы не будете получать уведомления" : "Вы будете получать уведомления о транзакциях",
    });
  };

  const handleSecuritySettings = () => {
    toast({
      title: "Безопасность",
      description: "Биометрическая защита активна 🔒",
    });
  };

  const handleCardManagement = () => {
    toast({
      title: "Мои карты",
      description: "CyberCard **** 4567 активна",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className={`transition-all duration-500 ${activeTab === 'home' ? 'animate-fade-in' : 'hidden'}`}>
        {activeTab === 'home' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">CyberBank</h1>
                <p className="text-muted-foreground">Банк будущего</p>
              </div>
              <Avatar className="h-14 w-14 border-2 border-primary cyber-glow bg-primary/20">
                <AvatarFallback className="text-primary text-xl font-bold">АС</AvatarFallback>
              </Avatar>
            </div>

            <Card className="glass-effect p-6 border-primary/30 animate-slide-right">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Основной счёт</p>
                <p className="text-4xl font-bold text-primary cyber-glow">
                  {balance.toLocaleString('ru-RU')} ₽
                </p>
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={() => setIsTransferModalOpen(true)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow"
                  >
                    <Icon name="ArrowUp" size={18} className="mr-2" />
                    Перевести
                  </Button>
                  <Button 
                    onClick={() => setIsDepositModalOpen(true)}
                    variant="outline" 
                    className="flex-1 border-primary/50"
                  >
                    <Icon name="Plus" size={18} className="mr-2" />
                    Пополнить
                  </Button>
                </div>
              </div>
            </Card>

            {adsEnabled && (
              <Card className="glass-effect p-4 border-secondary/30 bg-gradient-to-r from-secondary/10 to-primary/10 animate-slide-right">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Icon name="Zap" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">CyberBank Premium</p>
                      <p className="text-xs text-muted-foreground">Отключите рекламу навсегда</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setIsPremiumModalOpen(true)}
                    size="sm" 
                    className="bg-secondary hover:bg-secondary/90 cyber-glow-purple"
                  >
                    Купить
                  </Button>
                </div>
              </Card>
            )}

            <div className="space-y-3 animate-slide-left">
              <h2 className="text-xl font-semibold">Последние операции</h2>
              {transactions.map((tx) => (
                <Card key={tx.id} className="glass-effect p-4 border-border/50 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                        <Icon name={tx.icon as any} size={20} className={tx.amount > 0 ? 'text-primary' : 'text-secondary'} />
                      </div>
                      <div>
                        <p className="font-medium">{tx.name}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${tx.amount > 0 ? 'text-primary' : 'text-foreground'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`transition-all duration-500 ${activeTab === 'savings' ? 'animate-fade-in' : 'hidden'}`}>
        {activeTab === 'savings' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Накопления</h1>
              <Button 
                onClick={() => setIsNewGoalModalOpen(true)}
                size="icon" 
                className="rounded-full bg-primary cyber-glow"
              >
                <Icon name="Plus" size={24} />
              </Button>
            </div>

            <div className="space-y-4 animate-slide-right">
              {savings.map((saving, idx) => (
                <Card key={idx} className="glass-effect p-6 border-primary/30">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">{saving.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((saving.current / saving.goal) * 100)}%
                      </span>
                    </div>
                    <Progress value={(saving.current / saving.goal) * 100} className="h-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-primary font-bold">{saving.current.toLocaleString('ru-RU')} ₽</span>
                      <span className="text-muted-foreground">из {saving.goal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card 
              onClick={() => setIsNewGoalModalOpen(true)}
              className="glass-effect p-6 border-secondary/30 cyber-glow-purple animate-slide-left cursor-pointer hover:border-secondary transition-all"
            >
              <div className="text-center space-y-2">
                <Icon name="Target" size={48} className="mx-auto text-secondary" />
                <h3 className="text-lg font-semibold">Создать новую цель</h3>
                <p className="text-sm text-muted-foreground">Откладывайте деньги на мечту</p>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className={`transition-all duration-500 ${activeTab === 'transfers' ? 'animate-fade-in' : 'hidden'}`}>
        {activeTab === 'transfers' && (
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Переводы</h1>

            <div className="grid grid-cols-2 gap-4 animate-slide-right">
              <Card 
                onClick={() => setIsTransferModalOpen(true)}
                className="glass-effect p-6 border-primary/30 hover:border-primary transition-all cursor-pointer"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center cyber-glow">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <p className="font-medium">По номеру телефона</p>
                </div>
              </Card>

              <Card 
                onClick={() => setIsTransferModalOpen(true)}
                className="glass-effect p-6 border-secondary/30 hover:border-secondary transition-all cursor-pointer"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-secondary/20 flex items-center justify-center cyber-glow-purple">
                    <Icon name="CreditCard" size={24} className="text-secondary" />
                  </div>
                  <p className="font-medium">На карту</p>
                </div>
              </Card>

              <Card 
                onClick={() => toast({ title: "QR-сканер", description: "Функция в разработке" })}
                className="glass-effect p-6 border-primary/30 hover:border-primary transition-all cursor-pointer"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="QrCode" size={24} className="text-primary" />
                  </div>
                  <p className="font-medium">По QR-коду</p>
                </div>
              </Card>

              <Card 
                onClick={() => setIsTransferModalOpen(true)}
                className="glass-effect p-6 border-secondary/30 hover:border-secondary transition-all cursor-pointer"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
                    <Icon name="Building" size={24} className="text-secondary" />
                  </div>
                  <p className="font-medium">В банк</p>
                </div>
              </Card>
            </div>

            <div className="space-y-3 animate-slide-left">
              <h2 className="text-xl font-semibold">Частые переводы</h2>
              {[
                { name: 'Алексей С.', phone: '+7 999 123-45-67' },
                { name: 'Мария К.', phone: '+7 999 765-43-21' }
              ].map((contact, idx) => (
                <Card 
                  key={idx} 
                  onClick={() => handleQuickTransfer(contact.name)}
                  className="glass-effect p-4 border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="border border-primary/50 bg-primary/20">
                        <AvatarFallback className="text-primary font-bold">{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.phone}</p>
                      </div>
                    </div>
                    <Icon name="Send" size={20} className="text-primary" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`transition-all duration-500 ${activeTab === 'settings' ? 'animate-fade-in' : 'hidden'}`}>
        {activeTab === 'settings' && (
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Настройки</h1>

            <Card className="glass-effect p-6 border-primary/30 animate-slide-right">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary cyber-glow bg-primary/20">
                  <AvatarFallback className="text-primary text-3xl font-bold">АС</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">Алексей Смирнов</h2>
                  <p className="text-sm text-muted-foreground">+7 999 123-45-67</p>
                  <p className="text-xs text-muted-foreground">alexey@cyberbank.ru</p>
                </div>
                <Button 
                  onClick={() => toast({ title: "Редактирование", description: "Функция в разработке" })}
                  variant="outline" 
                  size="icon" 
                  className="border-primary/50"
                >
                  <Icon name="Edit" size={18} />
                </Button>
              </div>
            </Card>

            {adsEnabled && (
              <Card 
                onClick={() => setIsPremiumModalOpen(true)}
                className="glass-effect p-4 border-destructive/30 bg-gradient-to-r from-destructive/10 to-secondary/10 cursor-pointer hover:border-destructive/50 transition-all animate-slide-right mb-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Crown" size={22} className="text-destructive" />
                    <div>
                      <p className="font-semibold text-sm">Отключить рекламу</p>
                      <p className="text-xs text-muted-foreground">Перейти на Premium</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>
            )}

            <div className="space-y-2 animate-slide-left">
              {[
                { icon: 'Bell', label: 'Уведомления', color: 'text-primary', action: toggleNotifications, badge: notificationsEnabled },
                { icon: 'Lock', label: 'Безопасность', color: 'text-secondary', action: handleSecuritySettings },
                { icon: 'CreditCard', label: 'Мои карты', color: 'text-primary', action: handleCardManagement },
                { icon: 'FileText', label: 'Документы', color: 'text-secondary', action: () => toast({ title: 'Документы', description: 'Выписки и договоры' }) },
                { icon: 'HelpCircle', label: 'Помощь', color: 'text-primary', action: () => toast({ title: 'Помощь', description: 'Служба поддержки 24/7: +7 800 555-35-35' }) },
                { icon: 'LogOut', label: 'Выход', color: 'text-destructive', action: () => toast({ title: 'Выход', description: 'До встречи!' }) }
              ].map((item, idx) => (
                <Card 
                  key={idx} 
                  onClick={item.action}
                  className="glass-effect p-4 border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon as any} size={22} className={item.color} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge !== undefined && (
                        <span className={`text-xs px-2 py-1 rounded-full ${item.badge ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {item.badge ? 'ВКЛ' : 'ВЫКЛ'}
                        </span>
                      )}
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={isTransferModalOpen} onOpenChange={setIsTransferModalOpen}>
        <DialogContent className="glass-effect border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl">Перевод средств</DialogTitle>
            <DialogDescription>Введите сумму и получателя</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Получатель</Label>
              <Input
                id="recipient"
                value={transferRecipient}
                onChange={(e) => setTransferRecipient(e.target.value)}
                placeholder="Имя или номер телефона"
                className="glass-effect border-primary/30"
              />
            </div>
            <div>
              <Label htmlFor="amount">Сумма</Label>
              <Input
                id="amount"
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="0"
                className="glass-effect border-primary/30"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Доступно: {balance.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferModalOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleTransfer} className="bg-primary cyber-glow">
              Перевести
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDepositModalOpen} onOpenChange={setIsDepositModalOpen}>
        <DialogContent className="glass-effect border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl">Пополнение счёта</DialogTitle>
            <DialogDescription>Введите сумму пополнения</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="deposit">Сумма</Label>
              <Input
                id="deposit"
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0"
                className="glass-effect border-primary/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositModalOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleDeposit} className="bg-primary cyber-glow">
              Пополнить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewGoalModalOpen} onOpenChange={setIsNewGoalModalOpen}>
        <DialogContent className="glass-effect border-secondary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl">Новая цель</DialogTitle>
            <DialogDescription>Создайте цель для накопления</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="goalName">Название цели</Label>
              <Input
                id="goalName"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder="Например: Новая машина"
                className="glass-effect border-secondary/30"
              />
            </div>
            <div>
              <Label htmlFor="goalAmount">Целевая сумма</Label>
              <Input
                id="goalAmount"
                type="number"
                value={newGoalAmount}
                onChange={(e) => setNewGoalAmount(e.target.value)}
                placeholder="0"
                className="glass-effect border-secondary/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewGoalModalOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleNewGoal} className="bg-secondary cyber-glow-purple">
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPremiumModalOpen} onOpenChange={setIsPremiumModalOpen}>
        <DialogContent className="glass-effect border-secondary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="Crown" size={28} className="text-secondary" />
              CyberBank Premium
            </DialogTitle>
            <DialogDescription>Отключите рекламу навсегда</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {[
                { icon: 'Zap', text: 'Без рекламы навсегда' },
                { icon: 'Shield', text: 'Приоритетная поддержка' },
                { icon: 'TrendingUp', text: 'Расширенная аналитика' },
                { icon: 'Gift', text: 'Эксклюзивные бонусы' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Icon name={feature.icon as any} size={16} className="text-secondary" />
                  </div>
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
            <Card className="glass-effect p-4 border-primary/30 text-center">
              <p className="text-3xl font-bold text-primary">499 ₽</p>
              <p className="text-xs text-muted-foreground mt-1">Единоразовая покупка</p>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPremiumModalOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleRemoveAds} className="bg-secondary cyber-glow-purple">
              <Icon name="Crown" size={18} className="mr-2" />
              Купить Premium
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {adsEnabled && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pointer-events-none">
          <Card className="glass-effect p-3 border-secondary/30 bg-gradient-to-r from-secondary/20 to-primary/20 max-w-md mx-auto pointer-events-auto animate-slide-right">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={16} className="text-secondary" />
                <span className="font-medium">Реклама • CyberTrade</span>
              </div>
              <Button 
                onClick={() => setIsPremiumModalOpen(true)}
                size="sm" 
                variant="ghost" 
                className="h-6 text-xs hover:text-primary"
              >
                Убрать →
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border/50 p-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { id: 'home' as Tab, icon: 'Home', label: 'Главная' },
            { id: 'savings' as Tab, icon: 'PiggyBank', label: 'Накопление' },
            { id: 'transfers' as Tab, icon: 'Send', label: 'Переводы' },
            { id: 'settings' as Tab, icon: 'Settings', label: 'Настройки' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                activeTab === tab.id ? 'text-primary scale-110' : 'text-muted-foreground'
              }`}
            >
              <div className={`${activeTab === tab.id ? 'cyber-glow animate-glow-pulse' : ''}`}>
                <Icon name={tab.icon as any} size={24} />
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;