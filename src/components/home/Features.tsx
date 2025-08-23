import { FEATURES } from '@/docs/homeDocs';
import FeaturesCard from '../FeaturesCard';



const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#48cae4]/20 via-white to-[#90e0ef]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {FEATURES.map((feature, index) => (
            <FeaturesCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
