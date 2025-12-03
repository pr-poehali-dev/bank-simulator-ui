import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Tab = 'home' | 'savings' | 'transfers' | 'settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const balance = 125850.50;
  const savings = [
    { name: 'Отпуск 2026', current: 85000, goal: 150000, color: 'bg-primary' },
    { name: 'Новый гаджет', current: 42000, goal: 80000, color: 'bg-secondary' }
  ];

  const transactions = [
    { id: 1, name: 'Продуктовый', amount: -3500, date: '03 дек', icon: 'ShoppingCart' },
    { id: 2, name: 'Зарплата', amount: 85000, date: '01 дек', icon: 'TrendingUp' },
    { id: 3, name: 'Кафе', amount: -1200, date: '02 дек', icon: 'Coffee' }
  ];

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
              <Avatar className="h-14 w-14 border-2 border-primary cyber-glow">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=cyber" />
                <AvatarFallback>АС</AvatarFallback>
              </Avatar>
            </div>

            <Card className="glass-effect p-6 border-primary/30 animate-slide-right">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Основной счёт</p>
                <p className="text-4xl font-bold text-primary cyber-glow">
                  {balance.toLocaleString('ru-RU')} ₽
                </p>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow">
                    <Icon name="ArrowUp" size={18} className="mr-2" />
                    Перевести
                  </Button>
                  <Button variant="outline" className="flex-1 border-primary/50">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Пополнить
                  </Button>
                </div>
              </div>
            </Card>

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
              <Button size="icon" className="rounded-full bg-primary cyber-glow">
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

            <Card className="glass-effect p-6 border-secondary/30 cyber-glow-purple animate-slide-left">
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
              <Card className="glass-effect p-6 border-primary/30 hover:border-primary transition-all cursor-pointer">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center cyber-glow">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <p className="font-medium">По номеру телефона</p>
                </div>
              </Card>

              <Card className="glass-effect p-6 border-secondary/30 hover:border-secondary transition-all cursor-pointer">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-secondary/20 flex items-center justify-center cyber-glow-purple">
                    <Icon name="CreditCard" size={24} className="text-secondary" />
                  </div>
                  <p className="font-medium">На карту</p>
                </div>
              </Card>

              <Card className="glass-effect p-6 border-primary/30 hover:border-primary transition-all cursor-pointer">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="QrCode" size={24} className="text-primary" />
                  </div>
                  <p className="font-medium">По QR-коду</p>
                </div>
              </Card>

              <Card className="glass-effect p-6 border-secondary/30 hover:border-secondary transition-all cursor-pointer">
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
                { name: 'Алексей С.', phone: '+7 999 123-45-67', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' },
                { name: 'Мария К.', phone: '+7 999 765-43-21', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria' }
              ].map((contact, idx) => (
                <Card key={idx} className="glass-effect p-4 border-border/50 hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="border border-primary/50">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>{contact.name[0]}</AvatarFallback>
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
                <Avatar className="h-20 w-20 border-2 border-primary cyber-glow">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=cyber" />
                  <AvatarFallback>АС</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">Алексей Смирнов</h2>
                  <p className="text-sm text-muted-foreground">+7 999 123-45-67</p>
                  <p className="text-xs text-muted-foreground">alexey@cyberbank.ru</p>
                </div>
                <Button variant="outline" size="icon" className="border-primary/50">
                  <Icon name="Edit" size={18} />
                </Button>
              </div>
            </Card>

            <div className="space-y-2 animate-slide-left">
              {[
                { icon: 'Bell', label: 'Уведомления', color: 'text-primary' },
                { icon: 'Lock', label: 'Безопасность', color: 'text-secondary' },
                { icon: 'CreditCard', label: 'Мои карты', color: 'text-primary' },
                { icon: 'FileText', label: 'Документы', color: 'text-secondary' },
                { icon: 'HelpCircle', label: 'Помощь', color: 'text-primary' },
                { icon: 'LogOut', label: 'Выход', color: 'text-destructive' }
              ].map((item, idx) => (
                <Card key={idx} className="glass-effect p-4 border-border/50 hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon as any} size={22} className={item.color} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

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
