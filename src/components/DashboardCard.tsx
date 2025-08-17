import { Card, CardContent } from '@/components/ui/card';
import { ComponentType, SVGProps } from 'react';

const DashboardCard = ({
  bgColor,
  title,
  value,
  subtitleIcon: SubtitleIcon,
  subtitle,
  mainIcon: MainIcon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  bgColor: string;
  mainIcon: ComponentType<SVGProps<SVGSVGElement>>;
}) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow bg-gradient-to-br ${bgColor} text-white`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium`}>{title}</p>
            <p className="text-xl lg:text-3xl font-bold mt-2">${value}</p>
            {SubtitleIcon && (
              <div className="flex items-center gap-1 mt-2">
                {SubtitleIcon && <SubtitleIcon className="w-4 h-4" />}
                <span className="text-sm">{subtitle}</span>
              </div>
            )}
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <MainIcon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
