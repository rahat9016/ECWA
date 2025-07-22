import { FEATURES } from '@/docs/homeDocs';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#48cae4]/20 via-white to-[#90e0ef]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
