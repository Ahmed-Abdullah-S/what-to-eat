'use client';

import Navbar from '@/components/Navbar';
import { Heart, Users, Star, Globe, Smartphone, Zap } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Globe,
      title: 'نكهات من قلب الرياض',
      description: 'اكتشف أطباق شهيرة من مطاعم العاصمة اللي يحبها قلبك!'
    },
    {
      icon: Smartphone,
      title: 'يشغل على كل الأجهزة',
      description: 'تصميم مرن يناسب الجوال، التابلت، والكمبيوتر'
    },
    {
      icon: Heart,
      title: 'مفضلاتك في مكان واحد',
      description: 'سجل وجباتك المفضلة وارجع لها وقت الجوع!'
    },
    {
      icon: Users,
      title: 'تحدي واختيارات مع الأصدقاء',
      description: 'شارك الرابط وخليهم يختارون لك بدالك!'
    },
    {
      icon: Star,
      title: 'فلترة ذكية وسريعة',
      description: 'حدد ميزانيتك، نوع المطبخ، أو النمط الغذائي واختصر وقتك'
    },
    {
      icon: Zap,
      title: 'بتضغط زر وتاكل',
      description: 'واجهة بسيطة وسريعة، بدون وجع راس'
    }
  ];

  const howToUse = [
    {
      step: '١',
      title: 'اختر تفضيلاتك',
      description: 'حدد كم تبي تدفع، أي مطبخ يعجبك، والنمط الغذائي'
    },
    {
      step: '٢',
      title: 'دوّر العجلة',
      description: 'اضغط زر العجلة وخلك متحمس للنتيجة'
    },
    {
      step: '٣',
      title: 'جرب الوجبة واستمتع',
      description: 'راح تطلع لك وجبة بتفاصيلها، احفظها أو شاركها!'
    }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🍽️ وش آكل؟</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              تطبيق خفيف دم وسهل الاستخدام يساعدك تقرر وش تاكل اليوم، خصوصًا إذا كنت محتار في زحمة مطاعم الرياض.
            </p>
          </div>

          <section className="bg-white rounded-lg p-8 mb-12 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">فكرة التطبيق</h2>
            <div className="prose prose-lg text-gray-600 text-center">
              <p className="mb-4">
                يومك مزحوم؟ مو قادر تقرر تأكل إيش؟ “وش آكل؟” بيختصر عليك الحيرة، وبدال ما تلف وتدور بين التطبيقات، هنا تدور العجلة وتقرر لك.
              </p>
              <p>
                يشتغل بكل سلاسة على جوالك، وتقدر تشارك أصدقاءك أو حتى تحفظ وجباتك المفضلة. يعني ما يحتاج تفكير كثير، التطبيق يفكر عنك.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">✨ وش يميزنا؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-4 space-x-reverse mb-4">
                        <div className="p-3 bg-primary-100 rounded-lg">
                          <Icon className="text-primary-600" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                );
              })}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📋 كيف تستخدم التطبيق؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howToUse.map((step, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                    <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
              ))}
            </div>
          </section>

        {/* Meal Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🍽️ أنواع الوجبات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-3">🇸🇦</div>
              <h3 className="font-semibold text-gray-900 mb-2">مأكولات سعودية</h3>
              <p className="text-sm text-gray-600">كبسة، مندي، مطازز</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold text-gray-900 mb-2">مأكولات عالمية</h3>
              <p className="text-sm text-gray-600">إيطالية، يابانية، هندية</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-3">🥗</div>
              <h3 className="font-semibold text-gray-900 mb-2">خيارات صحية</h3>
              <p className="text-sm text-gray-600">نباتية، قليلة السعرات</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">جميع الميزانيات</h3>
              <p className="text-sm text-gray-600">رخيص، متوسط، فاخر</p>
            </div>
          </div>
        </div>

        {/* Contact/Info */}
        <div className="bg-white rounded-lg p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📞 تواصل معنا
          </h2>
          <p className="text-gray-600 mb-6">
            هل لديك اقتراحات أو تريد إضافة وجبات جديدة؟ نرحب بتواصلكم!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
            <a
              href="mailto:info@whattoeat.sa"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              📧 راسلنا
            </a>
            <a
              href="/frontend/public"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              🏠 العودة للرئيسية
            </a>
          </div>
        </div>
      </main>
    </div>
  );
} 