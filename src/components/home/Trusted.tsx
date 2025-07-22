import { STATS } from '@/docs/homeDocs';

const Trusted = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#90e0ef]/20 via-white to-[#56cfe1]/20">
      <div className="container mx-auto px-4 flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by Thousands</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join our growing community of satisfied customers who trust us for quality and service
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
