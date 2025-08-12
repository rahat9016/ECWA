import Image from 'next/image';
import { Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from '@/types/product';

const DeleteConfirmationDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  productToDelete,
  handleDeleteConfirm,
}: {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (value: boolean) => void;
  productToDelete: Product | null;
  handleDeleteConfirm: () => void;
}) => {
  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {productToDelete && (
          <div className="bg-gray-50 rounded-lg p-4 my-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={productToDelete.image || '/placeholder.svg'}
                  alt={productToDelete.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{productToDelete.name}</p>
                <p className="text-sm text-gray-600">SKU: {productToDelete.sku}</p>
                <p className="text-sm text-gray-600">${productToDelete.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
