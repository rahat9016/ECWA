import { FolderOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const NotFound = ({title}:{title?:string}) => {
  return (
    <Card>
      <CardContent className="text-center py-12 h-[70vh] flex items-center justify-center">
        <div className="text-gray-500">
          <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">{title || 'No products found'}</h3>
          {/* <p>Create new modules by clicking on add module button.</p> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotFound;
