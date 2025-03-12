import React from "react";
import { Button } from "./ui/button";
import {
  Download,
  Smartphone,
  Bell,
  Calendar,
  Trophy,
  Zap,
  Users,
  Heart,
} from "lucide-react";
import Header from "./Header";

const MobileAppPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-950 dark:text-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              E-Spor Merkezi Mobil Uygulaması
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Tüm e-spor maçlarını, turnuvalarını ve canlı yayınlarını cebinizde
              taşıyın.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Download className="mr-2 h-5 w-5" /> Şimdi İndir
              </Button>
              <div className="flex space-x-4 items-center">
                <a
                  href="#"
                  className="flex items-center justify-center bg-black hover:bg-gray-900 text-white rounded-lg px-6 py-3"
                >
                  <svg
                    className="h-6 w-6 mr-2"
                    viewBox="0 0 384 512"
                    fill="currentColor"
                  >
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  App Store
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center bg-black hover:bg-gray-900 text-white rounded-lg px-6 py-3"
                >
                  <svg
                    className="h-6 w-6 mr-2"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-indigo-500/20 absolute -inset-4 rounded-3xl blur-xl"></div>
            <div className="relative z-10 bg-gray-900 p-2 rounded-3xl border-2 border-gray-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80"
                alt="Mobile App Screenshot"
                className="rounded-2xl w-full"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Uygulama Özellikleri
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bell className="h-10 w-10 text-indigo-500" />}
              title="Canlı Bildirimler"
              description="Favori takımlarınızın maçları başlamadan önce ve önemli anlar için bildirimler alın."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-purple-500" />}
              title="Maç Takvimi"
              description="Tüm e-spor etkinliklerini kişiselleştirilmiş takviminizde görüntüleyin."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="Canlı Skorlar"
              description="Maçların canlı skorlarını ve istatistiklerini gerçek zamanlı olarak takip edin."
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-amber-500" />}
              title="Turnuva Takibi"
              description="Tüm büyük turnuvaları, fikstürleri ve sonuçları tek bir yerden takip edin."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-500" />}
              title="Takım Profilleri"
              description="Favori takımlarınız ve oyuncularınız hakkında detaylı bilgilere erişin."
            />
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-red-500" />}
              title="Favoriler"
              description="Favori maçlarınızı, takımlarınızı ve turnuvalarınızı kaydedin ve kolayca erişin."
            />
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Uygulama Ekran Görüntüleri
          </h2>

          <div className="flex overflow-x-auto space-x-6 pb-8 scrollbar-hide">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex-shrink-0 w-64 bg-gray-900 p-2 rounded-3xl border border-gray-800"
              >
                <img
                  src={`https://images.unsplash.com/photo-1560253023-${item}ec5d502959f?w=300&q=80`}
                  alt={`Screenshot ${item}`}
                  className="rounded-2xl h-[500px] object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-12 text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">Hemen İndirin</h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            E-spor dünyasını cebinize taşıyın ve hiçbir maçı kaçırmayın.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="flex items-center justify-center bg-black hover:bg-gray-900 text-white rounded-lg px-8 py-4"
            >
              <svg
                className="h-8 w-8 mr-3"
                viewBox="0 0 384 512"
                fill="currentColor"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              App Store'dan İndir
            </a>
            <a
              href="#"
              className="flex items-center justify-center bg-black hover:bg-gray-900 text-white rounded-lg px-8 py-4"
            >
              <svg
                className="h-8 w-8 mr-3"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
              </svg>
              Google Play'den İndir
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Sıkça Sorulan Sorular
          </h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            <FaqItem
              question="Uygulama hangi platformlarda kullanılabilir?"
              answer="Uygulamamız hem iOS hem de Android platformlarında kullanılabilir. App Store veya Google Play'den indirebilirsiniz."
            />
            <FaqItem
              question="Uygulama ücretsiz mi?"
              answer="Evet, uygulamamız tamamen ücretsizdir. İsteğe bağlı olarak premium özellikler için abonelik satın alabilirsiniz."
            />
            <FaqItem
              question="Hangi oyunlar destekleniyor?"
              answer="League of Legends, CS:GO, Dota 2, Valorant, Overwatch ve daha birçok popüler e-spor oyunu desteklenmektedir."
            />
            <FaqItem
              question="Canlı yayınları uygulama içinde izleyebilir miyim?"
              answer="Evet, uygulama içinde Twitch ve YouTube entegrasyonu ile canlı yayınları doğrudan izleyebilirsiniz."
            />
            <FaqItem
              question="Bildirimler nasıl özelleştirilir?"
              answer="Ayarlar menüsünden hangi takımlar, turnuvalar veya oyunlar için bildirim almak istediğinizi seçebilirsiniz."
            />
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold flex items-center">
                <span className="text-indigo-500 mr-2">E-Spor</span> Merkezi
              </h3>
              <p className="text-gray-400 mt-2">
                E-spor maçları ve turnuvaları için tek durağınız
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Hakkında
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                İletişim
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Gizlilik
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Koşullar
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} E-Spor Merkezi. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FaqItem = ({ question, answer }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h4 className="text-lg font-semibold mb-2">{question}</h4>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

export default MobileAppPage;
