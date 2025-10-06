import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'services', 'team', 'portfolio', 'garlands', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    { icon: 'Briefcase', title: 'Консалтинг', description: 'Профессиональные консультации для развития вашего бизнеса' },
    { icon: 'Rocket', title: 'Разработка', description: 'Создание современных цифровых решений под ключ' },
    { icon: 'BarChart', title: 'Аналитика', description: 'Глубокий анализ данных и бизнес-процессов' },
    { icon: 'Users', title: 'HR-решения', description: 'Подбор и развитие профессиональных команд' },
    { icon: 'Target', title: 'Маркетинг', description: 'Эффективные стратегии продвижения' },
    { icon: 'Shield', title: 'Безопасность', description: 'Защита данных и информационная безопасность' }
  ];

  const team = [
    { name: 'Алексей Петров', role: 'CEO & Основатель', icon: 'User' },
    { name: 'Мария Иванова', role: 'Технический директор', icon: 'User' },
    { name: 'Дмитрий Сидоров', role: 'Руководитель отдела развития', icon: 'User' },
    { name: 'Елена Козлова', role: 'Главный дизайнер', icon: 'User' }
  ];

  const portfolio = [
    { title: 'Проект Alpha', category: 'Веб-разработка', icon: 'Globe' },
    { title: 'Проект Beta', category: 'Мобильные приложения', icon: 'Smartphone' },
    { title: 'Проект Gamma', category: 'Корпоративные системы', icon: 'Building2' },
    { title: 'Проект Delta', category: 'E-commerce', icon: 'ShoppingCart' }
  ];

  const garlands = [
    { text: 'Инновации', icon: 'Lightbulb' },
    { text: 'Качество', icon: 'Award' },
    { text: 'Надежность', icon: 'ShieldCheck' },
    { text: 'Эффективность', icon: 'TrendingUp' },
    { text: 'Креативность', icon: 'Sparkles' },
    { text: 'Профессионализм', icon: 'Star' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              CorporatePro
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'about', label: 'О компании' },
                { id: 'services', label: 'Услуги' },
                { id: 'team', label: 'Команда' },
                { id: 'portfolio', label: 'Портфолио' },
                { id: 'garlands', label: 'Гирлянды' },
                { id: 'contact', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeSection === item.id ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button 
              variant="default" 
              onClick={() => scrollToSection('contact')}
              className="hover:scale-105 transition-transform"
            >
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Построим будущее <span className="text-accent">вместе</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Мы создаем решения, которые помогают бизнесу расти и развиваться в цифровую эпоху
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" onClick={() => scrollToSection('services')} className="hover:scale-105 transition-transform">
              Наши услуги
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('about')} className="hover:scale-105 transition-transform">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">О компании</h2>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
              Мы — команда профессионалов с более чем 10-летним опытом в разработке корпоративных решений. 
              Наша миссия — помогать компаниям достигать новых высот через внедрение современных технологий.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                { number: '150+', label: 'Проектов', icon: 'FolderCheck' },
                { number: '50+', label: 'Клиентов', icon: 'Building2' },
                { number: '10+', label: 'Лет опыта', icon: 'Calendar' }
              ].map((stat, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8 text-center">
                    <Icon name={stat.icon as any} size={40} className="mx-auto mb-4 text-accent" />
                    <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Наши услуги</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                data-index={index}
                className={`animate-on-scroll border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group cursor-pointer ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index % 3) * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon name={service.icon as any} size={32} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Наша команда</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary mx-auto mb-6 flex items-center justify-center">
                    <Icon name={member.icon as any} size={48} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Портфолио</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {portfolio.map((project, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-0">
                  <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center group-hover:from-accent/30 group-hover:to-primary/30 transition-all">
                    <Icon name={project.icon as any} size={64} className="text-accent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.category}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="garlands" className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Наши ценности</h2>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {garlands.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-105 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon name={item.icon as any} size={24} className="text-accent" />
                <span className="font-medium text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Готовы начать сотрудничество? Напишите нам, и мы свяжемся с вами в ближайшее время
            </p>
            
            <div className="grid gap-6 mb-12">
              <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Mail" size={24} className="text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground">info@corporatepro.com</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Phone" size={24} className="text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1">Адрес</div>
                    <div className="text-muted-foreground">Москва, ул. Примерная, д. 1</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" className="hover:scale-105 transition-transform">
              Отправить сообщение
              <Icon name="Send" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold">CorporatePro</div>
            
            <div className="flex gap-6">
              {['Linkedin', 'Twitter', 'Facebook', 'Instagram'].map((social) => (
                <button 
                  key={social}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
                >
                  <Icon name={social as any} size={20} />
                </button>
              ))}
            </div>
          </div>
          
          <Separator className="my-8 bg-white/20" />
          
          <div className="text-center text-sm text-primary-foreground/70">
            © 2024 CorporatePro. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
