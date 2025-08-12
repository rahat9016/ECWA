import { CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { TimelineEvent } from '@/types/order';

const getTimelineIcon = (status: 'completed' | 'current' | 'pending') => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'current':
      return <Clock className="h-5 w-5 text-blue-600" />;
    case 'pending':
      return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    default:
      return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
  }
};

const OrderTimeline = ({ timeline, length }: { timeline: TimelineEvent[]; length: number }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
        <CardDescription>Track the progress of this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                {getTimelineIcon(event.status)}
                {index < length - 1 && <div className="w-px h-8 bg-gray-200 mt-2" />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                {event.date && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
