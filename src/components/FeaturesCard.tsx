import { Card, CardContent } from '@/components/ui/card';

const FeaturesCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="flex items-center gap-3 p-3 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-14 h-14 rounded-full shrink-0 flex items-center justify-center  text-white shadow-lg">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-start text-gray-900">{title}</h3>
          <p className="text-gray-600 text-start text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesCard;
